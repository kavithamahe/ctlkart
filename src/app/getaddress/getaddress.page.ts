import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-getaddress',
  templateUrl: './getaddress.page.html',
  styleUrls: ['./getaddress.page.scss'],
})
export class GetaddressPage implements OnInit {
  cartcount: any;
  cartDetails: any;
  getaddresslist:any=[];
  user_id: string;
  constructor(public location:Location,public productservice:ProductsService,private router: Router,public alertController: AlertController) {
    this.user_id = localStorage.getItem("user_id");
    this.getAddress(this.user_id);
   }

  ngOnInit() {
    this.user_id = localStorage.getItem("user_id");
    this.getAddress(this.user_id);
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
  }
  ionViewWillEnter(){
    this.user_id = localStorage.getItem("user_id");
    this.getAddress(this.user_id);
  }
  back(){
    // this.location.back();
    this.router.navigate(['tabs/profile']);
  }
  getAddress(user_id){
    this.productservice.presentLoading();
    this.productservice.getaddress(user_id)
    .subscribe(profile =>{ 
      this.getaddresslist = profile.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  removeaddress(id){
    this.productservice.presentLoading();
    this.productservice.removeaddress(id)
    .subscribe(profile =>{ 
      this.productservice.loadingdismiss();
      this.productservice.presentToast(profile.message);
      this.getAddress(this.user_id);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure want to remove this address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeaddress(id);
          }
        }
      ]
    });

    await alert.present();
  }
  editaddress(id){
    this.router.navigate(['editprofile',{"type":"address","id":id}]);
  }
  addaddress(){
    this.router.navigate(['addaddress',{"type":"address"}]);
  }
}
