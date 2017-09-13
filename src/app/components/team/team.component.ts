import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'team',
  templateUrl: 'team.component.html'
})
export class TeamComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };

  ngOnInit() {
    this.slides.autoplay = 1000;
    this.slides.loop = true;
  };
}
