import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SensorData } from './../interfaces/sensorData';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class HandleDataService {
  //Create a new subscription
  sensorData$: BehaviorSubject<SensorData[]> = new BehaviorSubject<SensorData[]>([]);

  constructor(private crudService: CrudService) { }

  loadSensorData() {
    console.debug('loadSensorData')
    this.crudService.getSensorData().subscribe((sensorData: SensorData[]) => {
      next:


      complete:
      //console.debug('complete')
      this.sensorData$.next(sensorData);

    });


  }
}
