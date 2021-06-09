import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {BASE_URL} from './base';
const USER_URL = BASE_URL+'/api/user/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserwhoService {

  constructor(
    private http: HttpClient,
  ) { }
  /**
   * @return list of courses courresponding to user
   */
  WHO(){
    const USE_URL = BASE_URL+'/api/courses/';
    return this.http.get(USE_URL, httpOptions);
  }
  /**
   * 
   * @param id id of course
   * @return return status of user in course with id as param
   */
  STATUS(id:number){
    const USE_URL=BASE_URL+'/api/user/'+id.toString()+'/abc/';
    return this.http.get(USE_URL,httpOptions);
  }
  /**
   * @return gives UserMy object to find professor status
   */
  IDENTITY(){
    const USE_URL = BASE_URL + '/api/usermy/';
    return this.http.get(USE_URL,httpOptions);
  }
}
