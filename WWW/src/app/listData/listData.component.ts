import { HandleDataService } from '../services/handle-data.service';
import { Component, OnInit } from '@angular/core';
import { SensorData } from './../interfaces/sensorData';

@Component({
  selector: 'app-listData',
  templateUrl: './listData.component.html',
  styleUrls: ['./listData.component.css']
})

export class ListDataComponent implements OnInit {

  sensorDataArray: SensorData[] = [];

  constructor(private handleDataService: HandleDataService) {

    this.handleDataService.sensorData$.subscribe((sensorDataFromApi: SensorData[]) => {
      next:
      if (this.sensorDataArray.length !== sensorDataFromApi.length) {
        this.sensorDataArray = sensorDataFromApi;
      }
    });
  }

  ngOnInit(): void {
    this.loadSensorData();
  }

  loadSensorData() {
    this.handleDataService.loadSensorData();
  }

}
