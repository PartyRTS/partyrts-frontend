import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePage} from './pages/home/home.page';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule
  ]
})
export class AdminModule {
}
