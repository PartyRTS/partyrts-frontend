import {Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VideoCardComponent} from '../../../video/components/video-card/video-card.component';
import {AuthService} from '../../../core/services/auth.service';
import {StreamService} from '../../services/stream.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {Video} from '../../../video/models/video.model';
import {UserVideoService} from '../../../user/services/user-video.service';
import {StreamVoteService} from '../../services/stream-vote.service';
import {NewVoteAdd} from '../../models/new-vote-add.model';

@Component({
  selector: 'app-suggest-add-video',
  templateUrl: './suggest-add-video.dialog.html',
  styleUrls: ['./suggest-add-video.dialog.scss']
})
export class SuggestAddVideoDialog implements OnInit {

  @ViewChildren(VideoCardComponent) videoCardsRefs: QueryList<VideoCardComponent>;

  // streamTitleForm = new FormControl('', [Validators.required]);

  videos: Video[];

  currentUserId: number;

  selectedVideoCard: VideoCardComponent;
  private streamId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userVideoService: UserVideoService,
    private readonly streamService: StreamService,
    private readonly streamVoteService: StreamVoteService,
    private readonly dialogRef: MatDialogRef<SuggestAddVideoDialog>,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.streamId = this.data.streamId;
    this.currentUserId = this.authService.userId;
    this.videos = await this.userVideoService.getAllVideos(this.currentUserId).toPromise();
  }

  select(videoElement: VideoCardComponent): void {
    this.selectedVideoCard?.toggle();
    videoElement.toggle();
    this.selectedVideoCard = videoElement;
  }

  buttonEnabled(): boolean {
    return this.selectedVideoCard != null;
  }

  async addStream(): Promise<void> {
    const newVoteAdd: NewVoteAdd = {idAddVideo: this.selectedVideoCard.videoId, numberPrevVideo: 0};
    await this.streamVoteService.addVoteAdd(this.streamId, newVoteAdd).toPromise();
    this.dialogRef.close();
  }
}
