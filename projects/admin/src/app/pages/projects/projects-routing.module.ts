import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: ProjectFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProjectFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
