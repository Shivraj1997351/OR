import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _auth:AuthService,private _router:Router,private cookieService:CookieService) { }
  registerUserData:any = {}
  cookieValue:any;
  alert:boolean=false
  ngOnInit(): void {
  }
  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe(
    result=>{
      localStorage.setItem('useremail',this.registerUserData.email)
      localStorage.setItem('token',result.token)
      this._router.navigate(['/special'])
    },
    next=>this.alert=true)
  }
  closeAlert(){
    this.alert = false
  }
  

}
