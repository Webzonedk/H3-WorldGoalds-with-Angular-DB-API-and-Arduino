import { SensorData } from './../interfaces/sensorData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})


export class CrudService {
  //The url for the API
  ApiURL: string = "http://192.168.2.24:8001"

  constructor(private http: HttpClient) { }

  //-------------------------------------
  //SignalR datahub start.
  //-------------------------------------
  hubConnection!: signalR.HubConnection;

  updateData!: () => void;
  onDataUpdate(fn: () => void) {
    this.updateData = fn;
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      //.withUrl('http://192.168.2.24:8001/sensorData') //Home
      .withUrl('http://192.168.2.106:8001/sensorData') //School
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.updateData();
    });
  }
  //-------------------------------------


  //Service to retrieve data from the API in json format
  getSensorData(): Observable<SensorData[]> {
    var result = this.http.get<SensorData[]>(this.ApiURL + `/api/sensor/get`);
    return result;
  }


}
