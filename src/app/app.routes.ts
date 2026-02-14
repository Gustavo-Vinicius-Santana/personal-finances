import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'recover-account',
        component: RecoverAccountComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];
