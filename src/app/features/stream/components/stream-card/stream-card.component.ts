import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.scss']
})
export class StreamCardComponent implements OnInit {

  @Input()
  streamId: number;

  constructor() {
  }

  ngOnInit(): void {

  }

}
