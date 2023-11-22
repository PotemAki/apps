import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './simple-apps/main.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherAppComponent } from './weather-app/weather-app.component';

const routes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: 'apps', component: MainComponent },
  { path: 'weather', component: WeatherAppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
