import { Injectable } from "@angular/core";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { AppGlobal, AppService } from "../app/app.service";

export class Order {
    customerId: string;/*客户编号*/
    displayName: string;/*联系人*/
    customerPhone: string; /*联系电话*/
    customerType: number = 1;/*用户类型 */
    provinceString: string; /*联系地址 省*/
    cityString: string;/*联系地址 市*/
    areaString: string;/*联系地址 区*/
    address: string;/*联系地址 乡镇、街道信息*/
    addressDetail: string;/*联系地址 详细*/
    serviceCodeL1: string;/*服务目录 1级*/
    serviceCodeL2: string;/*服务目录 2级*/
    serviceCodeL3: string;/*服务目录 3级*/
    description: string;/*报修 说明*/
    repairOrderSource: number = 4;
    appointmentTimeStart: string; /* 预约时间 */
}

@Injectable()
export class OrdersService {
    constructor(public http: AppService){ }


    getOrders(params){
      let serviceUrl =  AppGlobal.API.orders + '/getCustomerRepairOrders';
      let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));
      this.http.apiGet(serviceUrl,params,headers).subscribe(res=> {
        console.log(res);
      })
    }

    getOrdersByStatus(params){
        let serviceUrl =  AppGlobal.API.orders + '/getCustomerRepairOrders';
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

    closeOrder(repairOrderId: string) {
        let serviceUrl =  AppGlobal.API.orders + '/close';
        let params = new HttpParams()
            .set('repairOrderId',repairOrderId)
            .set('content','');
        let headers = new HttpHeaders().set('X-AUTH-TOKEN',this.http.getItem(AppGlobal.cache.token));

        return this.http.apiDelete(serviceUrl,params,headers);
    }
}
