import { Component, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
      await updateDoc(docRef, this.pageForm.value);
      this.router.navigateByUrl('/pages');
    } else {
      await addDoc(collection(this.firestore, 'pages'), this.pageForm.value);
      this.router.navigateByUrl('/pages');
    }
  }
}
