import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StreamService} from '../../services/stream.service';
import {StreamVoteService} from '../../services/stream-vote.service';

@Component({
  selector: 'app-suggest-skip-video',
  templateUrl: './suggest-skip-video.dialog.html',
  styleUrls: ['./suggest-skip-video.dialog.scss']
})
export class SuggestSkipVideoDialog implements OnInit {
  private streamId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<SuggestSkipVideoDialog>,
    private readonly streamService: StreamService,
    private readonly streamVoteService: StreamVoteService,
  ) {
  }

  ngOnInit(): void {
    this.streamId = this.data.streamId;
  }

  onClick(): void {
    // this.streamVoteService.addVoteAdd(this.streamId,);
  }
}
