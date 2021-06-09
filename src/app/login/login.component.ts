import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserwhoService} from '../services/userwho.service';
import { User } from '../_models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    /**
     * stores input data
     */
    loginForm: FormGroup;
    /**
     * variable to account for server/website loading
     */
    loading = false;
    /**
     * check if user submitted the data
     */
    submitted = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private idService:UserwhoService,
        )
    {
        // redirect to home if already logged in
        if (localStorage.getItem('token')!=null && localStorage.getItem('token')!="undefined") {
            this.router.navigate(['/']);
        }
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields

    /**
     * function to return form controls
     */
    get f(){
        return this.loginForm.controls;
    }

    /**
     * This function performs the logic
     * 
     * If form is invalid stop
     * 
     * Check for invalid login and if success then call idService
     * 
     * If the login was successful after matching the data then redirect to the course page
     * 
     * Also before moving onto the home page the function also sets the is_professor variable in the local storage which will be used
     * 
     * Else window alert that login was unsuccessful
     */
    onSubmit() {
        this.submitted = true;

       
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    const tok=localStorage.getItem('token');
                    if(tok==null||tok=='undefined'){
                        this.loading=false;
                        window.alert('invalid login');
                        this.router.navigate(['login']);
                    }
                    else{
                        this.idService.IDENTITY().pipe(first())
                        .subscribe(
                            data=>{
                            if(data['is_professor']==true){
                                localStorage.setItem('is_professor','true');
                            }
                            else{
                                localStorage.setItem('is_professor','false');
                            }
                            this.router.navigate([this.returnUrl]);
                        });
                    }
                    
                },
                error => {
                    this.loading = false;
                });
    }

}
