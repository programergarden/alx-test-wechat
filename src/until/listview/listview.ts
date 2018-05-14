import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'alx-listview',
  templateUrl: 'listview.html'
})

export class AlxListView implements OnInit{
  @Input() DataList: any[];
  ChildList: string[];
  targetIndex: number = 0;
  constructor(){
  }

  ngOnInit(){
    this.ChildList = this.DataList[0]['categoryChild'];
  }

  categoryChanged(index: string) {
    this.targetIndex = Number(index);
    this.ChildList = this.DataList[index]['categoryChild'];
  }

}
