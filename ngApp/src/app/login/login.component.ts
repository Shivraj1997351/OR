import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData:any = {};
  constructor(private _auth:AuthService,private _router:Router) { }
  alert:boolean=false
  ngOnInit(): void {
  }
  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
    result=>{
      localStorage.setItem('useremail',this.loginUserData.email)
        localStorage.setItem('token',result.token)
        this._router.navigate(['/special'])
    },
    next=>this.alert=true)
  }
  closeAlert(){
    this.alert = false
  }

}
