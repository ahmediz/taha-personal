import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
type Page = {
  id: string;
  title: string;
  description: string;
  color: string;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pagesList$: Observable<Page[]>;
  firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'pages');
    this.pagesList$ = collectionData(itemCollection, {
      idField: 'id',
    }).pipe(map((res) => res as Page[]));
  }
}
