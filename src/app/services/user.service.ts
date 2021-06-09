import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import {UserMy} from '../_models/user-my';
import {UserMyList} from '../_models/list_of_student';
import {BASE_URL} from  './base';
import { ConstantPool } from '@angular/compiler';
const REGISTER_URL = BASE_URL+'/api/user/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient)
  {
  }
  /**
   * Makes a POST request to register a User Object in the dashboard
   * @param user User object to be registered
   */
  register(user: User): Observable<UserMy>
  {
    return this.http.post<UserMy>(REGISTER_URL, user, httpOptions);
  }
  /**
   * This fetches the list of Users registered for the course by making a GET request
   * 
   * @param id Course Id
   * 
   * @return Array of User Objects present in the course
   */
  get_students(id:number):Observable<UserMyList>
  { 
    var url=BASE_URL+'/api/usercourse/'+id.toString()+'/';
    return this.http.get<UserMyList>(url,httpOptions);
  }
  /**
   * This service removes a user from the course by making a POST request
   * 
   * Note:U cant remove the professor via this service
   * 
   * @param id Course Id
   * @param username Username of a User
   */
  delete_students(id:number,username:string)
  {
    var url=BASE_URL+'/api/usercourse/'+id.toString()+'/';
    var data={};
    data['username']=username;
    
    return this.http.post(url,data,httpOptions);
  }
}
