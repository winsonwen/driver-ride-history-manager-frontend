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

  ngOnInit(): void {
    this.http.get(`/api/driver_ride_history/${this.userData.userId}/all`).then((res: any) => {
      this.driverRideHistories = res.data
      console.log(this.driverRideHistories)
    }).catch(error => {
      this.message.create('error', `${error.response.data}`);
    })
  }

  validateForm: UntypedFormGroup;

  submitForm(e: MouseEvent): void {
    e.preventDefault();
    let info = (this.validateForm.value)
    this.http.post(`/api/driver_ride_history/${this.userData.userId}/create`, this.validateForm.value).then(res => {
      this.resetForm(e)
      this.driverRideHistories.push(info);
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

  deleteHistory(e: MouseEvent, driverInfo: any, index: number): void {
    e.preventDefault();
    this.http.post(`/api/driver_ride_history/${this.userData.userId}/delete`, driverInfo).then(res => {
      this.driverRideHistories.splice(index, 1)
    }).catch(error => {
      this.message.create('error', `${error.response.data}`);
    })
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value < this.validateForm.controls['departingMiles'].value || control.value < 0 ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: UntypedFormBuilder, private http: HttpService, private storage: StorageService, private message: NzMessageService) {
    this.validateForm = this.fb.group({
      driverName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{1,30}$")]],
      rideDate: [null, [Validators.required]],
      departingMiles: ['', [Validators.required, this.confirmValidator]],
      returningMiles: ['', [Validators.required, this.confirmValidator]],
      rideReason: ['', [Validators.required]]
    });
  }
}