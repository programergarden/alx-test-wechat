import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  listType: string = '0';
  DataList: any[];
  constructor(public navCtrl: NavController) {
    this.DataList = [{id:1,text:'Test'},{id:1,text:'Test'},{id:1,text:'Test'},{id:1,text:'Test'},{id:1,text:'Test'},{id:1,text:'Test'},{id:1,text:'Test'}];
  }

}
