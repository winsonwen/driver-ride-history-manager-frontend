import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './component/registration/registration.component';
import { DriverRideHistoryComponent } from './component/driver-ride-history/driver-ride-history.component';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './component/login/login.component';
import { MainNavigationComponent } from './component/main-navigation/main-navigation.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzListModule } from 'ng-zorro-antd/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    MainNavigationComponent,
    RegistrationComponent,
    LoginComponent,
    RegistrationComponent,
    DriverRideHistoryComponent,
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    NzTableModule,
    FormsModule,
    NzUploadModule,
    NzButtonModule,
    NzSpaceModule,
    NzFormModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzMessageModule,
    NzSelectModule,
    NzInputNumberModule,
    PdfViewerModule,
    NzCollapseModule,
    NzTimePickerModule,
    NzTypographyModule,
    NzInputModule,
    NzDescriptionsModule,
    NzListModule,
    ScrollingModule,
    NzSkeletonModule
  ],
  providers: [],
})
export class DefaultModule { }
