import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListDataComponent } from './listData/listData.component';
import { ShowGraphComponent } from './showGraph/showGraph.component';

@NgModule({
  declarations: [		
    AppComponent,
      ListDataComponent,
      ShowGraphComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
