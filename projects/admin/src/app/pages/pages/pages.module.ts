import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CoreModule } from '../../shared/modules/core.module';
import { RouterLink } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PageFormComponent } from './page-form/page-form.component';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { InputFieldComponent } from "../../shared/components/input-field/input-field.component";

@NgModule({
  declarations: [ListComponent, PageFormComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule, RouterLink, ButtonComponent, InputFieldComponent],
})
export class PagesModule {}
