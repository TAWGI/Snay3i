import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard-super-admin',
  templateUrl: './dashboard-super-admin.component.html',
  styleUrls: ['./dashboard-super-admin.component.css']
})
export class DashboardSuperAdminComponent implements OnInit {
  clients:any;
  pendingTechs:any;
  techs:any;
  admins : any ; 
  users:any;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getClients().subscribe(
      (data)=>{
        this.clients = data.clients
      }
    )
    this.userService.getPending().subscribe(
      (data)=>{
        this.pendingTechs = data.techs
      }
    )
    this.userService.getTechs().subscribe(
      (data)=>{
        this.techs = data.techs
      }
    )
    this.userService.getAdmins().subscribe(
      (data)=>{
        this.admins = data.admins
      }
    )




    // --
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(
      (data)=>{
        if (data) {
          console.log(data.message);
          this.userService.getClients().subscribe(
            (data)=>{
              this.clients = data.clients
            }
          );
          this.userService.getAdmins().subscribe(
            (data)=>{
              this.admins = data.admins
            }
          );
          this.userService.getPending().subscribe(
            (data)=>{
              this.pendingTechs = data.techs
            }
          );
          this.userService.getTechs().subscribe(
            (data)=>{
              this.techs = data.techs
            }
          )
          
        }
      }
    )
  }

approve(tech){
  tech.status = 'confirmed' ;
  this.userService.approve(tech).subscribe(
    (data)=>{
      console.log(data.message);
      
    }
  )
}
}
