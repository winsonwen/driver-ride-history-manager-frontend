import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterfacesModule { }

export declare interface DriverRideHistory {
  driverName: string,
  rideDate: Date,
  departingMiles: number,
  returningMiles: number,
  rideReason: string
}