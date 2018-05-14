import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AutosizetextareaDirective } from "../../until/autosizetextarea/autosizetextarea";

@Component({
  selector: 'page-maintain',
  templateUrl: 'maintain.html',
  providers: [AutosizetextareaDirective]
})
export class MaintainPage {
  contentCount: number = 0;

  constructor(public navCtrl: NavController) {
  }

  getContentCount(count: number) {
    this.contentCount = count;
  }

}
