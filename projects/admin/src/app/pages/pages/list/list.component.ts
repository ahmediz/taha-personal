import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Page = {
  id: string;
  title: string;
  description: string;
  color: string;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  pagesList$: Observable<Page[]>;
  firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'pages');
    this.pagesList$ = collectionData(itemCollection, {
      idField: 'id',
    }).pipe(map((res) => res as Page[]));
  }
}
