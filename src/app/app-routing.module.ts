import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), 
  }, 
  { 
    path: 'components',
    loadChildren: ()=> import('./components/components.module').then(m=> m.ComponentsModule), 
  },
  {
    path: '', 
    redirectTo: 'components', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
