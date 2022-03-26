import { SensorData } from '../interfaces/sensorData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CrudService {
  //The url for the API
  ApiURL: string = "http://192.168.2.24:8001"

  constructor(private http: HttpClient) {

  }

  //Service to rethrieve data ferom the API in json format
  getSensorData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(this.ApiURL + `/api/sensor/get`);
  }


}
