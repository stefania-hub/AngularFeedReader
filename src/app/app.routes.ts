import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth-guard';
import { RegisterComponent } from './components/register-component/register-component';
import { Component } from '@angular/core';
import { NewFeedComponent } from './components/new-feed-component/new-feed-component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'new', component: NewFeedComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
