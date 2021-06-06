import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input()
  videoId;
  @Input()
  title: string;
  @Input()
  previewUrl: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
