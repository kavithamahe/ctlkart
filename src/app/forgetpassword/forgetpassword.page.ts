import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  totalpricecart: string;
  fromcart: any;
  quantity: any;
  singleid: any;
  subcategory_id:any;
  category_id:any;
  subcategory_name:any;
  forgotForm: FormGroup;
  submitAttempt: boolean = false;
  fromorder:any;

  constructor(public location: Location,public formBuilder:FormBuilder, public productservice: ProductsService, public alertController: AlertController, public navctrl: NavController, private route: ActivatedRoute) {
    this.singleid = route.snapshot.paramMap.get('id');
    this.subcategory_id = route.snapshot.paramMap.get('subcategory_id');
    this.category_id = route.snapshot.paramMap.get('category_id');
    this.subcategory_name = route.snapshot.paramMap.get('subcategoryname');
    this.quantity = route.snapshot.paramMap.get('quantity');
    this.fromcart = route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = route.snapshot.paramMap.get('totalamount');
    this.fromorder = route.snapshot.paramMap.get('fromorder');
    this.initForm();

  }

  ngOnInit() {

  }
  initForm(){
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i), Validators.required])],
     
       });
  }
  forgetPassword() {
    if (!this.forgotForm.valid) {
      this.submitAttempt = true;
    } else {
      this.productservice.presentLoading();
      this.productservice.forgetpassword(this.forgotForm.value.email)
        .subscribe(password => {
          this.productservice.loadingdismiss();
          this.presentAlert(password.message);
          this.forgotForm.reset();
          this.navctrl.navigateBack(['/checkout', { "id": this.singleid, "quantity": this.quantity, "fromcart": this.fromcart,"totalpricecart":this.totalpricecart,"category_id":this.category_id,"subcategoryname":this.subcategory_name,"subcategory_id":this.subcategory_id,'fromorder':this.fromorder }]);
        },
          err => {
            this.productservice.loadingdismiss();
            this.productservice.presentToast(err.error.message);
          })
  }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  back() {
    this.location.back();
  }
}
