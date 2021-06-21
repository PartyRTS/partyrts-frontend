import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePage} from './pages/home/home.page';
import {MatButtonModule} from '@angular/material/button';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    NgxChartsModule,
  ]
})
export class AdminModule {
}
