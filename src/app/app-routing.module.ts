import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './simple-apps/main.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherAppComponent } from './weather-app/weather-app.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  { path: '', redirectTo: '/todo',  pathMatch: 'full' },
  { path: 'todo', component: TodoComponent },
  { path: 'tools', component: MainComponent },
  { path: 'weather', component: WeatherAppComponent },
  { path: 'game', component: GamesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
