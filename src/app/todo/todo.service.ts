import { Injectable } from "@angular/core";
import { ToDo } from "./todo.model";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({ providedIn: 'root' })
export class ToDoService {
  public todo: ToDo[] = [
    {text: 'Go to church', date: 'Sat Nov 25 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)', id: 'IaMivtYPKPUbIqF', group:"abcdef"},
    {text: 'Go to shopping', date: 'Sat Nov 26 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)', id: 'IaMivtYPKPUbIqF', group:"abcdef"},
    {text: 'Dentist appoitment', date: 'Sat Nov 29 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)', id: 'IaMivtYPKPUbIqF', group:"abcdef"}
  ]

  public todoSubject: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  
  public archive: ToDo[] = [{text: 'Visit a friend', date: 'Sat Nov 25 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)', id: 'IaMivtYPKPUbIqF', group:"abcdef", doneDate: 'Sat Nov 19 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)' }]

  public archiveSubject: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);

  observe() {
    const archiveData = JSON.parse(localStorage.getItem('archive'))
    if (archiveData) {
      this.archive = archiveData
      this.archiveSubject.next(this.archive)
    } else {
      this.archiveSubject.next(this.archive)
    }
    const todoData = JSON.parse(localStorage.getItem('todo'))
    if (todoData) {
      this.todo = todoData
      this.todoSubject.next(this.todo)
    } else {
      this.todoSubject.next(this.todo)
    }

  }
  addTodo(text: string, date: string, id: string, group: string) {
    this.todo.push({text: text, date: date, id: id, group: group})
    localStorage.removeItem('todo')
    localStorage.setItem('todo', JSON.stringify(this.todo))
    this.observe()
  }
  updateElements(todo: object, archive:object) {
    localStorage.removeItem('todo')
    localStorage.setItem('todo', JSON.stringify(todo))
    localStorage.removeItem('archive')
    localStorage.setItem('archive', JSON.stringify(archive))
    this.observe()
  }
  updatedGroupsUpdate(id: string) {
    this.todo = this.todo.filter(group => group.group !== id);
    this.archive = this.archive.filter(group => group.group !== id);
    this.updateElements(this.todo, this.archive)
  }
}