import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html'
})

export class UserOrderDetailPage implements OnInit{
  dataItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams){
  }

  ngOnInit() {
      if(this.navParams.get('data')) {
        this.dataItem = this.navParams.get('data');
      }
  }
}
