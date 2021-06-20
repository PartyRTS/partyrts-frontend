import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StreamMessageService} from '../../../stream/services/stream-message.service';
import {concat, map, mergeMap, tap} from 'rxjs/operators';
import {UserService} from '../../../user/services/user.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {NewMessage} from '../../models/new-message.model';
import {from, Observable} from 'rxjs';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @Input()
  public streamId: number;

  @Input()
  public userId: number;

  inputMessageForm = new FormControl();

  @ViewChild('messagesContainer')
  messagesContainerRef: ElementRef;

  messages: Message[] = [];
  needScroll = false;

  constructor(
    private readonly streamMessageService: StreamMessageService,
    private readonly userService: UserService,
    private readonly rxStompService: RxStompService,
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.messages = await this.streamMessageService.getAllMessages(this.streamId).toPromise();

    this.getMessagesFromRest().pipe(
      concat(this.getMessagesFromWs())
    ).subscribe(message => {
      this.onMessageReceived(message);
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

  private onMessageReceived(message: Message): void {
    this.messages.push(message);
    this.needScroll = true;
  }

}
