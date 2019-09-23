import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController, Events } from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  subcategory_name: any;
  category_id: any;
  subcategory_id: any;
  totalpricecart: string;
  onboard: any;
  quantity: string;
  fromcart: string;
  singleid: any;
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  verificationId: any;
  fromorder:any;
  constructor(public firebaseAuthentication:FirebaseAuthentication,private route: ActivatedRoute,public events: Events,private _location: Location, private alertCtrl: AlertController,private router: Router,public formBuilder: FormBuilder,public productservice:ProductsService) { 
    this.singleid = route.snapshot.paramMap.get('id');
    console.log(this.singleid);
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    this.quantity = route.snapshot.paramMap.get('quantity');
    this.fromcart = route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = route.snapshot.paramMap.get('totalamount');
    this.onboard = route.snapshot.paramMap.get('onboard');
    this.fromorder = route.snapshot.paramMap.get('fromorder');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
      mobile: ['',  [Validators.required, this.productservice.checkLimit(1000000000,999999999999)]],
      password: ['', Validators.compose([Validators.required])],
     
       });
  }
  submit(){
    let mobileapp = {"mobileapp":""};
    let obj = Object.assign(this.registerForm.value,mobileapp);
    if(!this.registerForm.valid){
      this.submitAttempt = true;
    }else{
      this.productservice.presentLoading();
      this.submitAttempt = false;
      this.productservice.userregister(obj).subscribe(data =>{
        // this.productservice.loadingdismiss();
        const phoneNumberString = "+91" + this.registerForm.value.mobile;
        this.firebase(phoneNumberString);
        this.productservice.presentToast(data.message);
       
      }, 
       err =>{
        this.productservice.loadingdismiss();
        this.productservice.presentToast(err.error.message);
     })
    }
  }
firebase(phoneNumberString){
  console.log(phoneNumberString)
  this.firebaseAuthentication.verifyPhoneNumber(phoneNumberString, 30000)
  .then( confirmationResult => {
    console.log("this.verificationId")
    console.log(confirmationResult)
    this.verificationId = confirmationResult;
    console.log(this.verificationId)
    if(this.verificationId){
      // this.productservice.loadingdismiss();
    this.router.navigate(['otpverification',{"mobile":this.registerForm.value.mobile,"verificationId":this.verificationId,"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,"onboard":this.onboard,'fromorder':this.fromorder}]);
    }
    this.registerForm.reset();
    
  })
.catch((error) => {
  console.error(error)
  // this.alert(error);
  this.productservice.presentAlert(error);
  this.router.navigate(['checkout',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,'fromorder':this.fromorder}]);
  console.error(error)});
}
  back(){
    if(this.onboard == "1"){
      this.router.navigate(['onboard']);
    }
    else{
      this.router.navigate(['checkout',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,'fromorder':this.fromorder}]);
    }

  }

  Login(){
    this.router.navigate(['checkout',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"onboard":this.onboard,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,'fromorder':this.fromorder}]);

  }

  // async alert(verificationId){
  //   const prompt = await this.alertCtrl.create({
  //     header: 'Enter the Confirmation code',
  //     inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //     buttons: [
  //       { text: 'Cancel',
  //         handler: data => { console.log('Cancel clicked'); }
  //       },
  //       { text: 'Send',
  //         handler: data => {
  //           let otp = "1";
  //         this.firebaseAuthentication.signInWithVerificationId(verificationId,data.confirmationCode).then((user) => {
  //           this.productservice.onetimepassword(this.registerForm.value.mobile,otp).subscribe(otpdata =>{
  //             console.log(otpdata);
  //           },
  //           err =>{
  //             this.productservice.presentToast(err.error.message);
  //          })
  //         console.log(user);
  //         this.router.navigate(['checkout']);
  //         })
  //         }
  //       }
  //     ]
  //   });
  //   await prompt.present();
  // }
}
