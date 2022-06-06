import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
clients:any;
techs:any;
pendingTechs:any;
orders:any;

  constructor(private userService:UserService ,private orderService:OrderService) { }

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
    this.orderService.getPending().subscribe(
      (data)=>{
        this.orders = data.orders ; 
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
deleteOrder(id){
  this.orderService.deleteOrder(id).subscribe(
    (data)=>{
      console.log(data.message);
      this.orderService.getPending().subscribe(
        (data)=>{
          this.orders = data.orders
        }
      )
      
    }
  )
} 
displayClient(clt){
Swal.fire({
  html:`Nom : ${clt.name} <br> Email : ${clt.email} <br> Tel : ${clt.tel} <br> Gouvernorat : ${clt.zone}`
})
}
displayTech(tech){
  Swal.fire({
    html:`Nom : ${tech.name} <br> Email : ${tech.email} <br> Tel : ${tech.tel} <br> Gouvernorat : ${tech.zone} <br> Spécialité : ${tech.speciality} <br> Experience : ${tech.experience} <br> CV : <br><img src='${tech.img}' style='height : 200px;width:300px;'>`,
    confirmButtonColor:'#3498db'
  })
}
displaOrder(order){
  Swal.fire({
    html:`Satisfaction : ${order.rating} <br> Avis Client : ${order.feedBack}`,
    confirmButtonColor:'#3498db'
  })
}


}
