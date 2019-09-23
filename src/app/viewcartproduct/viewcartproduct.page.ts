import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertController, Events } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewcartproduct',
  templateUrl: './viewcartproduct.page.html',
  styleUrls: ['./viewcartproduct.page.scss'],
})
export class ViewcartproductPage implements OnInit {

  productLists: any;
  cartcount: any;
  cartDetails: any;
  token: any;
  selectedlength: any;
  totalamount: number;
  totalprice: any;
  private imageUrl = environment.imageUrl;
  imgURl: any;
  getcartProductList:any =[];
  quantities: Array<number> = [];
  getProductLists:any;
  data: any;
  item_qty :any=1;
  item_qtycheck :any=1;
  totalQty:any;
  qtycheck:any;

  constructor(private location:Location,public events: Events,public productservice:ProductsService,private route: ActivatedRoute,public router:Router,private alertCtrl: AlertController) { 
    this.getproductList();
  }
  ngOnInit() {
    localStorage.removeItem('category_id');
    localStorage.removeItem('subcategory_id');
    localStorage.removeItem('subcategoryname');
    localStorage.removeItem('singleid');
    localStorage.removeItem('status');
    localStorage.removeItem('fromorder');
    this.events.subscribe('loggedout', ()=>{
      this.token = localStorage.removeItem('token');
      this.cartDetails = localStorage.removeItem('cart_items');
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    // console.log(this.cartDetails)
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
      // console.log(this.cartcount)
    }
    this.events.subscribe('cart', ()=>{
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    // console.log(this.cartDetails)
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
      // console.log(this.cartcount)
    }
  })
    this.token = localStorage.getItem('token');
    this.imgURl = this.imageUrl;
    for (let i = 1; i <= 100; i++) {
      this.quantities.push(i)
    }
    this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.getcartProductList){
    this.selectedlength = this.getcartProductList.length;
    
    let total = 0;
    for (var i = 0; i < this.getcartProductList.length; i++) {
        if (this.getcartProductList[i].totalproductprice) {
            total += this.getcartProductList[i].totalproductprice;
            this.totalamount = total;
        }
    }
    return total;
  }
  }
  ionViewWillEnter(){
    // console.log(this.cartDetails)
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      // console.log(this.cartDetails)
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
        // console.log(this.cartcount)
      }
    })
    this.events.subscribe('cartview', ()=>{
      this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.getcartProductList){
      this.selectedlength = this.getcartProductList.length;
      let total = 0;
      for (var i = 0; i < this.getcartProductList.length; i++) {
          if (this.getcartProductList[i].totalproductprice) {
              total += (this.getcartProductList[i].price * this.getcartProductList[i].quantityperproduct);
              this.totalamount = total;
          }
      }
      return total;
    }
    })
    this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.getcartProductList){
    this.selectedlength = this.getcartProductList.length;
    let total = 0;
    for (var i = 0; i < this.getcartProductList.length; i++) {
        if (this.getcartProductList[i].totalproductprice) {
            total += (this.getcartProductList[i].price * this.getcartProductList[i].quantityperproduct);
            this.totalamount = total;
        }
    }
    return total;
  }
    
    this.token = localStorage.getItem('token');
    this.imgURl = this.imageUrl;
  this.events.subscribe('loggedin',() => {
    this.token = localStorage.getItem('token');
    // console.log(this.token)
  })
    this.getproductList();
 
  }
  incrementQty(quantityperproduct,id,quantity){
    var qnty = +(quantityperproduct);
    var qty = qnty += 1;
    this.productservice.quantityavailcheck(qty,id)
    .subscribe(qtny =>{ 
      this.qtycheck = qtny.message;
      if(this.qtycheck == "true"){
        quantityperproduct = +quantityperproduct;
        quantityperproduct += 1;
        var existingEntries = JSON.parse(localStorage.getItem("cart_items"));
        let isInCart = false;
        if (existingEntries) {
          isInCart = existingEntries.some(item => item.id == id);
         
        } else {
          existingEntries = [];
        }
        if (isInCart) {
            existingEntries.map(item => {
              if (item.id == id) {
                item.quantityperproduct = quantityperproduct;
              }
              return item;
             
            });  
       
    
        } else {
          existingEntries.push(quantityperproduct);
      
        }
        localStorage.setItem('cart_items', JSON.stringify(existingEntries)); 
        this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
        let total = 0;
        for (var i = 0; i < this.getcartProductList.length; i++) {
            if (this.getcartProductList[i].totalproductprice) {
                total += (this.getcartProductList[i].price * this.getcartProductList[i].quantityperproduct);
                this.totalamount = total;
            }
        }
        return total;
        }
        else{
          this.productservice.presentToast( this.qtycheck)
        }
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })

    }
    
   
    decrementQty(quantityperproduct,id){
    if(quantityperproduct-1 < 1){
      quantityperproduct = 1;
      var existingEntries = JSON.parse(localStorage.getItem("cart_items"));
      let isInCart = false;
      if (existingEntries) {
        isInCart = existingEntries.some(item => item.id == id);
       
      } else {
        existingEntries = [];
      }
      if (isInCart) {
          existingEntries.map(item => {
            if (item.id == id) {
              item.quantityperproduct = quantityperproduct;
            }
            return item;
           
          });  
     
  
      } else {
        existingEntries.push(quantityperproduct);
    
      }
      localStorage.setItem('cart_items', JSON.stringify(existingEntries)); 
      this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
      let total = 0;
      for (var i = 0; i < this.getcartProductList.length; i++) {
          if (this.getcartProductList[i].totalproductprice) {
              total += (this.getcartProductList[i].price * this.getcartProductList[i].quantityperproduct);
              this.totalamount = total;
          }
      }
      return total;
    }
    else{
      quantityperproduct -= 1;
      var existingEntries = JSON.parse(localStorage.getItem("cart_items"));
      let isInCart = false;
      if (existingEntries) {
        isInCart = existingEntries.some(item => item.id == id);
       
      } else {
        existingEntries = [];
      }
      if (isInCart) {
          existingEntries.map(item => {
            if (item.id == id) {
              item.quantityperproduct = quantityperproduct;
            }
            return item;
           
          });  
     
  
      } else {
        existingEntries.push(quantityperproduct);
    
      }
      localStorage.setItem('cart_items', JSON.stringify(existingEntries)); 
      this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
      let total = 0;
      for (var i = 0; i < this.getcartProductList.length; i++) {
          if (this.getcartProductList[i].totalproductprice) {
              total += (this.getcartProductList[i].price * this.getcartProductList[i].quantityperproduct);
              this.totalamount = total;
          }
      }
      return total;
    }
    }

  getproductList(){
    this.productservice.presentLoading();
    this.productservice.getproductlist('','','','','')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  removeproductTocart(id){

    var filtered = this.getcartProductList.filter(function(item) { 
      return item.id !== id;  
   });
   localStorage.setItem("cart_items", JSON.stringify(filtered));
   this.events.publish('cart');
      this.getcartProductList = (JSON.parse(localStorage.getItem('cart_items')));
      this.selectedlength = this.getcartProductList.length;
      let total = 0;
      if(this.selectedlength != 0){
      for (var i = 0; i < this.getcartProductList.length; i++) {
          if (this.getcartProductList[i].totalproductprice) {
              total += this.getcartProductList[i].totalproductprice;
              this.totalamount = total;
          }
      }
    }
    else{
      this.totalamount = 0;
    }
      return total;
 
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: 'Are you sure want to delete this item from your cart?',
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
            this.removeproductTocart(id);
          }
        }
      ]
    });

    await alert.present();
  }
 
  proceedtobuy(){
    this.token = localStorage.getItem('token');
  this.events.subscribe('loggedin',() => {
    this.token = localStorage.getItem('token');
  })
    this.productLists = (JSON.parse(localStorage.getItem('cart_items')))
    if(this.token){
      this.router.navigate(['address',{"fromcart":"1","productLists":this.productLists,"totalamount":this.totalamount}]);
    }
    else{
      this.router.navigate(['checkout',{"fromcart":"1","productLists":this.productLists,"totalamount":this.totalamount}]);
    }
    
  }
  viewcart(){
    this.router.navigate(['/viewcartproduct']);
  }
  back(){
    this.router.navigate(['']);
  }
  shopnow(){
    this.router.navigate(['/productbycategory']);
  }
}
