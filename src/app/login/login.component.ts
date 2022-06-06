import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any={};
  msg:any;
  loginForm:FormGroup;
  path:any;
  retrieveAcc:any={};

  constructor(private formBuilder : FormBuilder,private router:Router,private userService:UserService,private ar:ActivatedRoute) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })
    this.path = this.ar.snapshot.paramMap.get('spec');
  
    
    
  }
   generate(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
  login(){
   
    this.userService.login(this.user).subscribe(
      (data)=>{
        console.log(data.message);
        switch (data.message) {
          case '0':
            // wrong email
            this.msg = 0 ;
            break;
          case '1':
            // wrong pwd
            this.msg = 1 ;
            break;
            case '2':
              // succes
              this.msg = 2 ;
              localStorage.setItem('connectedUser',JSON.stringify(data.userFound));

              if (this.path) {
                this.router.navigate([`order/${this.path}`]);
              } else {
                switch (data.userFound.role) {
                  case "client":
                    this.router.navigate(['']);
                    
                    break;
                    case "admin":
                      this.router.navigate(['dashboardAdmin']);
                      
                      break;
                      case "tech":
                        this.router.navigate(['dashboardTech']);
                        
                        break;
                  default:
                    break;
                }
              }

              
          default:
            break;
        }
        
      }
    )
    
  }
  gotoSignup(){
    if (this.path) {
      this.router.navigate([`signup/${this.path}`])
    }else{
      this.router.navigate(['signup'])
    }
  }
  async retrieve(){
    const { value: email } = await Swal.fire({
      title: 'email adress',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      confirmButtonColor:'#3498db'
    })
    
    if (email) {
      let code = this.generate(4);
      let msg:any;
      this.userService.sendCode(email , code).subscribe(
        (data)=>{
          msg = data.message ; 
          console.log(msg);
          
          
        }
      )  
      if (msg === '0') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email incorrect !'
        })
      }else{
          await Swal.fire({
          title: 'Confirmation',
          input: 'text',
          inputLabel: 'Consulter votre adress mail',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          inputValidator: (value) => {
            if (value != code) {
              return 'Code a 4 chiffres incorrect !'
            }else{
              this.router.navigate([`editLogs/${email}`]);
            }
          }
        })
        
      
      }

    }
  }

}
