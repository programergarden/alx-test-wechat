import { Injectable } from "@angular/core";
import { AppGlobal, AppService } from "../app/app.service";

@Injectable()
export class CitiesService{

  constructor(private http: AppService){}

  getCities() {
      let serviceUrl =  AppGlobal.API.cities + '/getAllForList';
      if(this.http.getItem(AppGlobal.cache.cities)){
          return this.http.getItem(AppGlobal.cache.cities);
      }
      else {
          this.http.apiGet(serviceUrl).subscribe(
            res => {
              if (res['code'] == 200) {
                  this.http.setItem(AppGlobal.cache.cities, res['data']);
                  return res['data'];
              }
              else {
                  this.http.toast(res['message']);
              }
            }, error => {
                this.http.handleError(error);
            });
      }
  }
}
