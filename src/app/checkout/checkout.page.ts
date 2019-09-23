import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import {Location} from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  subcategory_name: any;
  category_id: any;
  subcategory_id: any;
  totalpricecart: string;
  cartcount: any;
  cartDetails: any;
  fromcart: string;
  quantity: string;
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  employee = { mobileotp: ''};
  verificationId: any;
  singleid:any;
  numberverify:boolean = false;
  verify = { mobile: ''};
  onboard:any;
  fromorder:any;

  constructor(public firebaseAuthentication:FirebaseAuthentication,private _location: Location ,public events: Events,private route: ActivatedRoute,private alertCtrl: AlertController,private router: Router,public formBuilder: FormBuilder,public productservice:ProductsService,public toastController: ToastController) { 
    this.singleid = route.snapshot.paramMap.get('id');
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    this.quantity = route.snapshot.paramMap.get('quantity');
    this.fromcart = route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = route.snapshot.paramMap.get('totalamount');
    this.onboard = route.snapshot.paramMap.get('onboard');
    this.fromorder = route.snapshot.paramMap.get('fromorder');
    console.log(this.onboard)
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    // firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
    //   if(user){
    //     router.navigate(['/dashboard']);
    //   }
    //   else{
    //     router.navigate(['']);
    //   }
    // })

  }
  ionViewWillEnter(){
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.subcategory_id = this.route.snapshot.paramMap.get('subcategory_id');
    this.category_id = this.route.snapshot.paramMap.get('category_id');
    this.subcategory_name = this.route.snapshot.paramMap.get('subcategoryname');
    this.quantity = this.route.snapshot.paramMap.get('quantity');
    this.fromcart = this.route.snapshot.paramMap.get('fromcart');
    this.fromcart = this.route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = this.route.snapshot.paramMap.get('totalamount');
    this.onboard = this.route.snapshot.paramMap.get('onboard');
    console.log(this.onboard)
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
  }
  ngOnInit() {
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.initForm();
  }
  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
      password: ['', Validators.compose([Validators.required])]
      });
  }
  
  register(){
    this.router.navigate(['register',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id}]);
  }
  login(){
    if(!this.loginForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      this.productservice.login(this.loginForm.value).subscribe(data =>{
        localStorage.setItem("token", data['refreshToken']);
        let token = localStorage.setItem("token", data['refreshToken']);
        localStorage.setItem("user_id", data['userid']);
        this.events.publish('loggedin');
        console.log(this.fromcart)
        if(this.fromcart == null || this.fromcart == "null"){
          this.fromcart = "";
        }
        if(this.singleid == null || this.singleid == "null"){
          this.singleid = "";
        }
        if(this.onboard == 1){
          this.router.navigate(['']);
        }
        else if(this.fromcart || this.singleid && this.onboard != 1){
          this.router.navigate(['address',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id}]);
        }
        else{
          this.router.navigate(['']);
        }
        
      },
      err =>{
        if(err.status == 401){
          if(err.error.mobile){
          const phoneNumberString = "+91" + err.error.mobile;
          this.firebaseAuthentication.verifyPhoneNumber(phoneNumberString, 30000)
          .then( confirmationResult => {
            this.verificationId = confirmationResult;
            if(this.verificationId){
              this.router.navigate(['otpverification',{"mobile":err.error.mobile,"refreshToken":err.error.refreshToken,"userid":err.error.userid,
              "verificationId":this.verificationId,"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,
            "fromlogin":"1","onboard":this.onboard,'fromorder':this.fromorder}]);
            // this.alert(this.verificationId,err.error.mobile);
            }
            
          })
        .catch((error) => {
          this.productservice.presentAlert(error);
          console.error(error)
        });
        this.presentToast(err.error.message);
      }
          this.presentToast(err.error.message);
      }
        
        else{
          this.presentToast(err.error.message);
        }
        
            })
    }
  }
  back(){
    if(this.onboard == "1"){
      this.router.navigate(['register',{"onboard":this.onboard}]);
    }
    else{
      if(this.fromcart == '1'){
        this.router.navigate(['tabs/viewcartproduct']);
      }
      else if(this.singleid){
        this.router.navigate(['viewsingleproduct',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id}]);
      }
      else{
        this.router.navigate(['']);
      }
    }
    
  }
  async alert(verificationId,mobile){
    const prompt = await this.alertCtrl.create({
      header: 'Enter the Confirmation code',
      inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
      buttons: [
        { text: 'Cancel',
          handler: data => { console.log('Cancel clicked'); }
        },
        { text: 'Send',
          handler: data => {
            let otp = "1";
          this.firebaseAuthentication.signInWithVerificationId(verificationId,data.confirmationCode).then((user) => {
            this.productservice.onetimepassword(mobile,otp).subscribe(otpdata =>{
              // this.numberverify = false;
              if(this.fromcart || this.singleid){
                this.router.navigate(['address',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id}]);
              }
              else{
                this.router.navigate(['']);
              }
            },
            err =>{
              this.productservice.presentToast(err.error.message);
           })
          // this.router.navigate(['checkout',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart}]);
          this.events.publish('loggedin');
         
        })
          .catch((error) => {
            // this.alert(error);
            this.productservice.presentToast(error);
            console.error(error)});
          }
        }
      ]
    });
    await prompt.present();
  }
  forgetpassword(){
    this.router.navigate(['forgetpassword',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart,"totalamount":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id}]);
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000
    });
    toast.present();
  }
  viewcart(){
    this.router.navigate(['tabs/viewcartproduct']);
  }
}
