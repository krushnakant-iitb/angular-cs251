import { NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  /**
   * this variable checks the status whether the user is logged in or not
   */
  logged_in:boolean;
  interval=setInterval(()=>{this.check_logIN();},500);
  constructor()
  { 
  }

  ngOnInit(): void {
    this.check_logIN();
  }
  /**
   * This function regularly checks at interval of 0.5sec and clears the local storage if the user had logged out 
   */
  check_logIN(){
    if((localStorage.getItem('token')==null)||(localStorage.getItem('token')=='undefined')){
      this.logged_in=false;
    }
    else{
      this.logged_in=true;
    }
  }

}
