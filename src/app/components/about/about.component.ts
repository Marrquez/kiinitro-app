import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html'
})
export class AboutComponent {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) { };

  ngAfterViewInit() {
    this.slides.autoplay = 1000;
    this.slides.loop = true;
  }
}
