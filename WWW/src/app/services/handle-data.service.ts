import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SensorData } from '../interfaces/sensorData';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class HandleDataService {
  //Create a new subscription
  sensorData$: BehaviorSubject<SensorData[]> = new BehaviorSubject<SensorData[]>([]);

  constructor(private crudService: CrudService) { }

  loadSensorData() {
    let count;

    this.crudService.getSensorData().subscribe((sensorData: SensorData[]) => {
      next:
      count = sensorData;

      complete:
      this.sensorData$.next(count);
    });
  }
}
