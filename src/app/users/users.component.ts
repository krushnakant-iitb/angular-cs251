import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  /**
   * Represents the list of users registered in the course including the professor
   * 
   */
list_of_students:any;

course_id:any;

is_professor:boolean;
  constructor(private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private userservice:UserService,
    ) { 
    
  }
/**
 * First the course id is extracted using activatedRoute from the path
 * 
 * Then userService is called to get the list_of_students 
 * 
 * Note here the professor cannot remove himself from the course via the UI
 * 
 * This function also sets the is_professor variable by looking into the local storage to give permission to remove students/TA's
 * 
 */
  ngOnInit(): void {
    this.course_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.userservice.get_students(this.course_id).subscribe((data)=>{this.list_of_students=data;});
    
    if(localStorage.getItem('is_professor')=='true'){
      this.is_professor=true;
    }
    else{
      this.is_professor=false;
    }

  }
/**
 * 
 * @param username This represents the username of the person to be removed
 * This function calls the userservice to delete the student of a particular username 
 */
  delete_student(username:string)
  {
    this.userservice.delete_students(this.course_id,username).subscribe(data=>{location.reload()});
    
  }


}
