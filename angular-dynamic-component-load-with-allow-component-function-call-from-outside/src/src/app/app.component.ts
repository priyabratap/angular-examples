import { Component, OnInit, ComponentFactoryResolver,ViewChild,NgZone } from '@angular/core';
import { AdDirective } from './ad.directive';
import { AdService }         from './ad.service';
import { AdItem }            from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ad-banner [ads]="ads" ad-host></app-ad-banner>
      <button (click)="changeme(3)">change</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  ads: AdItem[];
@ViewChild(AdDirective) adHost: AdDirective;
  constructor(private adService: AdService,private componentFactoryResolver: ComponentFactoryResolver,private zone: NgZone,) {
 window['angularComponentReference'] = {
            zone: this.zone,
            componentFn: () => this.changeme(),
            component: this,
        };

  }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
  changeme(){
    //peejay
      //this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[3];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/