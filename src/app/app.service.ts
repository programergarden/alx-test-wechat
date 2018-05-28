import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class AppGlobal {

  static METHOD_DELETE = 'DELETE';
  static METHOD_POST = 'POST';
  static METHOD_GET = 'GET';
  static METHOD_PUT = 'PUT';

  //缓存key的配置
  static cache: any = {
      token: "_data_token",
      customer: "_data_customer",
      cities: "_data_cities",
      categories: "_data_categories",
      hots: '_data_hots'
  }

  //接口基地址
  static domain =  ('sh.alxiu.com' === window.location.hostname)? '/':'/api';

  //接口地址
  static API: any = {
      authorization: '/authorization',
      categories: '/serviceCatalogue/sc',
      cities: '/base/area',
      orders:'/orderService/repairOrder'
  };

}

@Injectable()
export class AppService {
  constructor(public http: HttpClient, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  apiPost(url: string,body?: any,searchParams?: HttpParams,xHeaders?: HttpHeaders) {
    if(xHeaders)
        xHeaders.set('Content-Type', 'application/json');
    else
        xHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
        body: body? body: null,
        headers: xHeaders,
        params: searchParams
    };

    return this.http.request(AppGlobal.METHOD_POST,AppGlobal.domain + url,options);
  }

  apiGet(url: string,searchParams?: HttpParams,xHeaders?: HttpHeaders) {
    if(xHeaders)
        xHeaders.set('Content-Type', 'application/json');
    else
        xHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
      headers: xHeaders,
      params: searchParams
    };

    return this.http.request(AppGlobal.METHOD_GET,AppGlobal.domain + url,options);
  }

  apiPut(url: string,searchParams?: HttpParams,xHeaders?: HttpHeaders) {
    if(xHeaders)
        xHeaders.set('Content-Type', 'application/json');
    else
        xHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
        headers: xHeaders,
        params: searchParams
    };

    return this.http.request(AppGlobal.METHOD_PUT,AppGlobal.domain + url,options);
  }

  apiDelete(url: string,searchParams?: HttpParams,xHeaders?: HttpHeaders) {
    if(xHeaders)
        xHeaders.set('Content-Type', 'application/json');
    else
        xHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
        headers: xHeaders,
        params: searchParams
    };

    return this.http.request(AppGlobal.METHOD_DELETE,AppGlobal.domain + url,options);
  }

  post(url: string,body?: any,searchParams?: HttpParams,xHeaders?: HttpHeaders) {
    if(xHeaders)
      xHeaders.set('Content-Type', 'application/json');
    else
      xHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    let options = {
      body: body? body: null,
      headers: xHeaders,
      params: searchParams
    };

    return this.http.request(AppGlobal.METHOD_POST,url,options);
  }

  handleError(error: Response | any) {
      let msg = '';
      if (error.status == 403) {
        msg = '请求无效(code：403)';
        console.log('请检查参数类型是否匹配');
      }
      if (error.status == 404) {
        msg = '请求资源不存在(code：404)';
        console.error(msg + '，请检查路径是否正确');
      }
      if (error.status == 500) {
        msg = '服务器发生错误(code：500)';
        console.error(msg + '，请检查路径是否正确');
      }
      if (error.status == 502) {
        msg = '服务器未响应(code：502)';
        console.error(msg + '，请联系管理员');
      }
      if (msg != '') {
        this.toast(msg);
      }
  }

  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      dismissOnPageChange: true,
    });
    toast.present();
    if (callback) {
      callback();
    }
  }

  setItem(key: string, obj: any) {
    try {
      var json = JSON.stringify(obj);
      window.localStorage[key] = json;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

  getItem(key: string) {
    try {
      var obj = '';
      var json = window.localStorage[key];
      if(json)
        obj = JSON.parse(json);
      return obj;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

}
