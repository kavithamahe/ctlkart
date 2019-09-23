import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckoutsuccessPage } from './checkoutsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutsuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckoutsuccessPage]
})
export class CheckoutsuccessPageModule {}
