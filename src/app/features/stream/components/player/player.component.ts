import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import Hls from 'hls.js';
import {StreamService} from '../../services/stream.service';
import {AuthService} from '../../../core/services/auth.service';
import {Stream} from '../../models/stream.model';
import {Video} from '../../../video/models/video.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {


  @ViewChild('player')
  playerRef;
  @Input()
  streamId: number;
  @Input()
  isAdmin: boolean;

  stream: Stream;
  playlist: Video[];
  currentUserId: number;

  constructor(
    private readonly streamService: StreamService,
    private readonly authService: AuthService,
    private readonly rxStompService: RxStompService
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
  }

  async ngAfterViewInit(): Promise<void> {
    this.stream = await this.streamService.getStream(this.streamId).toPromise();

    if (!this.stream.activeStream) {
      // TODO
      return;
    }

    this.playlist = await this.streamService.getVideos(this.streamId).toPromise();

    await this.initPlayer();
    await this.connect(); // disconnect?
    if (this.isAdmin) {
      this.sendStartVideoEvent();
    } else {
      this.sendEvent({type: 'join', userId: this.currentUserId});
    }
    this.sendNextVideoEvent();
  }

  initPlayer(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!Hls.isSupported()) {
        alert('oops! плеер не поддерживается!');
        reject();
      }
      const hls = new Hls();
      hls.loadSource(await this.getVideoUrl());
      hls.attachMedia(this.playerRef?.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        resolve();
      });
    });
  }

  async getVideoUrl(): Promise<string> {
    if (this.playlist.length === 0) {
      // Todo
    }
    return this.playlist[0].videoUrl;
  }

  connect(): void {
    console.log('connect');
    const topic = `/topic/streams/${this.streamId}/events`;
    console.log(topic);
    this.rxStompService.watch(topic).subscribe(message => {
      this.onMessageReceived(JSON.parse(message.body));
    });
  }

  onMessageReceived(message): void {
    console.log('onMessageReceived');
    console.log(message);

    if (message.type === 'join') {
      console.log('join');
      if (this.isAdmin) {
        const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
        const data = {type: 'info', status, time: this.playerRef?.nativeElement.currentTime};
        this.sendEvent(data);
      }
    }
    if (message.type === 'status') {
      console.log('status');
      if (!this.isAdmin) {
        const time = message.time;
        const status = message.status;
        console.log(time, status);
        this.playerRef.nativeElement.currentTime = time;
        if (status === 'played') {
          this.playerRef?.nativeElement.play().catch(reason => console.log(reason));
        }
        if (status === 'paused') {
          this.playerRef?.nativeElement.pause();
        }
      }
    }
  }

  sendEvent(message): void {
    console.log('sendMessage');
    console.log(message);
    const topic = `/topic/streams/${this.streamId}/events`;
    this.rxStompService.publish({destination: topic, body: JSON.stringify(message)});
  }

  sendStartVideoEvent(): void {
    console.log('sendStartVideoEvent');
    const topic = `/app/streams/${this.streamId}/start`;
    this.rxStompService.publish({destination: topic});
  }

  sendNextVideoEvent(): void {
    console.log('sendNextVideoEvent');
    const topic = `/app/streams/${this.streamId}/next`;
    this.rxStompService.publish({destination: topic});
  }


}
