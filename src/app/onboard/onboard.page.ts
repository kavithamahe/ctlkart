import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  constructor(public router: Router,public events: Events) { }

  ngOnInit() {
  }
  gettingstarted(){
    this.router.navigate(['']);
    this.events.publish('onboard');
  }
  signup(){
    this.router.navigate(['register',{"onboard":"1"}]);
    // this.events.publish('onboard');
  }
}
