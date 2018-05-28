import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {AppService} from "../../app/app.service";

@Component({
  selector: 'alx-listview',
  templateUrl: 'listview.html'
})

export class AlxListView implements OnInit{
  @Input() DataList: any = [];
  @Output("changed") changeValue: EventEmitter<any> = new EventEmitter<any>();
  childList: any = [];
  parentList: any = [];
  targetIndex: number = -1;

  constructor(public appService: AppService){
  }

  ngOnInit(){
      if(this.DataList && this.DataList.length > 0)
        this.parentList = this.DataList.filter( item => {
            return (item.serviceLevel === 1);
        });
  }

  categoryChanged(index: string) {
      this.targetIndex = Number(index);
      if(this.parentList && this.parentList.length > 0)
        this.getChildList(this.parentList[index]["serviceCode"]);
  }

  getHots() {
      this.targetIndex = -1;
      if(this.DataList && this.DataList.length > 0) {
        this.childList = this.DataList.filter( item => {
            return (item.serviceLevel === 2 && item.webchatHot === 1);
        });
      } else {
        this.appService.toast('No Data');
      }
  }

  getChildList(parentCode: string) {
      if(this.DataList && this.DataList.length > 0) {
          this.childList = this.DataList.filter(item => {
            return (item.serviceLevel === 2 && item.parentService === parentCode);
          });
      }
  }

  changeChild(data: any) {
    this.changeValue.emit(data);
  }
}
