import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit{
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) { };

  ngOnInit() {
    this.slides.autoplay = 1000;
    this.slides.loop = true;
  }
}
