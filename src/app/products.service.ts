import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController,LoadingController, AlertController } from '@ionic/angular';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token: string;
  private apiUrl = environment.apiUrl;
  headers: any;
  options: any;
  isLoading = false;
  constructor(private http : HttpClient,public toastController: ToastController,public alertController: AlertController,public loadingController: LoadingController) {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    
   }
   checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
  }
  quantityavailcheck(quantity,singleid): Observable<any> {
    const body= {"quantity":quantity,"id":singleid};
    return this.http.post(this.apiUrl + 'quantityavailcheck',body,this.headers);
  }
   getproductlist(id,subcategory_id,search,searchText,subsubcategory_id): Observable<any> {
    const body= {"category_id":id,"subcategory_id":subcategory_id,"price":search,"subsubcategory_id":subsubcategory_id};
    return this.http.post(this.apiUrl + 'getproductlist',body,this.headers);
  }
  getproductlistsearch(search): Observable<any> {
    const body= {"search":search};
    return this.http.post(this.apiUrl + 'getproductlistsearch',body,this.headers);
  }
  getCategoryList(): Observable<any> {
    const body= { };
    return this.http.post(this.apiUrl + 'getcategory',body,this.headers);
  }
  getcategorylistsearch(search): Observable<any> {
    const body= {"search":search};
    return this.http.post(this.apiUrl + 'getcategorysearch',body,this.headers);
  }
  getsubcategorylistsearch(category_id,search): Observable<any> {
    const body= {"search":search,"category_id":category_id};
    return this.http.post(this.apiUrl + 'getsubcategorysearch',body,this.headers);
  }
  getsubsubcategorylistsearch(subcategory_id,search): Observable<any> {
    const body= {"search":search,"subcategory_id":subcategory_id};
    return this.http.post(this.apiUrl + 'getsubsubcategorysearch',body,this.headers);
  }
  getproductlistsingle(id): Observable<any> {
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'viewsingleproduct',body,this.headers);
  }
  getsubcategory(category_id): Observable<any> {
    const body= {"category_id":category_id};
    return this.http.post(this.apiUrl + 'getsubcategory',body,this.headers);
  }
  getsubsubcategory(id): Observable<any> {
    const body= {"category_id":"","subcategory_id":id};
    return this.http.post(this.apiUrl + 'getsubsubcategory',body,this.headers);
  }
  userregister(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'register',formvalue,this.headers);
  }
  login(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'login',formvalue,this.headers);
  }
  onetimepassword(mobile,otp): Observable<any>{
    const body= {"mobile":mobile,"otp":otp,"email":""};
    return this.http.post(this.apiUrl + 'onetimepassword',body,this.headers);
  }
  addaddress(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'addaddress',formvalue,this.headers);
  }
  getaddress(user_id): Observable<any> {
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getaddress',body,this.headers);
  }
  removeaddress(id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'removeaddress',body,{ headers:this.headers });
  }
  removeaccount(id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'deleteaccount',body,{ headers:this.headers });
  }
  checkout(user_id,customer_id,product_id,amount,quantity): Observable<any> {
    const body= {"user_id":user_id,"customer_id":customer_id,"product_id":product_id,"payment_type":"offline",
  "amount":amount,"quantity":quantity};
    return this.http.post(this.apiUrl + 'productcheckout',body,this.headers);
  }
  checkoutcart(user_id,customer_id,productListsfromcart,totalpricecart): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id,"customer_id":customer_id,"productListsfromcart":productListsfromcart,"payment_type":"offline",
  "totalpricecart":totalpricecart};
    return this.http.post(this.apiUrl + 'productcheckoutformcart',body,{ headers:this.headers });
  }
  getallorders(user_id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getmyorders',body,{ headers:this.headers });
  }
  getmyorderlistsearch(user_id,search): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id,"search":search};
    return this.http.post(this.apiUrl + 'searchprocessing',body,{ headers:this.headers });
  }
  getmyorderlistsearchdelivered(user_id,search): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id,"search":search};
    return this.http.post(this.apiUrl + 'searchdelivered',body,{ headers:this.headers });
  }
  getmyorderlistsearchcancel(user_id,search): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id,"search":search};
    return this.http.post(this.apiUrl + 'searchcancelled',body,{ headers:this.headers });
  }
  getmyprocessingorders(user_id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getprocessingorder',body,{ headers:this.headers });
  }
  getmydeliveredorders(user_id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getdeliveredorder',body,{ headers:this.headers });
  }
  getmycancelledorders(user_id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getcancelledorder',body,{ headers:this.headers });
  }
  cancelorderbyuser(id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'ordercancelbyuser',body,{ headers:this.headers });
  }
  reviewsentuser(id,user_id,rating,ratingcomments): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"product_id":id,"user_id":user_id,"rating":rating,"ratingcomments":ratingcomments};
    return this.http.post(this.apiUrl + 'productreview',body,{ headers:this.headers });
  }
  changepassword(password): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
   
    const body= {"current_password":password.currentpassword,"new_password":password.newpassword,"confirm_password":password.confirmpassword};
    return this.http.post(this.apiUrl + 'password/change',body,{ headers:this.headers });
  }
  forgetpassword(email): Observable<any> { 
    const body= {"email":email};
    return this.http.post(this.apiUrl + 'password/forgot',body,this.headers);
  }
  getprofile(user_id): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getprofile',body,{ headers:this.headers });
  }
  getcurrency(currencyvalue): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"currencyvalue":currencyvalue};
    return this.http.post(this.apiUrl + 'getcurrency',body,{ headers:this.headers });
  }
  editprofile(user_id,profileForm,base64_image): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    
    const body= {"id":user_id,"firstname":profileForm.firstname,"lastname":profileForm.lastname,"email":profileForm.email,"mobile":profileForm.mobile,"base64Image":base64_image};
    return this.http.post(this.apiUrl + 'editprofile',body,{ headers:this.headers });
  }
  getsingleorderdetailsservice(id,status): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    
    const body= {"order_id":id,"status":status};
    return this.http.post(this.apiUrl + 'viewsingleorder',body,{ headers:this.headers });
  }
  viewsingleaddress(id): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'viewsingleaddress',body,{ headers:this.headers });
  }
  editaddress(id,addresss): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id,"name":addresss.name,"mobile":addresss.mobile,"address":addresss.address,"landmark":addresss.landmark,"city":addresss.city,
    "state":addresss.state,"zipcode":addresss.zipcode,"address_type":addresss.address_type};
    return this.http.post(this.apiUrl + 'editaddress',body,{ headers:this.headers });
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000
    });
    toast.present();
  }
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 1000
    });
    return await loading.present();
  }
  async loadingdismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
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
}
