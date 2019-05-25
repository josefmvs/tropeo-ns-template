import { NgModule } from '@angular/core';
// import { Routes } from '@angular/router';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', loadChildren: '~/app/dashboard/dashboard.module#DashboardModule' },
	{ path: 'home', loadChildren: '~/app/home/home.module#HomeModule' },
	{ path: 'browse', loadChildren: '~/app/browse/browse.module#BrowseModule' },
	{ path: 'search', loadChildren: '~/app/search/search.module#SearchModule' },
	{ path: 'featured', loadChildren: '~/app/featured/featured.module#FeaturedModule' },
	{ path: 'settings', loadChildren: '~/app/settings/settings.module#SettingsModule' },
	{ path: 'contact', loadChildren: '~/app/contact/contact.module#ContactModule' }
];

@NgModule({
	imports: [ NativeScriptRouterModule.forRoot(routes) ],
	exports: [ NativeScriptRouterModule ]
})
export class AppRoutingModule {}
