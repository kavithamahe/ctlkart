import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  { path: 'checkout', 
  loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  { path: 'onboard', 
  loadChildren: () => import('./onboard/onboard.module').then(m => m.OnboardPageModule)
  },
  { path: 'viewsingleproduct', 
  loadChildren: () => import('./viewsingleproduct/viewsingleproduct.module').then(m => m.ViewsingleproductPageModule)
  },
  { path: 'productbycategory', 
  loadChildren: () => import('./productbycategory/productbycategory.module').then(m => m.ProductbycategoryPageModule)
  },
  { path: 'proceedcheckout', 
  loadChildren: () => import('./proceedcheckout/proceedcheckout.module').then(m => m.ProceedcheckoutPageModule)
  },
  { path: 'changepasword', 
  loadChildren: () => import('./changepasword/changepasword.module').then(m => m.ChangepaswordPageModule)
  },
  { path: 'myorders', 
  loadChildren: () => import('./myorders/myorders.module').then(m => m.MyordersPageModule)
  },
  { path: 'editprofile', 
  loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },
  { path: 'subcategorylist', 
  loadChildren: () => import('./subcategorylist/subcategorylist.module').then(m => m.SubcategorylistPageModule)
  },
  { path: 'otpverification', 
  loadChildren: () => import('./otpverification/otpverification.module').then(m => m.OtpverificationPageModule)
  },
  { path: 'address', 
  loadChildren: () => import('./address/address.module').then(m => m.AddressPageModule)
  },
  { path: 'vieworderhistory', 
  loadChildren: () => import('./vieworderhistory/vieworderhistory.module').then(m => m.VieworderhistoryPageModule)
  },
  { path: 'addaddress', 
  loadChildren: () => import('./addaddress/addaddress.module').then(m => m.AddaddressPageModule)
  },
  { path: 'getaddress', 
  loadChildren: () => import('./getaddress/getaddress.module').then(m => m.GetaddressPageModule)
  },
  { path: 'forgetpassword', 
  loadChildren: () => import('./forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordPageModule)
  },
  { path: 'checkoutsuccess', 
  loadChildren: () => import('./checkoutsuccess/checkoutsuccess.module').then(m => m.CheckoutsuccessPageModule)
  },
  { path: 'childcategory', loadChildren: './childcategory/childcategory.module#ChildcategoryPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
