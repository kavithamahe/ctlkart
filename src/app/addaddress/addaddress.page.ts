import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {
  totalpricecart: string;
  address_type: any;
  fromcart: string;
  quantity: string;
  singleid: string;
  type: string;
  user_id: string;
  checkoutForm: FormGroup;
  submitAttempt: boolean = false;
  fromorder:any;

  constructor(private location:Location,public formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,public productservice:ProductsService,) {
    this.user_id = localStorage.getItem("user_id");
    this.type = this.route.snapshot.paramMap.get('type');
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.quantity = this.route.snapshot.paramMap.get('quantity');
    this.fromcart = this.route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = this.route.snapshot.paramMap.get('totalamount');
    this.fromorder = route.snapshot.paramMap.get('fromorder');
    this.initForm();
   }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.quantity = this.route.snapshot.paramMap.get('quantity');
    this.fromcart = this.route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = this.route.snapshot.paramMap.get('totalamount');
  }
  ionViewWillEnter(){
    this.type = this.route.snapshot.paramMap.get('type');
   
  }
  initForm(){
    this.checkoutForm = this.formBuilder.group({
      name:['', Validators.compose([Validators.required])],
      mobile: ['',  [Validators.required, this.productservice.checkLimit(1000000000,999999999999)]],
      address: ['', Validators.compose([Validators.required])],
      landmark: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])],
      address_type: ['', Validators.compose([Validators.required])]
     
       });
  }
  radioGroupChange(ev){
  this.address_type = ev.detail.value;
  }
  submitaddress(){
    this.checkoutForm.value.address_type = this.address_type;
    let user_id = {"user_id":this.user_id};
    let obj = Object.assign(this.checkoutForm.value,user_id);
    if(!this.checkoutForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
    this.productservice.presentLoading();
      this.productservice.addaddress(obj)
    .subscribe(product =>{ 
      this.productservice.loadingdismiss();
      this.checkoutForm.reset();
      if(this.type == "address"){
        this.router.navigate(['getaddress']);
      }
      else{
        this.router.navigate(['address',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,'fromorder':this.fromorder}]);
      }

      
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
    }
    back(){
      if(this.type == "address"){
        this.router.navigate(['getaddress']);
      }
      else{
      this.router.navigate(['address',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,'fromorder':this.fromorder}]);
    }
  }
}
