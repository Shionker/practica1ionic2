import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RondasPage } from './rondas.page';

const routes: Routes = [
  {
    path: '',
    component: RondasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RondasPageRoutingModule {}
