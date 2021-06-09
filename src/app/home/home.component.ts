import { Component, OnInit } from '@angular/core';
import {UserwhoService} from '../services/userwho.service';
import {AuthenticationService} from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Contains the set of courses the user is associated with
   */
  courses;
  /**
   * Stores if the user is a professor or not
   * 
   * The main constraint is that a professor cannot be a student in another course
   */
  is_professor;
  constructor(
    private who: UserwhoService,
    private router: Router,
    private authenticationService : AuthenticationService,
  ) { }
  /**
   * Calls who service to get the set of courses of a person
   * 
   * Also it updates the is_professor variable 
   */
  ngOnInit(): void {
    this.who.WHO().subscribe(data => {console.log(data);
                                      this.courses = data;
                                    });
    if(localStorage.getItem('is_professor')=='true'){
      this.is_professor=true;
    }
    else{
      this.is_professor=false;
    }
  }
  /**
   * This allows the professor to add a new course
   * 
   * This function leads to a different component add course
   */
  AddCourse(){
   
    this.router.navigate(['addcourse']);
  }

}
