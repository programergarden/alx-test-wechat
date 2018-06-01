import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { animate, group, query, style, transition, trigger } from "@angular/animations";
import { CitiesService } from "../../services/CitiesService";


@Component({
  selector: 'alx-address-picker',
  templateUrl: 'alxaddresspicker.component.html',
  providers: [ CitiesService ],
  animations: [
    trigger('addressAnimation', [
      transition(":increment", group([
        query(':enter', [
          style({ left: '100%' }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ left: '-100%' }))
        ])
      ])),
      transition(":decrement", group([
        query(':enter', [
          style({ left: '-100%' }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ left: '100%' }))
        ])
      ]))
    ])
  ]
})

export class AlxAddressPickerComponent implements OnInit {
  @Input('level') areaLevel:number; /* area level 1-4 */
  @Input() placeholder: string = "请选择"; /* placeholder  */
  @Input('title') addressTitle: string;/* address picker show title */
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
  cityShow: boolean = false; /* city tab show */
  districtShow: boolean = false; /* district tab show */
  streetShow: boolean = false; /* street tab show */
  noData: boolean = true;
  areaHide: boolean = true; /* city select area set hide (default:false)*/

  constructor(public cityService: CitiesService){
      this.dataCitiesList = this.cityService.getCities();
  }

  ngOnInit(){
      if(this.dataCitiesList && this.dataCitiesList.length > 0) {
          this.loadProvince();
          this.dataChange();
      }
  }

  /* city level changed */
  levelChange(en: any) {
     this.currentLevel = en.value;
  }

  dataChange() {
      if(this.currentCities) {
          if(this.currentCities['province']['code']) {
              this.noData = false;
              this.baseProvince = this.currentCities['province']['code'];
              this.baseCity = this.currentCities['city']['code'];
              this.baseDistrict = this.currentCities['district']['code'];
              if(this.areaLevel>3) {
                  this.baseStreet = this.currentCities['street']['code'];
              }
          }
      }
  }
  /* parent city change (code:current city code , lvl: current city level) */
  provinceChanged(event) {
      this.currentProvince = event;
      if(this.currentProvince != this.baseProvince) {
        this.baseProvince = event;
        if(''!== this.baseProvince) {
          this.currentCity = '';
          this.currentDistrict = '';
          this.currentStreet = '';
          this.cityShow = true;
          this.loadCities(true);
          this.currentLevel = (Number(this.currentLevel) + 1).toString();
        }
      }
  }

  cityChanged(event) {
      this.currentCity = event;
      if(this.currentCity != this.baseCity) {
          this.baseCity = event;
          if(''!== this.baseCity) {
              this.currentDistrict = '';
              this.currentStreet = '';
              this.districtShow = true;
              this.loadCities(false);
              this.currentLevel = (Number(this.currentLevel) + 1).toString();
          }
      }
  }

  districtChanged(event) {
      this.currentDistrict = event;
      if(this.currentDistrict != this.baseDistrict) {
          this.baseDistrict = event;
          if(this.areaLevel>3) {
              if (this.baseDistrict !== '') {
                this.currentStreet = '';
                this.streetShow = true;
                this.currentLevel = (Number(this.currentLevel) + 1).toString();
              }
          }
          else {
              this.changeData();
          }
      }
  }

  streetChanged(event) {
      this.currentStreet = event;
      if(this.currentStreet != this.baseStreet) {
          this.baseStreet = event;
          if('' !== this.baseStreet) {
              this.changeData();
          }
      }
  }

  /* get current city show name (code:current city code , level: current city level) */
  getCurrentName(code: string,level: number): string{
      if(''=== code || ''=== code || 'undefined'=== typeof code) {
          return '请选择';
      } else {
          let data = [];
          if (this.dataCitiesList && this.dataCitiesList.length > 0) {
            data = this.dataCitiesList.filter(item => {
              return item.code === code && item.level === level + 1;
            });
          }

          return data.length > 0 ? data[0]['name'] : code;
      }
  }

  /* get all province data */
  loadProvince(){
      this.dataProvinces = this.dataCitiesList.filter( item => {
          return item.level === 1;
      });
  }

  /* get all city data (isCity: if current not province this set false,else set true) */
  loadCities(isCity: boolean) {
      if(isCity) {
          this.dataCities = this.dataCitiesList.filter( item => {
              return item.level === 2 && item.parent === this.currentProvince;
          });
      } else {
          this.dataDistricts = this.dataCitiesList.filter( item => {
            return item.level === 3 && item.parent === this.currentCity;
          });
      }
  }
  /* close this show area callback current city data */
  changeData() {
      if(this.currentProvince && '' !== this.currentProvince
        && this.currentCity  && '' !== this.currentCity
        && this.currentDistrict  && '' !== this.currentDistrict) {
          this.currentCities = {
              province: {code: this.currentProvince, name: this.getCurrentName(this.currentProvince, 0)},
              city: {code: this.currentCity, name: this.getCurrentName(this.currentCity, 1)},
              district: {code: this.currentDistrict, name: this.getCurrentName(this.currentDistrict, 2)}
          };
          if(this.areaLevel> 3 && this.currentStreet && '' !== this.currentStreet) {
              this.currentCities['street'] = {code: this.baseStreet, name: this.getCurrentName(this.baseStreet, 3)};
          }
          this.dataChange();
          this.value.emit(this.currentCities);
          this.currentLevel = '0';
          this.areaHide = true;
      }
  }

  swipeEvent(event){
      if(event.direction == 2) {
          if(Number(this.currentLevel)>0)
            this.currentLevel = (Number(this.currentLevel)-1).toString();
      }
      if(event.direction == 4) {
        if(Number(this.currentLevel) < (this.areaLevel-1))
          this.currentLevel = (Number(this.currentLevel)+1).toString();
      }
  }
}
