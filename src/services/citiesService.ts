import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CitiesService{
  provinceUrl: string = 'assets/mock-data/cities-province.json';
  citiesUrl1: string = 'assets/mock-data/cities-city.json';
  citiesUrl2: string = 'assets/mock-data/cities-district.json';
  constructor(private http: HttpClient){}

  getProvince(){
     return this.http.get(this.provinceUrl);
  }

  getCities(isCity: boolean){
    return this.http.get(isCity?this.citiesUrl1:this.citiesUrl2);
  }
}
