import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connected : any={} ; 
  test : any;
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser') || '0');
    if (this.connected == '0') {
      this.test = false ; 
    } else {
      this.test = true ; 
    }
  }
  apply(){
    this.router.navigate(['apply'])
  }
  login(){
    this.router.navigate(['login'])
  }
  on(){
    this.connected.availability = 'unavailable';
    localStorage.setItem('connectedUser',JSON.stringify(this.connected));
    this.userService.approve(this.connected).subscribe(
      (data)=>{
        console.log('turned off');
        
      }
    )
  }
  off(){
    this.connected.availability = 'free';
    localStorage.setItem('connectedUser',JSON.stringify(this.connected));
    this.userService.approve(this.connected).subscribe(
      (data)=>{
        console.log('turned on');
        
      }
    )
  }
  logout(){
    localStorage.removeItem('connectedUser');
    this.router.navigate(['']);
  }
  edit(){
    this.router.navigate(['editLogs']);
  }
}
 