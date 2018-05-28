import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppGlobal, AppService } from "../../app/app.service";

@Component({
  selector: 'alx-address-picker',
  templateUrl: 'alxaddresspicker.component.html'
})

export class AlxAddressPickerComponent implements OnInit {
  @Input('level') areaLevel:number; /* area level 1-4 */
  @Input() placeholder: string = "请选择"; /* placeholder  */
  @Input('value') currentCities: any; /* current city info {province:'',city:'',district:'',street:'' }*/
  @Output('valueChanged') value: EventEmitter<string> = new EventEmitter<string>();/* value change  */

  currentProvince: string = ''; /* current province info */
  currentCity: string = '';  /* current city info */
  currentDistrict: string = ''; /* current district info */
  currentStreet: string = ''; /* current street info */
  currentLevel: string = '0'; /* current area select level info */
  baseProvince: string = ''; /* get user current or user selected province info */
  baseCity: string = ''; /* get user current or user selected city info */
  baseDistrict: string = ''; /* get user current or user selected district info */
  baseStreet: string = ''; /* get user current or user selected street info */
  dataCitiesList: any = []; /* from data service get all cities list(not has province)*/
  dataProvinces: any; /* from data service get all province list*/
  dataCities: any;  /* from cities list filter city data*/
  dataDistricts: any; /* from cities list filter district data*/
  dataStreets: any; /* from cities list filter street data*/
  areaHide: boolean = true; /* city select area set hide (default:false)*/
  noData: boolean = true;

  constructor(public appService: AppService){}

  ngOnInit(){
      if(this.appService.getItem(AppGlobal.cache.cities)) {
          this.dataCitiesList = this.appService.getItem(AppGlobal.cache.cities);
          if(this.dataCitiesList && this.dataCitiesList.length > 0) {
              this.loadProvince();
              this.loadCities(true);
              this.loadCities(false);
          }
          this.dataChange();
      }
  }

  /* city level changed */
  levelChange(en:any) {
    //console.log(en.value);
  }

  dataChange() {
      if(this.currentCities) {
          if(this.currentCities['province']['code'])
            this.noData = false;
      }
  }
  /* parent city change (code:current city code , lvl: current city level) */
  parentChanged(code: string,lvl: number) {
      if(lvl == 0){
          this.currentProvince = code;
          if(this.currentProvince != this.baseProvince) {
              this.baseProvince = code;
              this.loadCities(true);
          }
      }
      if(lvl == 1){
          this.currentCity = code;
          if(this.currentCity != this.baseCity) {
              this.baseCity = code;
              this.loadCities(false);
          }
      }
      if(lvl == 2){
          this.currentDistrict = code;
          if(this.currentDistrict != this.baseDistrict) {
              this.baseDistrict = code;
          }
      }
  }
  /* get current city show name (code:current city code , level: current city level) */
  getCurrentName(code: string,level: number): string{
      let data = [];
      if(this.dataCitiesList && this.dataCitiesList.length >0 ) {
          data = this.dataCitiesList.filter(item => {
            return item.code === code && item.level === level + 1;
          });
      }

      return data.length > 0?data[0]['name']:code;
  }

  /* get all province data */
  loadProvince(){
      this.dataProvinces = this.dataCitiesList.filter( item => {
          return item.level === 1;
      });
      this.baseProvince = this.dataProvinces[0]['code'];
      this.currentProvince = this.baseProvince;
  }

  /* get all city data (isCity: if current not province this set false,else set true) */
  loadCities(isCity: boolean) {
    if(isCity) {
      this.dataCities = this.dataCitiesList.filter( item => {
        return item.level === 2 && item.parent === this.currentProvince;
      });

      this.baseCity = this.dataCities[0]["code"];
      this.currentCity = this.baseCity;
      this.loadCities(false);
    } else {
        this.dataDistricts = this.dataCitiesList.filter( item => {
          return item.level === 3 && item.parent === this.currentCity;
        });

        this.baseDistrict = this.dataDistricts[0]["code"];
        this.currentDistrict = this.baseDistrict;
    }
  }
  /* close this show area callback current city data */
  close() {
      this.currentCities = {
          province: { code: this.baseProvince, name: this.getCurrentName(this.baseProvince,0) },
          city: { code: this.baseCity, name: this.getCurrentName(this.baseCity,1) },
          district: { code: this.baseDistrict, name: this.getCurrentName(this.baseDistrict,2) },
          street: { code: this.baseStreet, name: this.getCurrentName(this.baseStreet,3) }
      };
      this.dataChange();
      this.value.emit(this.currentCities);
      this.areaHide = false;
  }
}
