import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { environment } from '../../environments/environment';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {
  cartcount: any;
  cartDetails: any;
  public imageUrl = environment.imageUrl;
  user_id: string;
  getallmyorderlists:any=[];
  getmyorders:string;
  getallmyprocessinglists:any=[];
  getallmydeliveredlists:any=[];
  getallmycancelledlists:any=[];
  term = { searchText: ''};
  public toggled: boolean = false;
  constructor(public location:Location,public productservice:ProductsService,public events: Events,private router: Router) { 
    this.getmyorders="processing";
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.user_id = localStorage.getItem("user_id");
    this.getallmyorders(this.user_id);
    this.getprocessingorders(this.user_id);
    this.getdeliveredorders(this.user_id);
    this.getcancelledorders(this.user_id);
  }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.user_id = localStorage.getItem("user_id");
    this.getallmyorders(this.user_id);
    this.getprocessingorders(this.user_id);
    this.getdeliveredorders(this.user_id);
    this.getcancelledorders(this.user_id);
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 cancelSearch(event){
   this.toggle();
   this.getallmyorders(this.user_id);
   this.term.searchText = "";
 }
 getItems(searchItem) {
  //  console.log(this.getmyorders)
   if(this.getmyorders == "processing"){
    this.productservice.getmyorderlistsearch(this.user_id,this.term.searchText)
    .subscribe(product =>{ 
      this.getallmyprocessinglists = product.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
   }
   else if(this.getmyorders == "delivered"){
    this.productservice.getmyorderlistsearchdelivered(this.user_id,this.term.searchText)
    .subscribe(product =>{ 
      this.getallmydeliveredlists = product.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
   }
   else{
    this.productservice.getmyorderlistsearchcancel(this.user_id,this.term.searchText)
    .subscribe(product =>{ 
      this.getallmycancelledlists = product.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
   }

}
  getallmyorders(user_id){
    this.productservice.presentLoading();
    this.productservice.getallorders(user_id)
    .subscribe(product =>{ 
      this.getallmyorderlists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getprocessingorders(user_id){
    this.productservice.presentLoading();
    this.productservice.getmyprocessingorders(user_id)
    .subscribe(product =>{ 
      this.getallmyprocessinglists =  product.data;
      
      for(var i=0;i<=this.getallmyprocessinglists.length;i++){
        if(this.getallmyprocessinglists[i]){
        this.getallmyprocessinglists[i].itemslength = this.getallmyprocessinglists[i].items.length;
        if(this.getallmyprocessinglists[i].items){
          var itemsamount = this.getallmyprocessinglists[i].items;
          for (var j=0;j<=this.getallmyprocessinglists[i].items.length;j++){
            if(this.getallmyprocessinglists[i].items[j] != undefined){
              // console.log(this.getallmyprocessinglists[i].items[j].quantity);
            this.getallmyprocessinglists[i].totalamounts = (this.getallmyprocessinglists[i].items[j].quantity * this.getallmyprocessinglists[i].items[j].amount);
            // console.log(this.getallmyprocessinglists[i].totalamounts);
          }
        }
        }
      

        }
    }
    this.getallmyprocessinglists =  this.getallmyprocessinglists;
    // console.log(this.getallmyprocessinglists);
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getdeliveredorders(user_id){
    this.productservice.presentLoading();
    this.productservice.getmydeliveredorders(user_id)
    .subscribe(product =>{ 
      this.getallmydeliveredlists = product.data;
       for(var i=0;i<=this.getallmydeliveredlists.length;i++){
        if(this.getallmydeliveredlists[i]){
        this.getallmydeliveredlists[i].itemslength = this.getallmydeliveredlists[i].items.length;
        if(this.getallmydeliveredlists[i].items){
          var itemsamount = this.getallmydeliveredlists[i].items;
          for (var j=0;j<=itemsamount.length;j++){
            if(itemsamount[j]){
            this.getallmydeliveredlists[i].totalamounts = (this.getallmydeliveredlists[i].items[j].quantity * this.getallmydeliveredlists[i].items[j].amount);
          }
        }
        }
        }
    }
    this.getallmydeliveredlists =  this.getallmydeliveredlists;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getcancelledorders(user_id){
    this.productservice.presentLoading();
    this.productservice.getmycancelledorders(user_id)
    .subscribe(product =>{ 
      this.getallmycancelledlists =  product.data;
      for(var i=0;i<=this.getallmycancelledlists.length;i++){
        if(this.getallmycancelledlists[i]){
        this.getallmycancelledlists[i].itemslength = this.getallmycancelledlists[i].items.length;
        if(this.getallmycancelledlists[i].items){
          var itemsamount = this.getallmycancelledlists[i].items;
          for (var j=0;j<=itemsamount.length;j++){
            if(itemsamount[j]){
            this.getallmycancelledlists[i].totalamounts = (this.getallmycancelledlists[i].items[j].quantity * this.getallmycancelledlists[i].items[j].amount);
          }
        }
        }
        }
    }
    this.getallmycancelledlists =  this.getallmycancelledlists;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }

  viewsingleorder(id,status){
    // console.log(status)
    this.router.navigate(['/vieworderhistory',{"orderid":id,"status":status}]);
  }
  viewcart(){
    this.router.navigate(['tabs/viewcartproduct']);
  }
  back(){
    this.router.navigate(['']);
  }
}
