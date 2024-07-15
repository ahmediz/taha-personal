import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { getAuth, signInAnonymously } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
type Page = {
  id: string;
  title: string;
  bgPatternImg: string;
  description: string;
  color: string;
  darkerColor: string;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  pagesList$: Observable<Page[]>;
  firestore = inject(Firestore);
  router = inject(Router);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navSpeed: 1000,
    navText: ['', ''],
    items:1,
    nav: true,
  };

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        take(1),
        switchMap((_) => {
          const auth = getAuth();
          return signInAnonymously(auth);
        })
      )
      .subscribe((res) => console.log(res));

    const itemCollection = collection(this.firestore, 'pages');
    const q = query(itemCollection, orderBy('order'));
    this.pagesList$ = collectionData(q, {
      idField: 'id',
    }).pipe(map((res) => res as Page[]));
  }

  hexToCssHsl(hex: string, valuesOnly = false, type?: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    if (!result) {
      return '';
    }
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = '';
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h! /= 6;
    }

    h = Math.round(h! * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    if (type === 'darker') {
      l = l - 60;
    } else if (type === 'lighter') {
      l = l - 50;
    }

    cssString = h + ',' + s + '%,' + l + '%';
    cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;

    return cssString;
  }
}
