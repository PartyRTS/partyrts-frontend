import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Video} from '../models/video.model';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../user/services/user.service';
import {UserVideoService} from '../../user/services/user-video.service';
import {PlaylistService} from '../../playlist/services/playlist.service';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NewVideo} from '../models/new-video.model';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.dialog.html',
  styleUrls: ['./add-video.dialog.scss']
})
export class AddVideoDialog implements OnInit {

  videoTitleForm = new FormControl('', [Validators.required]);

  $videos: Observable<Video[]>;
  private currentUserId: number;

  private selectedVideoFile: any;
  private selectedPreviewFile: any;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userVideoService: UserVideoService,
    private readonly playlistService: PlaylistService,
    private readonly dialogRef: MatDialogRef<AddVideoDialog>,
    private readonly http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.userId;
    this.$videos = this.userVideoService.getAllVideos(this.currentUserId);
  }

  onVideoFileChanged(event): void {
    this.selectedVideoFile = event.target.files[0];
  }

  onPreviewFileChanged(event): void {
    this.selectedPreviewFile = event.target.files[0];
  }

  async upload(): Promise<void> {
    const title = this.videoTitleForm.value;
    const data: NewVideo = {title, idUser: this.currentUserId};
    const video = await this.http.post<Video>(`${environment.apiUrl}/api/v1/videos`, data).toPromise();
    await this.http.post<Video>(`${environment.apiUrl}/api/v1/videos`, data).toPromise();

    const uploadData = new FormData();
    uploadData.append('file', this.selectedVideoFile, this.selectedVideoFile.name);
    try {
      await this.http.post<any>(`${environment.apiUrl}/api/v1/aws/${video.idVideo}/video`, uploadData).toPromise();
    } catch (e) {
      //
    }

    const uploadData1 = new FormData();
    try {
      uploadData1.append('file', this.selectedPreviewFile, this.selectedPreviewFile.name);
      await this.http.post<any>(`${environment.apiUrl}/api/v1/aws/${video.idVideo}/preview`, uploadData1).toPromise();
    } catch (e) {
      //
    }
    this.dialogRef.close();
  }
}
