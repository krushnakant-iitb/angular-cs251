import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserwhoService}  from '../services/userwho.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AddToCourseService} from '../services/add-to-course.service';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  /**
   * this stores course id
   */
  course_id;
  course_status;
  course_name;
  /**
   * to store if add person option is chosen
   */
  submitted_add=false;
  /**
   * to store if send message is chosen
   */
  submitted_m=false;
  username:FormControl;
  message:FormGroup;
  /**
   * add student loading to check if the process is loading
   */
  a_s_l=false;
  /**
   * add TA loading to check if the process is loading
   */
  a_t_l=false;
  /**
   * message TA loading to check if the process is loading.Note only profs can send message to TA and student can't see them
   */
  m_t_l=false;
  /**
   * message student loading to check if the process is loading
   */
  m_s_l=false;
  /**
   * to store the set of messages sent in the course to render in the html
   */
  messages
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private who:UserwhoService,
    private addtocourse:AddToCourseService,
    private messageService:MessageService,
    private router:Router,
  ) { }
  /**
   * First course_id variable is extracted from the path using activatedRoute
   * 
   * Then who service is called which updates the course_status variable
   * 
   * Then messageService is called which makes a get request to fetch all the messages sent in the course
   */
  ngOnInit(): void {
    this.course_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.course_name=this.activatedRoute.snapshot.paramMap.get('name');
    this.who.STATUS(this.course_id)
    .pipe(first())
    .subscribe(data=>{
      
      this.course_status=data['status'];
      
    });
    this.username=new FormControl('',Validators.required);
    this.message=this.formBuilder.group({
      message_text: ['', Validators.required],
      message_priority: [false, Validators.required]
  });
    this.messageService.GET_MESSAGES(this.course_id).subscribe(data1=>this.messages=data1);
  }
  /**
   * to provide form controls to the html part
   */
  get f()
  {
    return this.message.controls;
  }
  /**
   * This function adds a student which can be done by TA/Prof
   * 
   * If username is invalid it stops
   * 
   * Else it calls the addToCourse to add the student
   * 
   * If the process is successful it window alerts the process is successful else it alerts process failed
   */
  AddStudent(){
    this.submitted_add=true;
    if(this.username.invalid){
      window.alert("Invalid Username");
      return ;
    }
    this.a_s_l=true;
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'student').pipe(first())
    .subscribe(
      data=>{window.alert("Student is added successfully");location.reload();},
      error=>{window.alert("Adding student is unsuccessful");}
    )
    this.a_s_l=false;
    this.submitted_add=false;
  }
  /**
   * This function adds a student which can be done only by the professor
   * 
   * Rest is similar to AddStudent()
   */
  AddTA(){
    this.submitted_add=true;
    if(this.username.invalid){
      return ;
    }
    this.a_t_l=true;
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'TA').pipe(first())
    .subscribe(
      data=>{window.alert("TA is added successfully");location.reload();},
      error=>{window.alert("adding TA unsuccessful");}
      
    )
    this.a_t_l=false;
    this.submitted_add=false;
  }
  /**
   * This function is used to send message to TA which is allowed only for the professor
   * 
   * If the message is invalid it stops
   * 
   * Else it calls the send message service with last argument as TA to send the message
   * 
   * If the message is sent the page is reloaded and the message sent will be seen
   */
  SendTA(){
    this.submitted_m=true;
    if(this.message.invalid){
      return ;
    }
    this.m_t_l=true;
    this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'TA').pipe(first())
    .subscribe(
      data=>{
        location.reload();
      }
    );
    this.m_t_l=false;
    this.submitted_m=false;
  }
  /**
   * This function is used to send message to students which is allowed for both the  professor and TA's
   * 
   * Rest is similar as SendTA()
   */
  SendStudent(){
    this.submitted_m=true;
    if(this.message.invalid){
      return ;
    }
    this.m_s_l=true;
    this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'student').pipe(first())
    .subscribe(
      data=>{
        location.reload();
      }
    )
    this.m_s_l=false;
    this.submitted_m=false;
  }
}
