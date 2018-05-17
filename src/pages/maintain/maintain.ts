import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import { AutosizetextareaDirective } from "../../until/autosizetextarea/autosizetextarea";
import { UserinfoComponent } from "../../tools/userinfo/userinfo.component";

@Component({
  selector: 'page-maintain',
  templateUrl: 'maintain.html',
  providers: [AutosizetextareaDirective]
})
export class MaintainPage {
  contentCount: number = 0;

  constructor(public navCtrl: NavController,private appCtrl:App) {
  }

  getContentCount(count: number) {
    this.contentCount = count;
  }

  goToUserInfo() {
      this.navCtrl.push(UserinfoComponent);
  }

}
