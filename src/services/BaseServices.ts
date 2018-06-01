import { Injectable } from "@angular/core";
import { AppGlobal, AppService } from "../app/app.service";
import { HttpParams } from "@angular/common/http";

export class WechatOrder {
    appid: string; //应用ID
    mch_id: string; //商户号
    device_info: string; //设备号  WEB
    nonce_str: string; //随机字符串
    sign: string; //签名
    sign_type: string;//签名类型  MD5
    body: string; //商品描述
    detail: string; //商品详情
    attach: string; //附加数据
    out_trade_no: string; //商户订单号
    fee_type: string; //标价币种
    total_fee: number; //标价金额
    spbill_create_ip: string; //  APP和网页支付提交用户端ip
    time_start: string; //交易开始时间
    time_expire: string; //交易结束时间
    goods_tag: string; //订单优惠标记
    notify_url: string;  //回调地址
    trade_type: string; //支付类型 JSAPI 公众号支付 、NATIVE 扫码支付、APP APP支付
    product_id: string; //商品ID
    limit_pay: string; //指定支付方式 上传此参数no_credit--可限制用户不能使用信用卡支付
    openid: string; //trade_type=JSAPI时（即公众号支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。
    scene_info: any; // {"store_info" : {"id": "SZTX001", "name": "腾大餐厅", "area_code": "440305", "address": "科技园中一路腾讯大厦" }}
}

export class WechatUser {
  openid: string;
  nickname: string;
  sex: number;
  headimgurl: string;
  city: string;
  province: string;
  country: string;
  subscribe_time: number;
}

export class Product {
    product_id: string;
    body: string;
    detail: string;
    fee_type: string;
    total_fee: number;
}
@Injectable()
export class BaseServices {
  AppID: string = '';
  MchID: string = '';
  DeviceInfo: string = 'WEB';

  constructor(private http: AppService) {}

  WeChatLogin(code: string){
    let serviceUrl = AppGlobal.API.authorization + '/customer/weChatLogin';
    let params = new HttpParams().set('code',code);
    this.http.apiPost(serviceUrl,null,params).subscribe(
      res => {
          if('200' === res['code']) {
              let result = res['data'];
              this.http.setItem(AppGlobal.cache.token, result.token);
              this.http.setItem(AppGlobal.cache.customer, result.customer);
          }
          else {
              this.http.alert(res['message']);
          }
      },error => {
          this.http.handleError(error);
      }
    )
  }

  WechatUserInfo() {
   /* let serviceUrl = "https://api.weixin.qq.com/cgi-bin/user/info";
    let params = new HttpParams().set("access_token","10_PfVy6opwl16h9pPE-W1De5rVfWdSx_PP9d9NtQi8Ob0hDo8Y1-XjuneJPsrG_Dq56XyHppx1LiuF7EwV97o_CnFPJfw4fwAKV6tmp4lizMpiaQ-f-WgxfmYjMxJCV4psr0pjfc_REDaxNWbuFACaACATOQ")
      .set("openid","ohQBg0VfEjyMJj3dSMFoQ9DEZzCs");
    this.http.post(serviceUrl,null,params)
      .subscribe(res=>{
          console.log(res);
          this.http.setItem(AppGlobal.cache.userInfo, res);
      },error=>{
        console.log(error);
      });*/
  }

  /*WeChatOrderCreate() {
    let serviceUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

  }*/

}
