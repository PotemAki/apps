import { Component, OnInit } from '@angular/core';
import { ToDoService } from './todo/todo.service';
import { MenuService } from './todo/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apps';

  constructor (private todoService: ToDoService, private menuService: MenuService) { }

  ngOnInit() {
    this.todoService.observe()
    this.menuService.observerMenu()
  }
}
