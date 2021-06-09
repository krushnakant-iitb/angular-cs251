import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  /**
   * contains the particular message id
   */
  message_id:any;
  /**
   * Contains the set of people who read the message
   */
  read_list:any;
  constructor(private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private messageservice:MessageService,) { }
/**
 * First the message id is extracted from the path using activatedRoute
 * 
 * Then message service is called to get the set of users who read the messsage
 */
  ngOnInit(): void {
    this.message_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.messageservice.READ_MESSAGE(this.message_id).subscribe(data=>{this.read_list=data;});
    
  }

}
