import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CourseStatus} from '../_models/course-status';
import {BASE_URL} from './base';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AddToCourseService {

  constructor(
    private http:HttpClient
  ) { }
  /**
   * AddToCourse service adds a student/TA in a particular course
   * 
   * @param username This represents the username of the student to be added in the course
   * @param id This represents the course id
   * @param status This decides whether the person is a TA or a student in that course
   */
  AddToCourse(username:string,id:number,status:string): Observable<CourseStatus>{
    const URL=BASE_URL+'/api/user/'+id.toString()+'/'+username+'/';
    var data = {};
    data['status']=status
    return this.http.post<CourseStatus>(URL,data,httpOptions);
  }
}
