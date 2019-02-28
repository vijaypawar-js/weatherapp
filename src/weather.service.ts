import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor( private httpClient:HttpClient) { }
  URl ="//s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/"

  getData(metric,country):Observable<any>{
      return this.httpClient.get(this.URl+metric+'-'+country+".json");
  }
}
