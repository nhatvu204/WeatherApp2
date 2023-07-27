import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Condition, Condition2, Day, Forecastday, WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.getWeatherData(this.cityName);
    // this.http.get<WeatherData>(`http://api.weatherapi.com/v1/forecast.json?key=7f163eb0b09c41269e714907230506&q=${this.cityName}&days=8&aqi=no&alerts=no`)
    // .subscribe((res) => {
    //   this.weatherData = res;
    //   this.temp_now = this.weatherData.current.temp_c;
    //   this.cond_now = this.weatherData.current.condition.text;
    //   this.img_now += this.weatherData.current.condition.icon;
    //   this.location = this.weatherData.location.name +','+ this.weatherData.location.country;
    //   this.h = this.weatherData.location.localtime.slice(11);
    //   this.uv = this.weatherData.forecast.forecastday[0].day.uv;
    //   this.feelsLike = this.weatherData.current.feelslike_c;
    //   this.forecastArr = this.weatherData.forecast.forecastday.splice(1);
    //   this.visibility = this.weatherData.forecast.forecastday[0].day.avgvis_km;
    //   this.wind = this.weatherData.forecast.forecastday[0].day.maxwind_kph;
    //   this.humidity = this.weatherData.forecast.forecastday[0].day.avghumidity;
    //   for (let i =0; i<this.forecastArr.length; i++){
    //     this.forecastImgArr.push(this.forecastArr[i].day.condition.icon);
    //   }
    //   this.today = new Date(this.weatherData.location.localtime.slice(0,10));

    //   for (let i = 0; i < this.forecastArr.length; i++){
    //     let wDay = new Date(this.forecastArr[i].date);
    //     this.forecastWDay.push(this.weekdayShort[wDay.getDay()]);
    //   }
    // })
  }

  onSubmit(){
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string){
    this.http.get<WeatherData>(`https://api.weatherapi.com/v1/forecast.json?key=6ddea25423a2438f887140837232707&q=${this.cityName}&days=8&aqi=no&alerts=no`)
    .subscribe((res) => {
      this.weatherData = res;
      this.temp_now = this.weatherData.current.temp_c;
      this.cond_now = this.weatherData.current.condition.text;
      this.img_now += this.weatherData.current.condition.icon;
      this.location = this.weatherData.location.name +','+ this.weatherData.location.country;
      this.h = this.weatherData.location.localtime.slice(11);
      this.uv = this.weatherData.forecast.forecastday[0].day.uv;
      this.feelsLike = this.weatherData.current.feelslike_c;
      this.forecastArr = this.weatherData.forecast.forecastday.splice(1);
      this.visibility = this.weatherData.forecast.forecastday[0].day.avgvis_km;
      this.wind = this.weatherData.forecast.forecastday[0].day.maxwind_kph;
      this.humidity = this.weatherData.forecast.forecastday[0].day.avghumidity;
      for (let i =0; i<this.forecastArr.length; i++){
        this.forecastImgArr.push(this.forecastArr[i].day.condition.icon);
      }
      this.today = new Date(this.weatherData.location.localtime.slice(0,10));

      for (let i = 0; i < this.forecastArr.length; i++){
        let wDay = new Date(this.forecastArr[i].date);
        this.forecastWDay.push(this.weekdayShort[wDay.getDay()]);
      }
    })

    this.img_now = 'https:'
  }

  cityName: string = 'Ha Noi';

  weatherData?: WeatherData;

  temp_now;
  cond_now;
  img_now = 'https:';
  location;
  feelsLike;
  uv;
  visibility;
  wind;
  humidity;


  forecastArr:Forecastday[];
  forecastImgArr:string[] = [];

  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  weekdayShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  forecastWDay:string[] = [];
  today = new Date();
  h = ''
}
