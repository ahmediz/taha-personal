import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { DndDropEvent } from 'ngx-drag-drop';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

type Page = {
  id: string;
  title: string;
  description: string;
  color: string;
  order: number;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  pagesList = signal<Page[]>([]);
  firestore = inject(Firestore);

  onDragEnd(event: DragEvent) {
    console.log('drag ended', JSON.stringify(event, null, 2));
  }

  async onDrop(event: DndDropEvent) {
    const dropped = event.data;
    let moved = this.pagesList()[event.index!];

    if (!moved) {
      moved = this.pagesList()[this.pagesList().length - 1];
    }

    moved.order = dropped.order;
    dropped.order = event.index! + 1;

    // Updating dropped
    const docRef1 = doc(this.firestore, `pages/${dropped.id}`);
    await updateDoc(docRef1, {
      order: dropped.order,
    });

    // Updating Moved
    const docRef2 = doc(this.firestore, `pages/${moved.id}`);
    await updateDoc(docRef2, {
      order: moved.order,
    });
  }

  constructor() {
    const itemCollection = collection(this.firestore, 'pages');
    const q = query(itemCollection, orderBy('order'));
    collectionData(q, {
      idField: 'id',
    })
      .pipe(
        map((res) => res as Page[]),
        tap((res) => this.pagesList.set(res))
      )
      .subscribe();
  }

  deletePage(ev: any, id: string): void {
    ev.preventDefault();
    ev.stopPropagation();
    const docRef = doc(this.firestore, `pages/${id}`);
    deleteDoc(docRef);
  }
}
