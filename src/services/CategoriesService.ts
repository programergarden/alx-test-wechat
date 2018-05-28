import { Injectable } from "@angular/core";
import { AppGlobal, AppService } from "../app/app.service";
import { HttpHeaders} from "@angular/common/http";

export class Category {
  serviceCatalogueId: string;
  serviceCode: string;
  serviceName: string;
  parentService: string;
  serviceLevel: number;
  orders: number;
  webchatHot: number;
  createUser: string;
  createTime: number;
  lastUpdateUser: string;
  lastUpdateTime: number;
  enable: number;
}

@Injectable()
export class CategoriesService {
    constructor(private http: AppService){}

    getCategories() {
      let serviceUrl =  AppGlobal.API.categories + '/getAll';
      let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token))
      this.http.apiGet(serviceUrl,null,headers).subscribe(
          res => {
              if(res['code']==200) {
                  this.http.setItem(AppGlobal.cache.categories,res['data']);
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
    getCategoryHots() {
        let serviceUrl =  AppGlobal.API.categories +'/getWechatHot';
        //let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.appService.getItem(AppGlobal.cache.token))
        return this.http.apiGet(serviceUrl).subscribe(res=>{
          if(res['code']==200) {
              this.http.setItem(AppGlobal.cache.hots,res['data']);
              return res['data'];
          }
          else {
            this.http.toast(res['message']);
          }
        },error=>{
          console.log(error);
        })
    }
}
