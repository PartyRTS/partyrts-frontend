import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import Hls from 'hls.js';
import {StreamService} from '../../services/stream.service';
import {AuthService} from '../../../core/services/auth.service';
import {Stream} from '../../models/stream.model';
import {Video} from '../../../video/models/video.model';
import {Router} from '@angular/router';
import {VideoService} from '../../../video/services/video.service';
import {BehaviorSubject} from 'rxjs';

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
  @Output()
  streamEnded: BehaviorSubject<boolean>;

  stream: Stream;
  playlist: Video[];
  currentVideo: Video;

  currentUserId: number;

  // player states
  playerLoaded = false;
  playerStarted = false;

  constructor(
    private readonly streamService: StreamService,
    private readonly authService: AuthService,
    private readonly rxStompService: RxStompService,
    private readonly videoService: VideoService,
    private readonly router: Router,
  ) {
    this.streamEnded = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
  }

  async ngAfterViewInit(): Promise<void> {
    console.log('load stream info');
    this.stream = await this.streamService.getStream(this.streamId).toPromise();
    console.log(this.stream);

    if (!this.stream.activeStream) {
      this.streamEnded.next(true);
      return;
    }

    console.log('load playlist info');
    this.playlist = await this.streamService.getVideos(this.streamId).toPromise();
    console.log(this.playlist);

    console.log('init player');
    await this.initPlayer();

    this.playerLoaded = true;
  }

  async onPlayerStarted(): Promise<void> {
    console.log('connect to ws');
    await this.connect(); // disconnect?

    if (this.isAdmin) {
      this.sendTimeEvent();
      this.sendStateEvent('play');
    } else {
      if (this.stream.stopStream) {
        this.playerRef.nativeElement.pause();
      } else {
        this.playerRef.nativeElement.play();
      }
      this.sendJoinEvent();
    }
  }

  async initPlayer(): Promise<void> {
    await this.updateAll();
    return new Promise(async (resolve, reject) => {
      if (!Hls.isSupported()) {
        alert('oops! player not supported!');
        reject();
      }
      const hls = new Hls();
      hls.loadSource(this.currentVideo.videoUrl);
      hls.attachMedia(this.playerRef?.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('video manifest loaded');
        resolve();
      });
    });
  }

  async updateAll(): Promise<void> {
    this.stream = await this.streamService.getStream(this.streamId).toPromise();
    console.log('update stream: ', this.stream);
    this.playlist = await this.streamService.getVideos(this.streamId).toPromise();
    console.log('update playlist: ', this.playlist);
    const videoNumber = this.stream.currentNumberVideo;
    this.currentVideo = this.playlist[videoNumber];
    console.log('update current video: ', this.currentVideo);
  }

  connect(): void {
    console.log('connect');
    const topic = `/topic/streams/${this.streamId}/events`;
    console.log(topic);
    this.rxStompService.watch(topic).subscribe(message => {
      this.onMessageReceived(JSON.parse(message.body));
    });
  }

  async onMessageReceived(message): Promise<void> {
    console.log('onMessageReceived');
    console.log(message);

    if (message.type === 'join') {
      console.log('join');
      if (this.isAdmin) {
        this.sendTimeEvent();
      }
    }
    if (message.type === 'time') {
      console.log('time');
      if (!this.isAdmin) {
        this.playerRef.nativeElement.currentTime = message.time;
        this.playerRef.nativeElement.play();
      }
    }
    if (message.type === 'state') {
      console.log('state');
      if (message.state === 'pause') {
        this.playerRef.nativeElement.pause();
      }
      if (message.state === 'play') {
        this.playerRef.nativeElement.play();
      }
    }
    if (message.type === 'next') {
      this.playerRef.nativeElement.pause();
      await this.updateAll();

      if (!this.stream.activeStream) {
        this.streamEnded.next(true);
        return;
      }

      const hls = new Hls();
      hls.loadSource(this.currentVideo.videoUrl);
      hls.attachMedia(this.playerRef?.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.playerRef.nativeElement.play();
      });
    }

    if (message.type === 'vote') {
      await this.updateAll();
    }
  }

  sendEvent(message): void {
    console.log('sendMessage');
    console.log(message);
    const topic = `/topic/streams/${this.streamId}/events`;
    this.rxStompService.publish({destination: topic, body: JSON.stringify(message)});
  }

  sendJoinEvent(): void {
    console.log('sendSyncTimeEvent');
    const message = {type: 'join'};
    this.sendEvent(message);
  }

  sendTimeEvent(): void {
    console.log('sendTimeEvent');
    const message = {type: 'time', time: this.playerRef.nativeElement.currentTime};
    this.sendEvent(message);
  }

  sendStateEvent(state: 'play' | 'pause'): void {
    console.log('sendTimeEvent');
    const message = {type: 'state', state};
    this.sendEvent(message);
  }

  sendNextVideoCommand(): void {
    console.log('sendNextVideoEvent');
    const topic = `/app/streams/${this.streamId}/next`;
    this.rxStompService.publish({destination: topic});
  }


  async onStartButtonClicked(): Promise<void> {
    if (this.playerLoaded && !this.playerStarted) {
      this.playerStarted = true;
      await this.onPlayerStarted();
    }
  }

  onEnded(): void {
    if (this.isAdmin) {
      this.sendNextVideoCommand();
    }
  }
}
