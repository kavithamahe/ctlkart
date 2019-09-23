import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  imgURl: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  getallcategories:any=[];
  term = { searchText: ''};
  public toggled: boolean = false;
  constructor(private location:Location,private router: Router,public events: Events,public productservice:ProductsService) {
    this.getCategory();
    this.toggled = false;
   }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.imgURl = this.imageUrl;
  }
  ionViewWillEnter(){
    this.getCategory();
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
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
  back(){
    this.toggled = false;
    this.router.navigate(['']);
    
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 cancelSearch(event){
   this.toggle();
   this.getCategory();
   this.term.searchText = "";
 }
  viewcart(){
    this.toggled = false;
    this.router.navigate(['/viewcartproduct']);
  }
  getsubcategory(id,category_name){
    this.toggled = false;
      this.router.navigate(['/subcategorylist',{"id":id,"category_name":category_name}],{skipLocationChange: true});
  }
  getItems(searchItem) {
    this.productservice.getcategorylistsearch(this.term.searchText)
    .subscribe(category =>{ 
      this.getallcategories = category.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
  }
}
