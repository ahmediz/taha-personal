import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class CoreModule {}
