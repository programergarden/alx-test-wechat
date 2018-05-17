import { Injectable } from "@angular/core";
import { AppService } from "../app/app.service";


@Injectable()
export class BaseServices {
  constructor(private http: AppService) {}

  WeChatLogin(code: string){
    let serviceUrl = '${this.baseUrl}/authorization/customer/weChatLogin?code=${code}';
    return this.http.httpGet(serviceUrl);
  }

}
