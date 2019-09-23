import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutsuccess',
  templateUrl: './checkoutsuccess.page.html',
  styleUrls: ['./checkoutsuccess.page.scss'],
})
export class CheckoutsuccessPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
                    localStorage.removeItem('category_id');
                    localStorage.removeItem('subcategory_id');
                    localStorage.removeItem('subcategoryname');
                    localStorage.removeItem('singleid');
                    localStorage.removeItem('status');
                    localStorage.removeItem('fromorder');
  }
  continueshopping(){
    this.router.navigate(['']);
  }
}
