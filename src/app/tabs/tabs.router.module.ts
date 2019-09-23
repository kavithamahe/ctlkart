import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../category/category.module').then(m => m.CategoryPageModule)
          }
        ]
      },
      {
        path: 'viewcartproduct',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../viewcartproduct/viewcartproduct.module').then(m => m.ViewcartproductPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'checkout',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../checkout/checkout.module').then(m => m.CheckoutPageModule)
          }
        ]
      },
      {
        path: 'myorders',
        children: [
          {
            path: '',
            loadChildren: () =>
             import('../myorders/myorders.module').then(m => m.MyordersPageModule)
          }
        ]
      },
      {
        path: 'editprofile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../editprofile/editprofile.module').then(m => m.EditprofilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
