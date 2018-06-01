import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-common',
  templateUrl: 'common.html'
})

export class CommonPage {
  content: any;

  constructor(public viewCtrl: ViewController){
  }

  dismiss() {
    this.viewCtrl.dismiss('close');
  }
}
