import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./app/login/login.module').then( m => m.LoginPageModule)
  },
  {    path: 'tabs',
   loadChildren:() => import('./tabs/tabs.module').then(m=>m.TabsPageModule),
   
  },
  
  {
    path: 'rondas',
    loadChildren: () => import('./modals/rondas/rondas.module').then( m => m.RondasPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  {
    path: 'out',
    loadChildren: () => import('./modals/out/out.module').then( m => m.OutPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
