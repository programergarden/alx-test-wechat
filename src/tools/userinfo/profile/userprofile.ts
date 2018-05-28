import { Component } from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    selector: 'page-userprofile',
    templateUrl: 'userprofile.html'
})

export class UserProfilePage {
    user: any;
    constructor(public navParams: NavParams){
        this.user = this.navParams.get('data');
    }
}
