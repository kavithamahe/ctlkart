import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { environment } from '../../environments/environment';
import { ToastController, Events } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewsingleproduct',
  templateUrl: './viewsingleproduct.page.html',
  styleUrls: ['./viewsingleproduct.page.scss'],
})
export class ViewsingleproductPage implements OnInit {
  subcategory_id: any;
  category_id: any;
  subcategory_name:any;
  cartcount: any;
  cartDetails: any;
  token: any;
  private imageUrl = environment.imageUrl;
  imgURl: any;
  getsingleProductList:any =[];
  singleid: any;
  quantities: Array<number> = [];
  getProductLists:any;
  data: any;
  item_qty :any=1;
  item_qtycheck :any=1;
  gotocart:boolean=false;
  fromorder:any;
  orderid:any;
  orderstatus:any;
  subsubcategory_id:any;
  subsubcategory_name:any;
  totalQty:any;
  qtycheck:any;
  existingtotalQty:boolean = false;
  existingQty:any;
  constructor(public events: Events,private _location: Location, public productservice:ProductsService,private route: ActivatedRoute,public router:Router,public toastController: ToastController) { 
    this.singleid = route.snapshot.paramMap.get('id');
    this.fromorder = route.snapshot.paramMap.get('fromorder');
    this.orderid = route.snapshot.paramMap.get('singleid');
    this.orderstatus = route.snapshot.paramMap.get('status');
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    this.subsubcategory_id = route.snapshot.paramMap.get('subsubcategory_id');
    this.subsubcategory_name = route.snapshot.paramMap.get('subsubcategory_name');
          localStorage.setItem("fromorder",this.fromorder);
          localStorage.setItem("singleid",this.orderid);
          localStorage.setItem("status",this.orderstatus);
    this.getsingleproductlist(this.singleid);
    this.getproductList();
   
  }
  ionViewWillEnter(){
  
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.fromorder = this.route.snapshot.paramMap.get('fromorder');
    this.orderid = this.route.snapshot.paramMap.get('singleid');
    this.orderstatus = this.route.snapshot.paramMap.get('status');
    this.category_id = this.route.snapshot.paramMap.get('category_id');
    this.subcategory_name = this.route.snapshot.paramMap.get('subcategoryname');
    this.subsubcategory_id = this.route.snapshot.paramMap.get('subsubcategory_id');
    this.subsubcategory_name = this.route.snapshot.paramMap.get('subsubcategory_name');
    this.getsingleproductlist(this.singleid);
    this.getproductList();
  }
  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.token = localStorage.getItem('token');
    this.imgURl = this.imageUrl;
    for (let i = 1; i <= 100; i++) {
      this.quantities.push(i)
    }
  }
  incrementQty(){
    var qty = this.item_qtycheck += 1;
    this.productservice.quantityavailcheck(qty,this.singleid)
    .subscribe(qtny =>{ 
      this.qtycheck = qtny.message;
      if(this.qtycheck == "true"){
        this.item_qty += 1;
        }
        else{
          this.productservice.presentToast( this.qtycheck)
        }
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })

  
   
    }
    
   
    decrementQty(){
    if(this.item_qty-1 < 1){
      this.item_qty = 1;
    }
    else{
      this.item_qty -= 1;
    }
    }
    viewcart(){
      this.router.navigate(['tabs/viewcartproduct']);
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
  getsingleproductlist(id){
    this.productservice.presentLoading();
    this.productservice.getproductlistsingle(id)
    .subscribe(product =>{ 
      this.getsingleProductList = product.data;
      this.totalQty = product['data'][0]['quantity'];
      this.existingQty = product['data'][0]['existing_quantity'];
      if(product['data'][0]['existing_quantity'] <= 10){
        this.existingtotalQty = true;
      }
      
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  addproductTocart(id,item_qty,price){
    if(this.existingQty != 0){
    var item_qtystr = item_qty.toString();
    let toatlprice = (item_qtystr * price);
    if(item_qtystr == ""){
      this.presentToast("Please Select The Quantity");
    }
    else{
    this.data = this.getProductLists.find(x => x.id == id)
    let total_price = {"totalproductprice":toatlprice};
    let quantityperproduct = {"quantityperproduct":item_qtystr};
    var obj = Object.assign(this.data, quantityperproduct,total_price);
    // console.log(obj)
    var existingEntries = JSON.parse(localStorage.getItem("cart_items") || '[]');
    // console.log(this.data)
// Add item if it's not already in the array, then store array again
if(this.cartDetails){
    let tempProduct = this.cartDetails.find(p => this.data.id == p.id);
    if(tempProduct == null){
    // if (!existingEntries.includes(this.data)) {
      existingEntries.push(this.data);
      localStorage.setItem("cart_items", JSON.stringify(existingEntries));
      this.events.publish('cart');
      this.gotocart = true;
      this.presentToast("One item is added to cart");
    }else{
      // or tell user it's already there
      this.presentToast("item already exists");
    }
  }
  else{
    existingEntries.push(this.data);
    localStorage.setItem("cart_items", JSON.stringify(existingEntries));
    this.events.publish('cart');
    this.gotocart = true;
    this.presentToast("One item is added to cart");
  }
  }
}
else{
  this.presentToast("Youe selected product(s) are not available");
}
  }
  gotocartpage(){
    this.events.publish('cartview');
    this.router.navigate(['tabs/viewcartproduct']);
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  buyNow(id,item_qty){
    if(this.existingQty != 0){
    this.token = localStorage.getItem('token');
    this.events.subscribe('loggedin',() => {
      this.token = localStorage.getItem('token');
    })
    if(item_qty == ""){
      this.presentToast("Please Select The Quantity");
    }
    else{
      if(this.token){
        this.router.navigate(['address',{"id":id,"quantity":item_qty,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,"subsubcategory_id":this.subsubcategory_id,"subsubcategory_name":this.subsubcategory_name,'fromorder':this.fromorder}]);
      }
      else{
    this.router.navigate(['checkout',{"id":id,"quantity":item_qty,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,"subsubcategory_id":this.subsubcategory_id,"subsubcategory_name":this.subsubcategory_name,'fromorder':this.fromorder}]);
      }
    }
  }
  else{
    this.presentToast("Youe selected product(s) are not available");
  }
    }


    back(){
      var orderidlocal= localStorage.getItem("singleid");
      var orderstatuslocal=  localStorage.getItem("status");
      console.log(this.fromorder)
      if(this.category_id != "null" && this.category_id){
        this.router.navigate(['productbycategory',{"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,"subsubcategory_id":this.subsubcategory_id,"subsubcategory_name":this.subsubcategory_name}]);
      }
      else if(this.fromorder == '1'){
        this.router.navigate(['vieworderhistory',{'orderid':orderidlocal,'status':orderstatuslocal}]);
      }
      else{
        this.router.navigate(['']);
      }
    }
}
