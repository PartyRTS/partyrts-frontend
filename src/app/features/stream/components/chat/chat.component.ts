import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StreamMessageService} from '../../services/stream-message.service';
import {concat, concatMap, map, mergeMap, tap} from 'rxjs/operators';
import {UserService} from '../../../user/services/user.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {NewMessage} from '../../models/new-message.model';
import {from, Observable} from 'rxjs';
import {Message} from '../../models/message.model';
import {MatDialog} from '@angular/material/dialog';
import {SuggestSkipVideoDialog} from '../suggest-skip-video/suggest-skip-video.dialog';
import {SuggestAddVideoDialog} from '../suggest-add-video/suggest-add-video.dialog';
import {Vote} from '../../models/vote.model';
import {StreamVoteService} from '../../services/stream-vote.service';
import {VoteService} from '../../services/vote.service';
import {NewUserVote} from '../../models/new-user-vote.model';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer')
  messagesContainerRef: ElementRef;
  @Input()
  public streamId: number;
  @Input()
  public userId: number;

  inputMessageForm = new FormControl();

  vote: Vote;

  messages: { text: string, name: string, logoUrl: string }[] = [];
  needScroll = false;

  constructor(
    private readonly authService: AuthService,
    private readonly streamMessageService: StreamMessageService,
    private readonly userService: UserService,
    private readonly streamVoteService: StreamVoteService,
    private readonly voteService: VoteService,
    private readonly rxStompService: RxStompService,
    private readonly dialog: MatDialog,
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.getMessagesFromRest().pipe(
      concat(this.getMessagesFromWs()),
      concatMap(message => this.toExtendedMessage(message))
    ).subscribe(message => {
      this.onMessageReceived(message);
    });

    this.vote = await this.streamVoteService.getActiveVote(this.streamId).toPromise();

    this.rxStompService.watch(`/topic/streams/${this.streamId}/events`).subscribe(message => {
      const event = JSON.parse(message.body);
      console.log(event);
      if (event.type === 'vote') {
        this.streamVoteService.getActiveVote(this.streamId).subscribe(value => {
          this.vote = value;
        });
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.needScroll) {
      this.scrollToBottom();
      this.needScroll = false;
    }
  }

  getMessagesFromRest(): Observable<Message> {
    if (this.userId == null) {
      throw new Error('cant get messages from rest: user is not authorized');
    }

    return this.streamMessageService.getAllMessages(this.streamId).pipe(
      mergeMap((messages: Message[]) => {
        return from(messages);
      }),
    );
  }

  getMessagesFromWs(): Observable<Message> {
    if (this.userId == null) {
      throw new Error('cant get messages from ws: user is not authorized');
    }

    return this.rxStompService.watch('/topic/streams/' + this.streamId + '/messages').pipe(
      map(value => JSON.parse(value.body)),
      tap(x => console.log(x))
    ) as unknown as Observable<Message>;
  }

  scrollToBottom(): void {
    try {
      this.messagesContainerRef.nativeElement.scrollTop = this.messagesContainerRef.nativeElement.scrollHeight;
    } catch (err) {
    }
  }


  onSend(): void {
    const text = this.inputMessageForm.value;
    const topic = '/app/messages/send';

    const data: NewMessage = {
      idUser: this.userId,
      idStream: this.streamId,
      text,
    };

    this.rxStompService.publish({destination: topic, body: JSON.stringify(data)});
    this.inputMessageForm.setValue('');
  }

  private async toExtendedMessage(message: Message): Promise<any> {
    const user = await this.userService.getUser(message.idUser).toPromise();
    const name = `${user.firstName} ${user.secondName}`;
    return {text: message.text, name, logoUrl: user.logoUrl};
  }

  private onMessageReceived(extendedMessage: any): void {
    this.messages.push(extendedMessage);
    this.needScroll = true;
  }

  openAddVoteSkipDialog(): void {
    this.dialog.open(SuggestSkipVideoDialog);
  }

  openAddVoteAddDialog(): void {
    this.dialog.open(SuggestAddVideoDialog);
  }

  addUserVote(vote: boolean): void {
    const newUserVote: NewUserVote = {idUser: this.authService.userId, votePlus: vote};
    this.voteService.addUserVote(this.vote.idVote, newUserVote).subscribe();
  }
}
