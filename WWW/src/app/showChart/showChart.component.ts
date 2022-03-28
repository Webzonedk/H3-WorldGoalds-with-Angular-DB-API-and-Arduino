import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { HandleDataService } from '../services/handle-data.service';
import { SensorData } from './../interfaces/sensorData';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// import * as pluginAnnotation from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-showChart',
  templateUrl: './showChart.component.html',
  styleUrls: ['./showChart.component.css']
})
export class ShowChartComponent implements OnInit {
  // public barChartPlugins = [pluginAnnotation];
  sensorDataArray: SensorData[] = [];
  tempData: number[] = [];
  humidityData: number[] = [];
  logTimeData: Date[] = [];





  constructor(private handleDataService: HandleDataService, private crudService: CrudService) {
    console.log('Constructor loaded');
    this.handleDataService.sensorData$.subscribe((sensorDataFromApi: SensorData[]) => {
      next:
      if (this.sensorDataArray.length !== sensorDataFromApi.length) {
        this.sensorDataArray = sensorDataFromApi;

        for (let index = 0; index < this.sensorDataArray.length; index++) {
          this.tempData[index] = this.sensorDataArray[index].temperature;
          this.humidityData[index] =this.sensorDataArray[index].humidity;
          this.logTimeData[index] =this.sensorDataArray[index].logTime;
        }
        // console.log('sensorDataArray_1');
        // console.log(this.sensorDataArray);
        // console.log('tempData_1');
        // console.log(this.tempData);
        // console.log('humidityData_1');
        // console.log(this.humidityData);
        // console.log('logTime_1');
        // console.log(this.logTimeData);
        this.chart?.update();
      }
    });

  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.tempData,
        label: 'Temperature',
        yAxisID: 'y-axis-0',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.humidityData,
        label: 'Humidity',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
      // ,
      // {
      //   data: [180, 480, 770, 90, 1000, 270, 400],
      //   label: 'Series C',
      //   yAxisID: 'y-axis-1',
      //   backgroundColor: 'rgba(255,0,0,0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // }
    ],
    labels: this.logTimeData
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },



    plugins: {
      legend: { display: true }


      //   annotation: {
      //     annotations: [
      //       {
      //         type: 'line',
      //         scaleID: 'x',
      //         value: 'March',
      //         borderColor: 'orange',
      //         borderWidth: 2,
      //         label: {
      //           position: 'center',
      //           enabled: true,
      //           color: 'orange',
      //           content: 'LineAnno',
      //           font: {
      //             weight: 'bold'
      //           }
      //         }
      //       },
      //     ],
      //   }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = ShowChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = ShowChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
    }

    this.chart?.update();
  }







  ngOnInit(): void {
    console.log('ngOnInit loaded');
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
