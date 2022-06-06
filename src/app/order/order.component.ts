import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  path:any;
  addOrderForm:FormGroup;
  connected:any={};
  order:any={};
  pop:any;
  constructor(private aR : ActivatedRoute,private fb:FormBuilder,private orderService:OrderService,private router:Router) { }

  ngOnInit() {
    this.path = this.aR.snapshot.paramMap.get('spec');
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
    this.addOrderForm = this.fb.group({
    idClient : [''],
    idTech : [''],
    cathegory : ['',[Validators.required]],
    date : ['',[Validators.required]],
    status : [''],
    description : [''],
    adress : ['',[Validators.required]],
    service : [''],
    price : [''],
    zone:['',[Validators.required]]
   
    })
   this.order.service = this.path ;
   this.order.zone = this.connected.zone;
  }
  addOrder(form){
    console.log(this.order.cathegory);
    
    switch (this.order.cathegory) {
      case '4':case'8':case'53':case'79':case'1':case'7':case'93':case'103':case'104':case'102':case'23':
        this.order.price = '30'
        break;
        case '':case 'other':case'5':case'40':case'80':case'82':case'92':case'96':case'12':case'37':case'42':case'25':case'26':case'27':case'29':case'111':case'52':case'70':case'74':case'21':
        this.order.price = 'Devis sur place'
        break;
        case'86':
        this.order.price = '120'
        break ; 
        case '88':case '108':case '11':case '16':case '18':case '9':case '61':case '50':case '105':
          this.order.price = '60'
          break;
        case '89':case '47':case '63':
          this.order.price = '110'
          break;
        case '90':case '107':case '73' : 
        this.order.price = '150'
        break;
        case '94':case '95':case '99':case '100':case '15':case '91':case '97':case '101':case '3':case '30':case '49':case '58' :
          this.order.price = '45'
          break;
        case '98':case '38':case '43':case '48':case '14':case '20':case '81':case '84':case '85' : 
        this.order.price='50'
        break;
        case '41':case '109':case '68':case '77':case '19':case '106':case '46' : 
        this.order.price='70'
        break;
        case '110':case '51':case '71':case '54' :
          this.order.price = '100'
          break;
        case '45':case '62':case '67' :
          this.order.price = '10'
          break;
        case '55':
          this.order.price = '190'
          break;
        case '56':
          this.order.price='260'
          break;
        case '57':
          this.order.price='240'
          break;
        case '59':
          this.order.price='75'
          break;
        case '60':case '66':case '76':case '78':case '87':case '44':case '69' :
          this.order.price='80'
          break;
        case '64':
          this.order.price='170'
          break;
        case '65':
          this.order.price='210'
          break;
        case '72':case '13':case '17' : 
        this.order.price='130'  
      default:
        break;
    }
    console.log(this.order.price);
    
    console.log(form);
    console.log(this.order.adress);
    
    
    this.order.idClient = this.connected._id ; 
    this.order.status = 'pending';
    this.order.adress = form.adress ;
    this.order.zone = form.zone ;
    this.order.rating = 'unrated' ;
    this.order.feedBack = '';
    if (this.order.price == 'Devis sur place' ) {
      this.pop = `<h5 style='color:red'>${this.order.price}</h5>`
    }else{
      this.pop = `<h5 style='color:red' >${this.order.price}DT </h5><p style='color:#3498db'>Ce prix est approximatif et peut varier selon le travail effectué</p>`
    }
    
    Swal.fire({
      title: 'Confirmation',
      html:this.pop,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3498db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'confirmer'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Tout est bon ',
          text: "On vous contactera dans quelques minutes",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          confirmButtonText: 'OK'
        }).then((res)=>{
          if (res.isConfirmed){
            this.router.navigate(['']);
          }
        })
        this.orderService.addOrder(this.order).subscribe(
          (data)=>{
            console.log(data.message);
            
          }
        )

      }
    })



  }

}
