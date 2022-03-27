import { CrudService } from '../services/crud.service';
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

  constructor(private handleDataService: HandleDataService, private crudService: CrudService) {

    this.handleDataService.sensorData$.subscribe((sensorDataFromApi: SensorData[]) => {
      next:
      if (this.sensorDataArray.length !== sensorDataFromApi.length) {
        this.sensorDataArray = sensorDataFromApi;
      }
    });
  }

  ngOnInit(): void {
    this.loadSensorData();
    this.crudService.startConnection();
    this.crudService.addDataListener();
    this.crudService.onDataUpdate(this.updateData.bind(this));

  }

  loadSensorData() {
    this.handleDataService.loadSensorData();
  }

  updateData() {
    // var table = $("#sensorDataList").DataTable();
    // table.destroy();
    this.loadSensorData();
}

}
