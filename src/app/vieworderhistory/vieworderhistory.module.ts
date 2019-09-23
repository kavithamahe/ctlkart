import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { IonicRatingModule } from 'ionic-rating';
import { IonicRatingModule } from 'ionic4-rating';

import { IonicModule } from '@ionic/angular';

import { VieworderhistoryPage } from './vieworderhistory.page';

const routes: Routes = [
  {
    path: '',
    component: VieworderhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VieworderhistoryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VieworderhistoryPageModule {}
