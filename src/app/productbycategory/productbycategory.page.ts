import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Events,ActionSheetController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productbycategory',
  templateUrl: './productbycategory.page.html',
  styleUrls: ['./productbycategory.page.scss'],
})
export class ProductbycategoryPage implements OnInit {
  category_id: any;
  subcategory_name: string;
  subcategory_id: string;
  getsubcategorylocal: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  imgURl: any;
  getProductLists:any=[];
  sortby = { level: ''};
  sliderConfig = {
    slidesPerView: 3,
    spaceBetween: 6,
    autoplay:true,
    loop:true
  };
  getallsubcategory:any=[];
  term = { searchText: ''};
  public toggled: boolean = false;
  subsubcategory_name:any;
  subsubcategory_id:any;
  product_name:any;

  constructor(private location:Location,public actionSheetController: ActionSheetController,public events: Events,public productservice:ProductsService,public router: Router,private route: ActivatedRoute) { 
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.subsubcategory_id = route.snapshot.paramMap.get('subsubcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    this.subsubcategory_name = route.snapshot.paramMap.get('subsubcategory_name');
    localStorage.setItem("category_id",this.category_id);
    localStorage.setItem("subcategory_id",this.subcategory_id);
    localStorage.setItem("subcategoryname",this.subcategory_name);
    // localStorage.setItem("fromorder",child.fromorder);
    // localStorage.setItem("singleid",child.singleid);
    // localStorage.setItem("id",child.id);
    // localStorage.setItem("status",child.status);
    if(this.subsubcategory_id == "null"){
      this.subsubcategory_id = "";
    }
    if(this.subcategory_id == "null"){
      this.subcategory_id = "";
    }
    if(this.subcategory_name == "null"){
      this.subcategory_name = "";
    }
    if(this.subsubcategory_name == "null"){
      this.subsubcategory_name = "";
    }
    if(this.subcategory_name && !this.subsubcategory_name){
      console.log(this.subcategory_name)
      this.product_name = this.subcategory_name;
    }
    else if(this.subcategory_name && this.subsubcategory_name){
      console.log(this.subsubcategory_name)
      this.product_name = this.subsubcategory_name;
    }
    else{
      this.product_name = "Products";
    }
    this.getproductbysubcategory(this.subcategory_id,this.subsubcategory_id);
    this.toggled = false;
  }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.imgURl = this.imageUrl;
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 cancelSearch(event){
   this.toggle();
   this.getproductbysubcategory(this.subcategory_id,this.subsubcategory_id);
   this.term.searchText = "";
 }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.subcategory_id = this.route.snapshot.paramMap.get('subcategory_id');
    this.subsubcategory_id = this.route.snapshot.paramMap.get('subsubcategory_id');
    this.category_id = this.route.snapshot.paramMap.get('category_id');
    this.subcategory_name = this.route.snapshot.paramMap.get('subcategoryname');
    this.subsubcategory_name = this.route.snapshot.paramMap.get('subsubcategory_name');
    if(this.subsubcategory_id == "null"){
      this.subsubcategory_id = "";
    }
    if(this.subcategory_id == "null"){
      this.subcategory_id = "";
    }
    if(this.subcategory_name == "null"){
      this.subcategory_name = "";
    }
    if(this.subsubcategory_name == "null"){
      this.subsubcategory_name = "";
    }
    if(this.subcategory_name && !this.subsubcategory_name){
      this.product_name = this.subcategory_name;
    }
    else if(this.subcategory_name && this.subsubcategory_name){
      this.product_name = this.subsubcategory_name;
    }
    else{
      this.product_name = "Products";
    }
    if(this.subsubcategory_id == "null"){
      this.subsubcategory_id = "";
    }
    this.getproductbysubcategory(this.subcategory_id,this.subsubcategory_id);
  }
  triggerInput( ev: any ) {
    // Reset items back to all of the items
    // this.getproductList();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.getProductLists = this.getProductLists.filter((item) => {
        return (item.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }  
}
  getproductbysubcategory(subcategory_id,subsubcategory_id){
    this.productservice.presentLoading();
    this.productservice.getproductlist("",subcategory_id,"","",subsubcategory_id)
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getItems(searchItem) {
    this.productservice.getproductlistsearch(this.term.searchText)
    .subscribe(product =>{ 
      this.getProductLists = product.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
  }
  filterbyCategory(id,subcategory_id,val){
    this.productservice.presentLoading();
    this.productservice.getproductlist("",subcategory_id,val,'','')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  // filterbySubategory(subcategory_id){
  //   localStorage.setItem('key',subcategory_id);
  //   this.productservice.presentLoading();
  //   this.productservice.getproductlist(this.category_id,subcategory_id,'','')
  //   .subscribe(product =>{ 
  //     this.getProductLists = product.data;
  //     this.productservice.loadingdismiss();
  //   },
  //   err =>{
  //     this.productservice.loadingdismiss();
  //     this.productservice.presentToast(err.error.message);
  //  })
  // }
  viewsingleproduct(id){
    this.toggled = false;
    this.router.navigate(['/viewsingleproduct',{"id":id,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,"subsubcategory_id":this.subsubcategory_id,"subsubcategory_name":this.subsubcategory_name}]);
  }
  sorybyvalue(val){
    this.getsubcategorylocal = localStorage.getItem('key');
    this.filterbyCategory('',this.subcategory_id,val);
  }
  viewcart(){
    this.toggled = false;
    this.router.navigate(['tabs/viewcartproduct']);
  }
  back(){
    this.toggled = false;
    if(this.category_id && !this.subsubcategory_id){
      this.router.navigate(['subcategorylist',{"id":this.category_id}]);
    }
    else if(this.category_id && this.subsubcategory_id){
      this.router.navigate(['/childcategory',{"subcategory_id":this.subcategory_id,"subcategoryname":this.subcategory_name,"category_id":this.category_id}],{skipLocationChange: true});
    }
    else{
      this.router.navigate(['tabs/viewcartproduct']);
    }
    // this.location.back();
  }
}
