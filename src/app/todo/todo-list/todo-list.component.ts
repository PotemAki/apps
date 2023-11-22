import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDo } from '../todo.model';
import { ToDoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy{
  isTimeOut: any;
  message = '';
  isDragging = false;
  todo: ToDo[] = []
  archive: ToDo[] = [];
  deleted = []
  activatedGroup: any;
  private todoSub: Subscription
  private archiveSub: Subscription
  dragId = '';

  constructor(public todoService: ToDoService, public menuService: MenuService) { }

  ngOnInit() {
    this.todoSub = this.todoService.todoSubject.subscribe((todos) => {
      this.todo = todos
    });
    this.archiveSub = this.todoService.archiveSubject.subscribe((archives) =>{
      this.archive = archives
    })
    this.menuService.activeGroup.subscribe((active) =>{
      this.activatedGroup = active
    })
  }

  dropOnToDo(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.infoTimeout(`you can't move it back here!`)
    }
  }

  dropOnArchive(event: CdkDragDrop<string[]>) {
    const index = this.todo.findIndex(todo => todo.id === this.dragId);
    if (index !== -1) {
      const movedElement = this.todo.splice(index, 1)[0];
      const nowDate = new Date()
      movedElement.doneDate = nowDate.toString();
      this.archive.push(movedElement);
    } 
    this.todoService.updateElements(this.todo, this.archive)
  }

  dropDelete(event: CdkDragDrop<string[]>) {
    const index = this.todo.findIndex(todo => todo.id === this.dragId);
    const indexArchive = this.archive.findIndex(archive => archive.id === this.dragId);
    if (index !== -1) {
      this.todo.splice(index, 1)[0];
    }
    if (indexArchive !== -1) {
      this.archive.splice(index, 1)[0];
    } 
    this.todoService.updateElements(this.todo, this.archive)
  }

  infoTimeout(text: string) {
    this.message = text
    clearTimeout(this.isTimeOut)
    this.isTimeOut = setTimeout(() => {
    this.message = '';
  }, 1000);
  }

  dragStarted(event: CdkDragStart, item) {
    this.isDragging = true;
    this.dragId = item.id
  }

  dragEnded(event: CdkDragEnd, item) {
    this.isDragging = false;
  }
  isEmptyGroup() {
    const index = this.todo.findIndex(todo => todo.group === this.activatedGroup);
    const index2 = this.archive.findIndex(archive => archive.group === this.activatedGroup);
    if ((index !== -1) || (index2 !== -1)) {
      return false
    } else {
      return true
    }
  }

  ngOnDestroy() {
    this.archiveSub.unsubscribe()
    this.todoSub.unsubscribe()
  }
}