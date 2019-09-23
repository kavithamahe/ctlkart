import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subcategorylist',
  templateUrl: './subcategorylist.page.html',
  styleUrls: ['./subcategorylist.page.scss'],
})
export class SubcategorylistPage implements OnInit {

  category_id: any;
  imgURl: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  getallcategories:any=[];
  getallsubcategory:any=[];
  term = { searchText: ''};
  public toggled: boolean = false;
  getallsubsubcategory:any=[];
  category_name:any;
  title:any;
  constructor(private location:Location,private router: Router,public events: Events,public productservice:ProductsService,private route: ActivatedRoute) {
    this.category_id = route.snapshot.paramMap.get('id');
    this.category_name = route.snapshot.paramMap.get('category_name');
    this.getsubCategory(this.category_id);
    this.toggled = false;
    if(this.category_name){
      this.title = this.category_name;
    }
    else{
      this.title = "Sub Category";
    }
   }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.imgURl = this.imageUrl;
  }
  ionViewWillEnter(){
    this.category_id = this.route.snapshot.paramMap.get('id');
    this.getsubCategory(this.category_id);
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
  }
  getsubCategory(category_id){
    this.productservice.presentLoading();
    this.productservice.getsubcategory(category_id)
    .subscribe(product =>{ 
      this.getallsubcategory = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 cancelSearch(event){
   this.toggle();
   this.getsubCategory(this.category_id);
   this.term.searchText = "";
 }
  viewcart(){
    this.toggled = false;
    this.router.navigate(['tabs/viewcartproduct']);
  }
  getsubcategory(id,subcategory_name){
    this.toggled = false;
    this.productservice.getsubsubcategory(id)
    .subscribe(category =>{ 
      this.getallsubsubcategory = category.data;
      console.log(this.getallsubsubcategory.length);
      if(this.getallsubsubcategory.length != 0){
        this.router.navigate(['/childcategory',{"subcategory_id":id,"subcategoryname":subcategory_name,"category_id":this.category_id}]);
       }
       else{
        this.router.navigate(['/productbycategory',{"subcategory_id":id,"subcategoryname":subcategory_name,"category_id":this.category_id}]);
       }
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
 
    
  }
  back(){
    this.toggled = false;
    this.router.navigate(['tabs/category']);
  }
  getItems(searchItem) {
    this.productservice.getsubcategorylistsearch(this.category_id,this.term.searchText)
    .subscribe(category =>{ 
      this.getallsubcategory = category.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
  }
}