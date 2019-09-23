import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd, } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { environment } from '../../environments/environment';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit  {
  public toggled: boolean = false;
  cartDetails: any;
  cartcount: any;
  private imageUrl = environment.imageUrl;
  getProductLists:any=[];
  getallcategories:any=[];
  sliderConfig = {
    slidesPerView: 3,
    spaceBetween: 6,
    autoplay:true,
    loop:true
  };
  sliderConfigProduct = {
    slidesPerView: 2,
    spaceBetween: 6,
    autoplay:true,
    loop:true
  };
  sliderConfigimage = {
    spaceBetween: 6,
    autoplay:true
  }
  imgURl:any;
  term = { searchText: ''};
  constructor(public productservice:ProductsService,public router: Router,public events: Events) { 
    this.toggled = false;
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
        console.log(this.cartcount)
      }
    })

    this.getproductList();
    this.getCategory();
  }

  ngOnInit() {
    localStorage.removeItem('category_id');
    localStorage.removeItem('subcategory_id');
    localStorage.removeItem('subcategoryname');
    localStorage.removeItem('singleid');
    localStorage.removeItem('status');
    localStorage.removeItem('fromorder');
  //  this.router.events.subscribe((e: any) => {
  //     // If it is a NavigationEnd event re-initalise the component
  //     if (e instanceof NavigationEnd) {
  //       this.getproductList();
  //       console.log("DashboardContainerComponent.onNavigationEnd()");
  //     }
  //   });
  
    this.imgURl = this.imageUrl;
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    
    
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 cancelSearch(event){
   this.toggle();
   this.getproductList();
   this.term.searchText = "";
 }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.getproductList();
    this.getCategory();
  }
  getproductList(){
    this.productservice.presentLoading();
    this.productservice.getproductlist('','','',this.term.searchText,'')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  
  getCategory(){
    this.productservice.presentLoading();
    this.productservice.getCategoryList()
    .subscribe(category =>{ 
      this.getallcategories = category.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message); 
   })
  }
  filterbyCategory(id){
    this.toggled = false;
    this.router.navigate(['/subcategorylist',{"id":id}],{skipLocationChange: true});
  }
  seecategory(){
    this.toggled = false;
    this.router.navigate(['tabs/category']);
  }
  doRefresh(event){
    this.toggled = false;
    this.getproductList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getItems(searchItem) {
    this.productservice.getproductlistsearch(searchItem)
    .subscribe(product =>{ 
      this.getProductLists = product.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
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
  // getItems(ev) {
  //   // Reset items back to all of the items
  //   this.getproductList();
  //   console.log(this.getProductLists);
  //   // set val to the value of the ev target
  //   var val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.getProductLists = this.getProductLists.filter((item) => {
  //       return (item.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }
  viewsingleproduct(id){
    this.toggled = false;
    this.router.navigate(['/viewsingleproduct',{"id":id}]);
  }
  viewcart(){
    this.toggled = false;
    this.router.navigate(['tabs/viewcartproduct']);
  }
}
