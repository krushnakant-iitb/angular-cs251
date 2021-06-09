import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
/**
 * This expression is a regular expression representing student code
 * So students only with this matching will be allowed,else wont be
 */
const student_expression=/[1-2]\d[A-Z0-9]\d{6}/;
/**
 * This is the authentication code regular expression for professors
 */
const professor_expression=/P[A-Z]{2,3}\d{3}/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
    /**
     * Registration form to input the fields
     */
    registerForm: FormGroup;
    /**
     * variable to account for loading time and for frontend
     */
    loading = false;
    /**
     * variable to account if submitted or not
     */
    submitted = false;
    /**
     * to check if the authentication code matches with the form needed
     */
    auth_code_status=false;
    auth_code_form:FormGroup;
    

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        
    ) { 
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['',Validators.required,],
            
            is_professor:[false,Validators.required],
        });
        this.auth_code_form=this.formBuilder.group({
            auth_code: ['',Validators.required],
        })
    }

    // convenience getter for easy access to form fields
    /**
     * to return controls for fields for registration form
     */
    get f() { return this.registerForm.controls; }

    /**
     * to return controls for auth form 
     */
    get f1() {return this.auth_code_form.controls;}

    /**
     * This function performs the logic when the user submits 
     * 
     * First checks if the field values are invalid if yes stops
     * 
     * Then it checks for the authentication code status
     * 
     * It verifies with the regular expression and if matches proceeds by calling the register service
     * 
     * If everything is successful it takes back to login page else window alert message    */
    onSubmit() {
        this.submitted = true;
      
        
        if (this.registerForm.invalid || this.auth_code_form.invalid) {
            return;
        }

        this.loading = true;
        var s=this.f1.auth_code.value;
        
        if (s!=null && s!="undefined")
        {
            if(student_expression.test(s)==true)
            {
                this.auth_code_status=true;
                
            }
            else if(professor_expression.test(s)==true)
            {
                this.auth_code_status=true;
                this.registerForm.patchValue({is_professor:true});
            }
            else
            {
                this.auth_code_status=false;
            }
        }
        else
        {
            this.auth_code_status=false;
        }
        if(!this.auth_code_status)
        {
            window.alert("incorrect authentication code on first place");
            this.loading=false;
            window.alert("registration unsuccessful");
            return;
        }
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {window.alert("registered successfully");
                         this.router.navigate(['/login']);
                },
                error => {
                    window.alert("registration unsuccessful");
                    this.loading = false;
                });

    }
}
