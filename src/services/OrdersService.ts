import { Injectable } from "@angular/core";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { AppGlobal, AppService } from "../app/app.service";

export class Order {
    customerId: string;/*客户编号*/
    displayName: string;/*联系人*/
    customerPhone: string; /*联系电话*/
    customerType: number = 1;/*用户类型 */
    addressProvince: string; /*联系地址 省*/
    addressCity: string;/*联系地址 市*/
    addressDistrict: string;/*联系地址 区*/
    addressDetail: string;/*联系地址 详细*/
    community: string;/*联系地址 省*/
    serviceCodeL1: string;/*服务目录 1级*/
    serviceCodeL2: string;/*服务目录 2级*/
    serviceCodeL3: string;/*服务目录 3级*/
    description: string;/*报修 说明*/
    repairOrderSource: number = 4;
    appointmentTimeStart: number; /* 预约时间 */
}

@Injectable()
export class OrdersService {
    constructor(public http: AppService){ }

    getOrders(pageIndex: number, pageSize: number){
        let serviceUrl =  AppGlobal.API.orders + '/getCustomerRepairOrders';
        let params = new HttpParams().set('pageNum',pageIndex.toString())
          .set('pageSize',pageSize.toString());
        let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));

        this.http.apiGet(serviceUrl,params,headers).subscribe(res=> {
            console.log(res);
        })
    }

    getOrdersByStatus(pageIndex: number, pageSize: number, status: string){
        let serviceUrl =  AppGlobal.API.orders + '/getCustomerRepairOrders';
        let params = new HttpParams().set('pageNum',pageIndex.toString())
          .set('pageSize',pageSize.toString())
          .set('status',status);
        let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));

        this.http.apiGet(serviceUrl,params,headers).subscribe(res=> {
          console.log(res);
        })
    }

    addOrder(order: Order){
      let serviceUrl =  AppGlobal.API.orders + '/create';
      let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));

      this.http.apiPost(serviceUrl,order,null,headers).subscribe( res=> {
          console.log(res);
      },error => {
          this.http.handleError(error);
      })
    }

    closeOrder(id: number) {
        let serviceUrl =  AppGlobal.API.orders + '/close';
        let params = new HttpParams()
            .set('repairOrderId',id.toString())
            .set('content','');
        let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));

        this.http.apiDelete(serviceUrl,params,headers).subscribe( res=> {
          console.log(res);
        },error => {
          this.http.handleError(error);
        })
    }
}
