import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CitiesService } from "../../services/citiesService";

@Component({
  selector: 'ion-address-picker',
  templateUrl: 'ion-address-picker.html',
  providers: [CitiesService]
})
export class IonAddressPickerComponent implements OnInit{
  @Input('level') AreaLevel:number;
  @Input('value') currentCities: string;
  @Input('cancelText') cancelText: string;
  @Input('okText') okText: string;
  @Output('ok') Address:EventEmitter<string> = new EventEmitter<string>();
  @Output('dimiss') dimiss:EventEmitter<string> = new EventEmitter<string>();

  currentProvince: string = '';
  currentCity: string = '';
  currentDistrict: string = '';
  currentStreet: string = '';
  currentLevel: string = '0';
  baseProvince: string = '';
  baseCity: string = '';
  baseDistrict: string = '';
  baseStreet: string = '';
  cities: any;
  Provinces: any;
  Cities: any;
  Districts: any;
  Streets: any;
  AreaHide: boolean = false;

  constructor(private citiesService: CitiesService) {
  }

 ngOnInit(){
    this.loadProvince();
    this.loadCities(true);
    this.loadCities(false);

  }

  levelChange(en:any) {
    console.log(en.value);
  }

  parentChanged(val: string,lvl: number) {
    if(lvl == 0){
      this.currentProvince = val;
      if(this.currentProvince != this.baseProvince) {
        this.baseProvince = val;
        this.loadCities(true);
        this.loadCities(false);
      }
    }
    if(lvl == 1){
      this.currentCity = val;
      if(this.currentCity!=this.baseCity) {
        this.baseCity = val;
        this.loadCities(false);
      }
    }
    if(lvl >1){
      return ;
    }
  }

  getCurrentName(val: string,level: number): string{
    let data = [] ;
    if(0 == level && this.Provinces) {
      data = this.Provinces.filter(item => {
        return item.value == val
      });
    }
    if(1 == level && this.Cities) {
      data = this.Cities.filter(item => {
        return item.value == val
      });
    }
    if(2 == level && this.Districts) {
      data = this.Districts.filter(item => {
        return item.value == val
      });
    }
    return data.length > 0?data[0]['text']:val;
  }


  loadProvince(){
    this.citiesService.getProvince()
      .subscribe(res => {
        this.Provinces = res;
        if(this.Provinces.length > 0 )
          this.baseProvince = this.Provinces[0]['value'];
          this.currentProvince = this.baseProvince;
        },
          error =>{ console.log(error) })
  }

  loadCities(isCity: boolean) {
    this.citiesService.getCities(isCity).subscribe(res => {
        this.cities  = res;
        if(isCity) {
          this.Cities = this.cities.filter(item => {
            return item.parentVal == this.baseProvince
          });
          if(this.Cities.length > 0 ) {
            this.baseCity = this.Cities[0]["value"];
            this.currentCity = this.baseCity;
          }
        }
        else {
          this.Districts = this.cities.filter(item => {
            return item.parentVal == this.baseCity
          });
          if(this.Districts.length > 0 ) {
            this.baseDistrict = this.Districts[0]["value"];
            this.currentDistrict = this.baseDistrict;
          }
        }
        },
        error => {
            console.log(error)
    });

  }

  ok(){
    let address = {
      province:{ value: this.baseProvince, text: this.getCurrentName(this.baseProvince,0)},
      city:{ value: this.baseCity, text: this.getCurrentName(this.baseCity,1)},
      district:{ value: this.baseDistrict, text: this.getCurrentName(this.baseDistrict,2)},
      street:{ value: this.baseStreet, text: this.getCurrentName(this.baseStreet,3)}
    }
    this.Address.emit(JSON.stringify(address));
    this.AreaHide = true;
  }
  cancel() {
    this.AreaHide = true;
  }
}
