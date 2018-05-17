import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class MessageServices {
    constructor(private alertCtrl: AlertController){ }

    alert(tips: string, msg: string): void {
        let title = '信息提示';
        let icon = this.getIcon(tips);

        if(tips == 'error') {
          title = '错误信息';
        }
        if(tips == 'warning') {
          title = '告警信息';
        }
        let alert = this.alertCtrl.create({
          title: title,
          message: icon + msg,
          buttons: ['确定']
        });
        alert.present();
    }

    private getIcon(tips: string): string {
        return '<ion-icon name="'+ this.getIconName(tips) + '"></ion-icon>';
    }

    private getIconName(tips: string): string {
       let iconName = '';
       switch (tips) {
         case 'warning': {
           iconName = 'ios-warning';
           break;
         }
         case 'error': {
           iconName = 'ios-close-circle';
           break;
         }
         default: {
           iconName = 'ios-information-circle';
           break;
         }
       }

       return iconName;
    }
}
