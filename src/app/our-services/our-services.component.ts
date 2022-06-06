import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
  connected:any={};
  constructor(private router:Router) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
  }
  orderP(){
    if (!this.connected) {
      Swal.fire({
        title: 'vous devez vous connecter',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3498db',
        confirmButtonText: 'Se connecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login/plumbing'])
        }
      })
    }else{
      if (this.connected.role == 'client') {
        this.router.navigate(['order/plumbing'])

      } else {
        Swal.fire({
          title: 'Espaace reservee aux clients',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([''])
          }
        })
      }

    }
  }
  orderE(){
    if (!this.connected) {
      Swal.fire({
        title: 'vous devez vous connecter',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3498db',
        confirmButtonText: 'Se connecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login/electricity'])
        }
      })
    }else{
      if (this.connected.role == 'client') {
        this.router.navigate(['order/electricity'])

      } else {
        Swal.fire({
          title: 'Espaace reservee aux clients',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([''])
          }
        })
      }

    }

  }
  orderC(){
    if (!this.connected) {
      Swal.fire({
        title: 'vous devez vous connecter',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3498db',
        confirmButtonText: 'Se connecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login/cooling'])
        }
      })
    }else{
      if (this.connected.role == 'client') {
        this.router.navigate(['order/cooling'])

      } else {
        Swal.fire({
          title: 'Espaace reservee aux clients',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([''])
          }
        })
      }

    }

  }
  orderH(){
    if (!this.connected) {
      Swal.fire({
        title: 'vous devez vous connecter',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3498db',
        confirmButtonText: 'Se connecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login/heating'])
        }
      })
    }else{
      if (this.connected.role == 'client') {
        this.router.navigate(['order/heating'])

      } else {
        Swal.fire({
          title: 'Espaace reservee aux clients',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3498db',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([''])
          }
        })
      }

    }

  }

}
