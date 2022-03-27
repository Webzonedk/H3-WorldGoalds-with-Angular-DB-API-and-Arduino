import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { HandleDataService } from '../services/handle-data.service';
import { SensorData } from './../interfaces/sensorData';


@Component({
  selector: 'app-showGraph',
  templateUrl: './showGraph.component.html',
  styleUrls: ['./showGraph.component.css']
})
export class ShowGraphComponent implements OnInit {

  sensorDataArray: SensorData[] = [];




  constructor(private handleDataService: HandleDataService, private crudService: CrudService, ) {

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
    this.loadSensorData();
  }


}
