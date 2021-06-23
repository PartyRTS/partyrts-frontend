import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StreamService} from '../../services/stream.service';
import {StreamVoteService} from '../../services/stream-vote.service';
import {AuthService} from '../../../core/services/auth.service';
import {NewVoteSkip} from '../../models/new-vote-skip.model';

@Component({
  selector: 'app-suggest-skip-video',
  templateUrl: './suggest-skip-video.dialog.html',
  styleUrls: ['./suggest-skip-video.dialog.scss']
})
export class SuggestSkipVideoDialog implements OnInit {
  streamId: number;
  currentUserId: number;

  constructor(
    private readonly dialogRef: MatDialogRef<SuggestSkipVideoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly authService: AuthService,
    private readonly streamService: StreamService,
    private readonly streamVoteService: StreamVoteService,
  ) {
  }

  ngOnInit(): void {
    this.streamId = this.data.streamId;
  }

  async onClick(): Promise<void> {
    const videos = await this.streamService.getVideos(this.streamId).toPromise();
    const lastVideoNumber = videos.length - 1;
    const newVoteSkip: NewVoteSkip = {numberSkipVideo: lastVideoNumber};
    await this.streamVoteService.addVoteSkip(this.streamId, newVoteSkip).toPromise();
    this.dialogRef.close();
  }
}
