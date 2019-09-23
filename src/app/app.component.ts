import { Component,ViewChild } from '@angular/core';
// import {  ViewChildren, QueryList } from '@angular/core';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Platform,MenuController, Events, AlertController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute,RouterStateSnapshot,RoutesRecognized,RouterState,ActivatedRouteSnapshot   } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  subcategoryname: any;
  subcategory_id: any;
  category_id: any;
  sub: any;
  quantity: string;
  fromcart: string;
  singleid: any;
  @ViewChild(IonRouterOutlet,{static:true}) routerOutlet: IonRouterOutlet;
  cartDetails: any;
  token: any;
  showButton : any=false;
  login_status: any=false;
  cartcount: any;
  public href: string = "";
  tabsbar :any = true;
  fromorder:any;
  status:any;
  orderid:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router,
    public firebaseAuthentication:FirebaseAuthentication,
    public events: Events,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
    this.href = this.router.url;
    if(this.href == "/" && !this.token){
      this.router.navigate(['onboard']);
     
    }
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
      
    this.events.subscribe('loggedin', ()=>{
      this.showButton = true;  
      this.token = localStorage.getItem('token');
      console.log(this.token)
    })
    this.events.subscribe('loggedout', ()=>{
      this.showButton = false;   
      this.token = localStorage.removeItem('token');
      this.cartDetails = localStorage.removeItem('cart_items');
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
   
    this.initializeApp();
  }

  initializeApp() {
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
        console.log(this.cartcount)
      }
    })
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });


      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
         if (this.platform.is('android')) {
          this.statusBar.overlaysWebView(false);
          this.statusBar.backgroundColorByHexString('#000000');
              }
              if (this.platform.is('ios')) {
                 // StatusBar.overlaysWebView(false);
                 //  StatusBar.styleLightContent();
                 this.statusBar.hide();
              }
         setTimeout(() => {
          this.statusBar.hide();
        }, 100);
        
        this.platform.backButton.subscribeWithPriority(0, () => {
      
        const state: RouterState = this.router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        const children: ActivatedRouteSnapshot["children"] = snapshot.root.children;
        const child = children[0].params;
        console.log(child);
        this.singleid =child.id;
        this.fromcart = child.fromcart;
        this.quantity =child.quantity;
        
        // this.sub = this.router.events.subscribe(val => {
        //   if (val instanceof RoutesRecognized) {
        //     console.log(val.state.root.firstChild.params);
        //     this.singleid = val.state.root.firstChild.params.id;
        //     this.fromcart = val.state.root.firstChild.params.fromcart;
        //     this.quantity = val.state.root.firstChild.params.quantity;
        //   }
        // });
        // console.log(this.sub);
          let urlTree = this.router.parseUrl(this.router.url);
          let urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
          console.log(urlWithoutParams);
          // if(urlWithoutParams == "address" || urlWithoutParams == "checkout" || urlWithoutParams == "viewsingleproduct"){
          //  localStorage.setItem("category_id",child.category_id);
          //  localStorage.setItem("subcategory_id",child.subcategory_id);
          //  localStorage.setItem("subcategoryname",child.subcategoryname);
          //  localStorage.setItem("fromorder",child.fromorder);
          //  localStorage.setItem("singleid",child.singleid);
          //  localStorage.setItem("id",child.id);
          //  localStorage.setItem("status",child.status);
          // }
          if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            if (urlWithoutParams === 'address'){
            if(this.fromcart == "1"){
              this.router.navigate(['tabs/viewcartproduct']);
            }
            else{
              this.router.navigate(['viewsingleproduct',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart}]);
            }
            this.menu.close();
            }
            else if(urlWithoutParams === 'checkout'){
              if(this.fromcart == "1"){
                this.router.navigate(['tabs/viewcartproduct']);
              }
              else if(this.singleid != 'null'){
                this.router.navigate(['viewsingleproduct',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart}]);
              }
              else{
                this.router.navigate(['tabs/dashboard']);
              }
              this.menu.close();
            }
             
            else{
              this.category_id = localStorage.getItem('category_id');
              this.subcategory_id = localStorage.getItem('subcategory_id');
              this.subcategoryname = localStorage.getItem('subcategoryname');
              this.fromorder = localStorage.getItem('fromorder');
              this.status = localStorage.getItem('status');
              this.orderid = localStorage.getItem('singleid');
              if(urlWithoutParams == "viewsingleproduct"){
                console.log("this.category_id")
                this.category_id = localStorage.getItem('category_id');
                this.subcategory_id = localStorage.getItem('subcategory_id');
                this.subcategoryname = localStorage.getItem('subcategoryname');
                this.fromorder = localStorage.getItem('fromorder');
                this.status = localStorage.getItem('status');
                this.orderid = localStorage.getItem('singleid');
                console.log(this.subcategoryname)
                console.log(this.category_id)
                 if(this.category_id != "null" && this.category_id && this.fromorder != "1"){
                  
                  this.router.navigate(['productbycategory',{"category_id":this.category_id,"subcategoryname":this.subcategoryname,"subcategory_id":this.subcategory_id}]);
                }
                else if(this.fromorder == "1"){
                  localStorage.removeItem('category_id');
                  localStorage.removeItem('subcategory_id');
                  localStorage.removeItem('subcategoryname');
                  localStorage.removeItem('singleid');
                  localStorage.removeItem('status');
                  localStorage.removeItem('fromorder');
                  this.router.navigate(['vieworderhistory',{'orderid':this.orderid,'status':this.status}]);
                }
                else{
                  localStorage.removeItem('category_id');
                  localStorage.removeItem('subcategory_id');
                  localStorage.removeItem('subcategoryname');
                  this.router.navigate(['tabs/dashboard']);
                  localStorage.removeItem('singleid');
                  localStorage.removeItem('status');
                  localStorage.removeItem('fromorder');
                }
               
              }
              else if(urlWithoutParams == "productbycategory"){
                if(this.category_id){
                  this.category_id = localStorage.getItem('category_id');
                  this.router.navigate(['subcategorylist',{"id":this.category_id}]);
                }
                else{
                  localStorage.removeItem('category_id');
                  this.router.navigate(['tabs/viewcartproduct']);
                }
              }
              else if(urlWithoutParams == "subcategorylist"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.router.navigate(['tabs/category']);
              }
              else if(urlWithoutParams == "checkoutsuccess"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.router.navigate(['tabs/dashboard']);
              }
              else if (urlWithoutParams == "tabs/dashboard"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.menu.close();
                this.presentAlert("Exit App");
              }
              else if(urlWithoutParams == "tabs/checkout"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.router.navigate(['tabs/dashboard']);
              }
              else if(urlWithoutParams == "tabs/profile"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.router.navigate(['tabs/dashboard']);
              }
              else if(urlWithoutParams == "tabs/category"){
                localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                this.router.navigate(['tabs/dashboard']);
              }
              else{
                if(urlWithoutParams == "tabs/viewcartproduct"){
                  this.router.navigate(['tabs/dashboard']);
                }
                else{
                  if(urlWithoutParams == "tabs/category" || urlWithoutParams == "tabs/dashboard"){
                    localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
                  }
                  this.routerOutlet.pop();
                  this.menu.close();
                }
                this.menu.close();
              }
              this.menu.close();
            }
            this.menu.close();
          } else if (this.router.url === 'tabs/dashboard') {
            console.log(urlWithoutParams);
            localStorage.removeItem('category_id');
            localStorage.removeItem('subcategory_id');
            localStorage.removeItem('subcategoryname');
            localStorage.removeItem('singleid');
            localStorage.removeItem('status');
            localStorage.removeItem('fromorder');
            this.menu.close();
            // or if that doesn't work, try
            navigator['app'].exitApp();
          } else {
            if(urlWithoutParams == "tabs/viewcartproduct"){
              this.router.navigate(['tabs/dashboard']);
            }
            else if(urlWithoutParams == "tabs/profile"){
              this.router.navigate(['tabs/dashboard']);
            }
            else if(urlWithoutParams == "tabs/category"){
              this.router.navigate(['tabs/dashboard']);
            }
            else if(urlWithoutParams == "tabs/checkout"){
              this.router.navigate(['tabs/dashboard']);
            }
            else if(urlWithoutParams == "tabs/myorders"){
              this.router.navigate(['tabs/dashboard']);
            }
            else{
              localStorage.removeItem('category_id');
              localStorage.removeItem('subcategory_id');
              localStorage.removeItem('subcategoryname');
              localStorage.removeItem('singleid');
              localStorage.removeItem('status');
              localStorage.removeItem('fromorder');
            this.menu.close();
            this.presentAlert("Exit App");
            }
            this.menu.close();
          }
        });
      });
  }
  async presentAlert(message) {
    let alert  = await this.alertController.create({
      header: 'Do you want to exit the app?',
      //message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }
  logout() {
    this.events.publish('loggedout');
    localStorage.removeItem('token');
    localStorage.removeItem('cart_items');
    this.menu.close();
    this.router.navigate(['']);
    this.login_status = true;

}
login(){
  this.menu.close();
  this.router.navigate(['checkout']);
}
changepassword(){
  this.router.navigate(['changepasword']);
  this.menu.close();
}
getmyorders(){
  this.router.navigate(['tabs/myorders']);
  this.menu.close();
}
home(){
  this.router.navigate(['tabs/dashboard']);
  this.menu.close();
}
viewaccount(){
  this.router.navigate(['tabs/dashboard']);
  this.menu.close();
}
shopbycategory(){
  this.router.navigate(['tabs/category']);
  this.menu.close();
}

}
