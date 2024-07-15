import { Component, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, switchMap, take, tap } from 'rxjs';
type Page = {
  id: string;
  bgPatternImg: string;
  title: string;
  description: string;
  color: string;
  darkerColor: string;
};

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.scss',
})
export class PageFormComponent {
  route = inject(ActivatedRoute);
  pageForm: FormGroup;
  fb = inject(FormBuilder);
  firestore = inject(Firestore);
  router = inject(Router);
  page: Signal<Page | null>;
  pageId: string;
  formReady: boolean;
  hasFile: boolean;

  constructor() {
    this.page = toSignal(
      this.route.params.pipe(
        switchMap((params: any) => {
          this.pageId = params.id;
          const docRef = doc(this.firestore, `pages/${params.id}`);
          return docData(docRef);
        })
      )
    ) as Signal<Page>;

    effect(() => {
      if (this.page()) {
        this.initForm();
        return;
      }
      this.initForm();
      this.formReady = true;
    });
  }

  initForm(): void {
    let title;
    let description;
    let color;
    let darkerColor;

    if (this.page) {
      if (
        this.page()?.bgPatternImg &&
        typeof this.page()?.bgPatternImg == 'string'
      ) {
        this.hasFile = false;
      } else {
        this.hasFile = true;
      }
      title = this.page()?.title;
      description = this.page()?.description;
      color = this.page()?.color;
      darkerColor = this.page()?.darkerColor;
    }
    this.pageForm = this.fb.group({
      bgPatternImg: ['', Validators.required],
      title: [title, Validators.required],
      description: [description, Validators.required],
      color: [color, Validators.required],
      darkerColor: [darkerColor, Validators.required],
    });
  }

  async submit(): Promise<void> {
    if (this.page()) {
      const docRef = doc(this.firestore, `pages/${this.pageId}`);
      const formValue = {
        ...this.pageForm.value,
        bgPatternImg: this.pageForm.value.bgPatternImg ? this.pageForm.value.bgPatternImg : this.page()?.bgPatternImg
      }
      await updateDoc(docRef, formValue);
      this.router.navigateByUrl('/pages');
    } else {
      const itemCollection = collection(this.firestore, 'pages');
      const pagesLength = await firstValueFrom(
        collectionData(itemCollection).pipe(map((res) => res.length))
      );
      await addDoc(collection(this.firestore, 'pages'), {
        ...this.pageForm.value,
        order: pagesLength + 1,
      });
      this.router.navigateByUrl('/pages');
    }
  }
}
