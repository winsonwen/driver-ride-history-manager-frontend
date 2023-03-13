import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, ValidationErrors, UntypedFormBuilder, Validators } from "@angular/forms";
import { DriverRideHistory } from "src/app/module/interfaces/interfaces.module";
import { HttpService } from "src/app/service/http.service";
import { StorageService } from "src/app/service/storage.service";
import { basicDataModel } from "src/environments/environment";
import { NzMessageService } from 'ng-zorro-antd/message';




@Component({
  selector: 'app-driver-ride-history',
  templateUrl: './driver-ride-history.component.html',
  styleUrls: ['./driver-ride-history.component.css']
})
export class DriverRideHistoryComponent implements OnInit {
  driverRideHistories: DriverRideHistory[] = [];
  userData = this.storage.get(basicDataModel)

  listOfColumn = [
    {
      title: 'Driver Name',
      compare: (a: DriverRideHistory, b: DriverRideHistory) => a.driverName.localeCompare(b.driverName),
      priority: false
    },
    {
      title: 'Departing Date',
      compare: (a: DriverRideHistory, b: DriverRideHistory) =>  Date.parse(b.departingDate.replace(/\-/g,'/')) - Date.parse(a.departingDate.replace(/\-/g,'/')) ,
      priority: false
    },
    {
      title: 'Returning Date',
      compare: (a: DriverRideHistory, b: DriverRideHistory) => Date.parse(b.returningDate.replace(/\-/g,'/')) - Date.parse(a.returningDate.replace(/\-/g,'/')) ,
      priority: false
    },
    {
      title: 'Departing Miles',
      compare: (a: DriverRideHistory, b: DriverRideHistory) => a.departingMiles - b.departingMiles,
      priority: false
    },
    {
      title: 'Returning Miles',
      compare: (a: DriverRideHistory, b: DriverRideHistory) => a.returningMiles - b.returningMiles,
      priority: false
    },

  ];

  ngOnInit(): void {
    this.http.get(`/api/driver_ride_history/${this.userData.userId}/all`).then((res: any) => {
      this.driverRideHistories = res.data
      this.sortDriverRideHistories(this.driverRideHistories)
    }).catch(error => {
      this.message.create('error', `${error.response.data}`);
    })
  }

  validateForm: UntypedFormGroup;

  sortDriverRideHistories(driverRideHistories: any): void {
    this.driverRideHistories = driverRideHistories.sort((a:any, b:any) => { return Date.parse(b.departingDate.replace(/\-/g,'/')) - Date.parse(a.departingDate.replace(/\-/g,'/')) })
  }

  submitForm(e: MouseEvent): void {
    this.validateForm.value['departingDate'] = this.timestampToTime(this.validateForm.value['rideDate'][0])
    this.validateForm.value['returningDate'] = this.timestampToTime(this.validateForm.value['rideDate'][1])
    this.http.post(`/api/driver_ride_history/${this.userData.userId}/create`, this.validateForm.value).then(res => {

      this.driverRideHistories.push(this.validateForm.value);

      this.sortDriverRideHistories(this.driverRideHistories)
      this.driverRideHistories = this.driverRideHistories.filter(o=>true)
      this.resetForm(e)
    }).catch(error => {
      this.message.create('error', `${error.response.data}`);
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }
  

  deleteHistory(driverInfo: any, index: number): void {
    this.http.post(`/api/driver_ride_history/${this.userData.userId}/delete`, driverInfo).then(res => {
      this.driverRideHistories = this.driverRideHistories.filter((s,i)=>i!=index)
    }).catch(error => {
      this.message.create('error', `${error.response.data}`);
    })
  }

  cancel(): void {
  }



  confirm( driverInfo: any, index: number): void {
    this.deleteHistory(driverInfo,index)
  }

  confirmDepartingMilesValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if ( (this.validateForm.controls['returningMiles'].value!=''&& this.validateForm.controls['returningMiles'].value!=null) &&  (this.validateForm.controls['returningMiles'].value < control.value || control.value < 0)) {
      return { confirm: true, error: true };
    }
    return {};
  };

  confirmReturningMilesValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value < this.validateForm.controls['departingMiles'].value || control.value < 0) {
      return { confirm: true, error: true };
    }
    return {};
  };



   timestampToTime(timestamp:Date):string {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let y = date.getFullYear();
    let MM:any = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d:any = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + MM + '-' + d;
}

  constructor(private fb: UntypedFormBuilder, private http: HttpService, private storage: StorageService, private message: NzMessageService) {
    this.validateForm = this.fb.group({
      driverName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{1,30}$")]],
      rideDate: [[],  [Validators.required]],
      departingMiles: ['', [Validators.required, this.confirmDepartingMilesValidator]],
      returningMiles: ['', [Validators.required, this.confirmReturningMilesValidator]],
      rideReason: ['', [Validators.required]]
    });
  }

}