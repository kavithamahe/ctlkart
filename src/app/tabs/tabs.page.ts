import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  cartcount: any;
  token:any;
  cartDetails: any;
  constructor(private router: Router,
    public events: Events) {
    this.token = localStorage.getItem('token');
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    
  this.events.subscribe('loggedin', ()=>{
    this.token = localStorage.getItem('token');
  })
  this.events.subscribe('loggedout', ()=>{
    this.token = localStorage.removeItem('token');
  })
  this.events.subscribe('cart', ()=>{
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
      console.log(this.cartcount)
    }
  })
  }
  ionViewWillEnter(){
    this.token = localStorage.getItem('token');
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    
  this.events.subscribe('loggedin', ()=>{
    this.token = localStorage.getItem('token');
    console.log(this.token)
  })
  this.events.subscribe('loggedout', ()=>{
    this.token = localStorage.removeItem('token');
    this.cartDetails = localStorage.removeItem('cart_items');
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
  })
  this.events.subscribe('cart', ()=>{
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
      console.log(this.cartcount)
    }
  })
  }
}
