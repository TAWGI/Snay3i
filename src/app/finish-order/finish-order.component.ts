import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent implements OnInit {
  id:any;
  order:any;
  editForm:FormGroup;
  connected:any={};
  constructor(private aR:ActivatedRoute,private fB:FormBuilder,private orderService:OrderService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
    this.editForm = this.fB.group({
      price:['']
    })
    this.id = this.aR.snapshot.paramMap.get('id');
    console.log(this.id);
    this.orderService.getOrder(this.id).subscribe(
      (data)=>{
        console.log(data.order);
        this.order = data.order
        
      }
    )
  }
  finishOrder(form){
    this.order.price = form.price
    this.order.status = 'finished';
    this.orderService.approve(this.order).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
      this.connected.availability = 'free';
      localStorage.setItem('connectedUser',JSON.stringify(this.connected));
      this.userService.approve(this.connected).subscribe(
        (data)=>{
          console.log('free');
          
        }
      )
      Swal.fire({
        icon: 'warning',
        title: 'vous etes de nouveau disponible',
        text: "si vous etes interessé vous pouvez accepter d'autres commandes!",
        confirmButtonColor:'#3498db'
        
      })

      this.router.navigate(['dashboardTech']);
    
  }

}
