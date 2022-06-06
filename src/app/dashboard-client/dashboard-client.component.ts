import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  orders:any;
  techs:any;
  connected:any={};
  feedBack:any;
  constructor(private orderService:OrderService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser'))
    this.orderService.getPending().subscribe(
      (data)=>{
        this.orders = data.orders ,console.log(data.orders);
        
      }
    )
      this.userService.getTechs().subscribe(
        (data)=>{
          this.techs = data.techs,console.log(data.techs);
          
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
 
  
  rate(idOrder,idTech,feed){
    let rating:any;

  
  if (feed == 'like') {
    rating = 'like';
    this.userService.like(idTech).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    Swal.fire({
      title: 'On vous remercie',
      text: "vous pouvez nous ecrire un commentaire !",
      icon: 'success',
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      showCancelButton: true,
      confirmButtonColor: '#3489db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedBack = result.value; 
        this.orderService.rateOrder(idOrder,rating,this.feedBack).subscribe(
          (data)=>{
            console.log(data.message);
            
          }
        )     
      }
    })
    
    
  } else {
    rating = 'dislike';
    this.userService.dislike(idTech).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    Swal.fire({
      title: "Nous sommes desolés d'apprendre ceci",
      text: "vous pouvez nous ecrire un commentaire !",
      icon: 'error',
      input: 'textarea',
      inputPlaceholder: 'Votre reclamation...',
      showCancelButton: true,
      confirmButtonColor: '#3489db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedBack = result.value; 
        this.orderService.rateOrder(idOrder,rating,this.feedBack).subscribe(
          (data)=>{
            console.log(data.message);
            
          }
        )     
      }
    })
  }  
  

   

  }

}
