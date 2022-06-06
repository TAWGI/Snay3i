import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-tech',
  templateUrl: './dashboard-tech.component.html',
  styleUrls: ['./dashboard-tech.component.css']
})
export class DashboardTechComponent implements OnInit {
  
  clients:any;
  connected:any;
  declanations:any;
  check:any;
  orders;
  techOrders:any;
  constructor(private orderService : OrderService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
    this.orderService.getPending().subscribe(
      (data)=>{
        this.orders = data.orders,console.log(data.orders);
      
        
        
      }
    )
    this.userService.getClients().subscribe(
      (data)=>{
        this.clients = data.clients , console.log(data.clients);
        
      }
    )
 
    
    
    

  
  }

  approveOrder(order){
    order.status = 'confirmed' ; 
    order.idTech = this.connected._id ;
    this.connected.availability = 'busy' ; 
    this.orderService.approve(order).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    this.userService.approve(this.connected).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    localStorage.setItem('connectedUser',JSON.stringify(this.connected));
    Swal.fire({
      title: 'Tout est bon ',
      text: "Accéder à vos commandes en cours pour plus d'informations !",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3498db',
      confirmButtonText: 'OK'
    })
  }
  decline(order){
    this.connected.declanations += ' ' + order._id ;
    this.userService.approve(this.connected).subscribe(
      (data)=>{
        console.log(data.message);
        localStorage.removeItem('connectedUser');
        localStorage.setItem('connectedUser',JSON.stringify(this.connected));
        
      }
    )
    
  }
  finish(id){
    this.router.navigate([`finishOrder/${id}`])

  }
  


}
