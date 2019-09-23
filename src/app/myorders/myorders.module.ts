import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyordersPage } from './myorders.page';
import { ProductPipeModule } from '../pipes/productPipe.module';

const routes: Routes = [
  {
    path: '',
    component: MyordersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyordersPage]
})
export class MyordersPageModule {}
