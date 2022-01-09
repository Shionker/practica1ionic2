import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
   { path: 'tab4',
      loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
    },
    {
      path: 'login',
      loadChildren: () => import('../app/login/login.module').then(m => m.LoginPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
