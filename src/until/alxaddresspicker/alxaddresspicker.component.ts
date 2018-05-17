import { Component, Input, OnInit } from "@angular/core";
import { CitiesService } from "../../services/citiesService";

@Component({
  selector: 'alx-address-picker',
  templateUrl: 'alxaddresspicker.component.html'
})

export class AlxAddressPickerComponent implements OnInit{
  @Input('level') AreaLevel:number; /* area level 1-4 */
  @Input('value') currentCities: string; /* current city info {province:'',city:'',district:'',street:'' }*/

  currentProvince: string = ''; /* current province info */
  currentCity: string = '';  /* current city info */
  currentDistrict: string = ''; /* current district info */
  currentStreet: string = ''; /* current street info */
  currentLevel: string = '0'; /* current area select level info */
  baseProvince: string = ''; /* get user current or user selected province info */
  baseCity: string = ''; /* get user current or user selected city info */
  baseDistrict: string = ''; /* get user current or user selected district info */
  baseStreet: string = ''; /* get user current or user selected street info */
  dataCitiesList: any; /* from data service get all cities list(not has province)*/
  dataProvinces: any; /* from data service get all province list*/
  dataCities: any;  /* from cities list filter city data*/
  dataDistricts: any; /* from cities list filter district data*/
  dataStreets: any; /* from cities list filter street data*/
  AreaHide: boolean = false; /* city select area set hide (default:false)*/

  constructor(private citiesService: CitiesService) {
  }

  ngOnInit(){
    this.loadProvince();
    this.loadCities(true);
    this.loadCities(false);

  }
  /* city level changed */
  levelChange(en:any) {
    console.log(en.value);
  }
  /* parent city change (val:current city code , lvl: current city level) */
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
      if(this.currentCity != this.baseCity) {
        this.baseCity = val;
        this.loadCities(false);
      }
    }
    if(lvl == 2){
      this.currentDistrict = val;
      if(this.currentCity != this.baseDistrict) {
        this.baseDistrict = val;
        //this.loadCities(false);
      }
    }
    if(lvl >1){
      return ;
    }
  }
  /* get current city show name (val:current city code , level: current city level) */
  getCurrentName(val: string,level: number): string{
    let data = [] ;
    if(0 == level && this.dataProvinces) {
      data = this.dataProvinces.filter(item => {
        return item.value == val
      });
    }
    if(1 == level && this.dataCities) {
      data = this.dataCities.filter(item => {
        return item.value == val
      });
    }
    if(2 == level && this.dataDistricts) {
      data = this.dataDistricts.filter(item => {
        return item.value == val
      });
    }
    return data.length > 0?data[0]['text']:val;
  }

  /* get all province data */
  loadProvince(){
    this.citiesService.getProvince()
      .subscribe(res => {
          this.dataProvinces = res;
          if(this.dataProvinces.length > 0 )
            this.baseProvince = this.dataProvinces[0]['value'];
          this.currentProvince = this.baseProvince;
        },
        error =>{ console.log(error) })
  }

  /* get all city data (isCity: if current not province this set false,else set true) */
  loadCities(isCity: boolean) {
    this.citiesService.getCities(isCity).subscribe(res => {
        this.dataCitiesList  = res;
        if(isCity) {
          this.dataCities = this.dataCitiesList.filter(item => {
            return item.parentVal == this.baseProvince
          });
          if(this.dataCities.length > 0 ) {
            this.baseCity = this.dataCities[0]["value"];
            this.currentCity = this.baseCity;
          }
        }
        else {
          this.dataDistricts = this.dataCitiesList.filter(item => {
            return item.parentVal == this.baseCity
          });
          if(this.dataDistricts.length > 0 ) {
            this.baseDistrict = this.dataDistricts[0]["value"];
            this.currentDistrict = this.baseDistrict;
          }
        }
      },
      error => {
        console.log(error)
      });
  }
}
