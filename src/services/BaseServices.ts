import { Injectable } from "@angular/core";
import { AppService } from "../app/app.service";


@Injectable()
export class BaseServices {
  AppID: string = '';
  MchID: string = '';
  DeviceInfo: string = 'WEB';

  constructor(private http: AppService) {}

  WeChatLogin(code: string){
    let serviceUrl = '${this.baseUrl}/authorization/customer/weChatLogin?code=${code}';
    return this.http.httpGet(serviceUrl);
  }

  /*WeChatOrderCreate() {
    let serviceUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    let data = {
      appid: this.AppID, //appId
      mch_id: this.MchID, //商户号
      device_info: this.DeviceInfo, //设备号
      nonce_str:'', //随机字符串
      sign:'',  //签名
      sign_type:'MD5', //签名类型
      body: '阿里修-维修项目预付定金', //商品描述
      detail: '', //商品详情
      attach: '', //附加数据
      out_trade_no: '', //商户订单号
      fee_type: 'CNY', //标价币种
      total_fee: '2900', //标价金额
      spbill_create_ip: '' //      spbill_create_ip: '', //

    };

  }*/

}
