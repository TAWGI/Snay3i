import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  connected:any={};
  constructor(private router : Router) { }

  ngOnInit() {
    this.connected = JSON.parse(localStorage.getItem('connectedUser'));
  }
  signup(){
    this.router.navigate(['signup']);
  }

}
