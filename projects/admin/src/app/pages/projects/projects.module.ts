import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { CoreModule } from '../../shared/modules/core.module';
import { RouterLink } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  declarations: [ListComponent, ProjectFormComponent],
  imports: [CommonModule, ProjectsRoutingModule, CoreModule, RouterLink],
})
export class ProjectsModule {}
