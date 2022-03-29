import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { HandleDataService } from '../services/handle-data.service';
import { SensorData } from './../interfaces/sensorData';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
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
  logTimeData: string[] = [];





  constructor(private handleDataService: HandleDataService, private crudService: CrudService) {
    //console.log('Constructor loaded');  //DEBUG
    //Subscribing to the observable
    this.handleDataService.sensorData$.subscribe((sensorDataFromApi: SensorData[]) => {
      next:
      //Filling in the data to the arrays
      if (this.sensorDataArray.length !== sensorDataFromApi.length) {
        this.sensorDataArray = sensorDataFromApi;

        for (let index = 0; index < this.sensorDataArray.length; index++) {
          this.tempData[index] = this.sensorDataArray[index].temperature;
          this.humidityData[index] = this.sensorDataArray[index].humidity;
          let tempLog = new Date(this.sensorDataArray[index].logTime);
          this.logTimeData[index] =  tempLog.toLocaleString('da-DK');
        }
        //Pushing the data to the chart Whenever there is new data available
        this.chart?.update();
      }
    });

  }

//Configuration of the chart layout, and colors
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.tempData,
        label: 'Temperature',
        yAxisID: 'y-axis-0',
        backgroundColor: 'rgba(225,6,0,0.1)',
        borderColor: 'rgba(225,6,0,1)',
        pointBackgroundColor: 'rgba(225,6,0,0.0)',
        pointBorderColor: 'rgba(250, 235, 215,0.5)',
        pointHoverBackgroundColor: 'rgba(225,6,0,0.1)',
        pointHoverBorderColor: 'rgba(250, 235, 215,1)',
        fill: 'origin',
      },
      {
        data: this.humidityData,
        label: 'Humidity',
        yAxisID: 'y-axis-0',
        backgroundColor: 'rgba(8,39,245,0.1)',
        borderColor: 'rgba(8,39,245,1)',
        pointBackgroundColor: 'rgba(8,39,245,0.0)',
        pointBorderColor: 'rgba(0,174,239,0.5)',
        pointHoverBackgroundColor: 'rgba(8,39,245,0.1)',
        pointHoverBorderColor: 'rgba(0,174,239,1)',
        fill: 'origin',
      }
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
      // Left Y-axis values.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      //-------------------------------------------------------------------------
      // Y-axis settings, not implemented, but kept for remembering the syntax
      //-------------------------------------------------------------------------
      // Right Y-axis values
      // 'y-axis-1': {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red'
      //   }
      // }
    },



    plugins: {

      legend: {
        display: true,
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


    // events
    public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      console.log(event, active);
    }

    public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      console.log(event, active);
    }



      ngOnInit(): void {
        //Adding the first data when the app starts
        this.loadSensorData();
        //Starting the listener to update automatic  everytime new data is added to DB
        this.crudService.startConnection();
        this.crudService.addDataListener();
        this.crudService.onDataUpdate(this.updateData.bind(this));
      }

    // Function to retrieve new data
      loadSensorData() {
        this.handleDataService.loadSensorData();
      }

    //The update function to be used in the listener
      updateData() {
        this.loadSensorData();
      }


    //-----------------------------------------------------------------------------------------
    //Additional functions to be used with the chart. They are not implemented, but is kept for references
    //-----------------------------------------------------------------------------------------
  // private static generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }

  // public randomize(): void {
  //   for (let i = 0; i < this.lineChartData.datasets.length; i++) {
  //     for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
  //       this.lineChartData.datasets[i].data[j] = ShowChartComponent.generateNumber(i);
  //     }
  //   }
  //   this.chart?.update();
  // }



  // public hideOne(): void {
  //   const isHidden = this.chart?.isDatasetHidden(1);
  //   this.chart?.hideDataset(1, !isHidden);
  // }

  // public pushOne(): void {
  //   this.lineChartData.datasets.forEach((x, i) => {
  //     const num = ShowChartComponent.generateNumber(i);
  //     x.data.push(num);
  //   });
  //   this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

  //   this.chart?.update();
  // }

  // public changeColor(): void {
  //   this.lineChartData.datasets[2].borderColor = 'green';
  //   this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

  //   this.chart?.update();
  // }

  // public changeLabel(): void {
  //   if (this.lineChartData.labels) {
  //     this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
  //   }

  //   this.chart?.update();
  // }








}
