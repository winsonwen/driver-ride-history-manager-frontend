import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { basicDataModel, managerToken } from 'src/environments/environment';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  constructor(private storage: StorageService) { }

  username: any

  ngOnInit(): void {
    if(this.storage.get(basicDataModel)){
    this.username = this.storage.get(basicDataModel).username;
    }
  }

  logout(){
    this.storage.remove(managerToken)
    this.storage.remove(basicDataModel)

    window.location.href = '/login'
  }

}
