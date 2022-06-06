import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../confirmPwd';


@Component({
  selector: 'app-edit-logs',
  templateUrl: './edit-logs.component.html',
  styleUrls: ['./edit-logs.component.css']
})
export class EditLogsComponent implements OnInit {
  editLogsForm:FormGroup;
  retrieve:FormGroup;
  user:any={};
  connected:any={};
  path:any;
  constructor(private fB:FormBuilder,private userService:UserService,private router:Router, private aR:ActivatedRoute) { }

  ngOnInit() {
    this.editLogsForm=this.fB.group({
      email:[''],
      password:[''],
      tel:[''],
      zone:[''],
      _id:['']
    })
    this.retrieve = this.fB.group({
      newPwd:['',[Validators.minLength(8),Validators.required]],
      confirmPwd:['']
    },{
      
      validator : MustMatch("newPwd","confirmPwd")
    
  })
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.connected) {
      this.user.email = this.connected.email;
      this.user.tel = this.connected.tel;
      this.user.zone = this.connected.zone;
      this.user._id = this.connected._id;
    }
 
    this.path = this.aR.snapshot.paramMap.get('email');
    
  }
  edit(){
 

    
    this.userService.editLogs(this.user).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    let timerInterval

    Swal.fire({
      icon:'success',
      title: 'Informations changee crée avec success!',
      
      timer: 2000,
      didOpen: () => {
        const content = Swal.getHtmlContainer()
        const $ = content.querySelector.bind(content)
    
       
        Swal.showLoading()
        
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
    this.router.navigate(['login']);
  }
  retrieveFN(form){
    this.userService.changePwd(this.path , form.newPwd).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    this.router.navigate(['login']);
    
  }
 
}
