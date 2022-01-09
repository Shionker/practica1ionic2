import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'tab1',
        children: [{
          path:'',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
        }]
      },
      
      {
        path: 'tab2',
        children: [{
          path:'',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
        }]
      },
      {
        path: 'tab3',
        children: [{
          path:'',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
        }]
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tab4',
    children: [{
      path:'',
    loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
