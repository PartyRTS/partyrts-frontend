import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import Hls from 'hls.js';
import {StreamService} from '../../services/stream.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit {


  @ViewChild('player')
  playerRef;
  @Input()
  streamId: number;
  @Input()
  isAdmin: boolean;

  playerLoaded = false;

  constructor(
    private readonly streamService: StreamService,
    private readonly rxStompService: RxStompService
  ) {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.initPlayer();
    await this.connect();
  }

  async initPlayer(): Promise<void> {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(await this.getVideoUrl());
      hls.attachMedia(this.playerRef?.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => this.playerRef?.nativeElement.play());  // FIXME?
      this.playerLoaded = true;
    } else {
      alert('hls is not supported');
    }
  }

  async getVideoUrl(): Promise<string> {
    return 'https://videousersbucket.s3.us-west-2.amazonaws.com/1/sintel.m3u8';
  }

  connect(): void {
    console.log('connect');
    const topic = `/topic/streams/${this.streamId}/events`;
    console.log(topic);
    this.rxStompService.watch(topic).subscribe(message => {
      this.onMessageReceived(JSON.parse(message.body));
    });
    this.sendMessage({type: 'join'});
  }

  onMessageReceived(message): void {
    console.log('onMessageReceived');
    console.log(message);

    if (message.type === 'join') {
      console.log('join');
      if (this.isAdmin) {
        const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
        const data = {type: 'info', status, time: this.playerRef?.nativeElement.currentTime};
        this.sendMessage(data);
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

  sendMessage(message): void {
    console.log('sendMessage');
    console.log(message);
    const topic = `/topic/streams/${this.streamId}/events`;
    this.rxStompService.publish({destination: topic, body: JSON.stringify(message)});
  }
}
