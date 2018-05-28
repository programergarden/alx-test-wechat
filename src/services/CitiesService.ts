import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { AppGlobal, AppService } from "../app/app.service";

@Injectable()
export class CitiesService{

  constructor(private http: AppService){}

  getCities() {
    let serviceUrl =  AppGlobal.API.cities + '/getAllForList';
    let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token))
    this.http.apiGet(serviceUrl,null,headers).subscribe(
      res => {
        if(res['code']==200) {
          this.http.setItem(AppGlobal.cache.cities,res['data']);
          return res['data'];
        }
        else {
          this.http.toast(res['message']);
        }
      },error => {
        this.http.handleError(error);
      }
    );
  }
}
