import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-childcategory',
  templateUrl: './childcategory.page.html',
  styleUrls: ['./childcategory.page.scss'],
})
export class ChildcategoryPage implements OnInit {
  category_id: any;
  imgURl: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  getallcategories:any=[];
  getallsubcategory:any=[];
  term = { searchText: ''};
  public toggled: boolean = false;
  subcategory_id:any;
  subcategory_name:any;
  constructor(private location:Location,private router: Router,public events: Events,public productservice:ProductsService,private route: ActivatedRoute) {
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    if(this.subcategory_name){
      this.subcategory_name = this.subcategory_name;
    }
    else{
      this.subcategory_name = "Products";
    }
    this.getsubsubCategory(this.subcategory_id);
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
    this.category_id = this.route.snapshot.paramMap.get('category_id');
    this.subcategory_id = this.route.snapshot.paramMap.get('subcategory_id');
    this.subcategory_name = this.route.snapshot.paramMap.get('subcategoryname');
    this.getsubsubCategory(this.subcategory_id);
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
  }
  getsubsubCategory(subcategory_id){
    this.productservice.presentLoading();
    this.productservice.getsubsubcategory(this.subcategory_id)
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
   this.getsubsubCategory(this.subcategory_id);
   this.term.searchText = "";
 }
  viewcart(){
    this.toggled = false;
    this.router.navigate(['tabs/viewcartproduct']);
  }
  getsubcategory(id,subsubcategory_name){
    this.toggled = false;
    this.router.navigate(['/productbycategory',{"subsubcategory_id":id,"subcategory_id":this.subcategory_id,"subsubcategory_name":subsubcategory_name,"subcategoryname":this.subcategory_name,"category_id":this.category_id}],{skipLocationChange: true});
  }
  back(){
    console.log(this.category_id)
    this.router.navigate(['subcategorylist',{"id":this.category_id}]);
  }
  getItems(searchItem) {
    this.productservice.getsubsubcategorylistsearch(this.subcategory_id,this.term.searchText)
    .subscribe(category =>{ 
      this.getallsubcategory = category.data;
    },
    err =>{
      this.productservice.presentToast(err.error.message);
   })
  }
}
