import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../todo.service';
import { Group } from '../todo.model';
import { MenuService } from './menu.service';
import { DialogService } from './dialog/dialog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  toDoForm: FormGroup
  groups: Group[] = [{name:'Main', id:"abcdef"}]
  activatedGroup = 'abcdef'
  showConfirmationDialog = false;
  isTimeOut: any;
  message = '';
  groupId = '';

  constructor(public todoService: ToDoService, public menuService: MenuService, public dialogService: DialogService) { }

  ngOnInit() {
    this.toDoForm = new FormGroup({
      'todo': new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(null, {validators: [Validators.required]})
    })
    this.menuService.activeGroup.subscribe((active) =>{
      this.activatedGroup = active
    })
    this.menuService.groupsSubject.subscribe((groups) =>{
      this.groups = groups
    })
  }
  reset() {
    this.toDoForm.reset()
  }
  addToDo(){
    if (!this.toDoForm.value.todo) {
      return
    }
    if (!this.toDoForm.value.date) {
      return
    }
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 15) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.todoService.addTodo(
      this.toDoForm.value.todo, 
      this.toDoForm.value.date.toString(),
      result,
      this.activatedGroup)
  }
  toGroup(item: any) {
    if (item.id === this.activatedGroup) {
      return
    }
    this.menuService.selectGroup(item)
  }
  addGroup() {
    if (this.groups.length >= 5) {
      this.infoTimeout(`You can't add more than 5 groups!`)
      return
    }
    this.dialogService.openDialog()
  }
  cancelDelete() {
    this.showConfirmationDialog = false;
  }
  openDeleteGroupDialog(id: string) {
    this.groupId = id
    this.showConfirmationDialog = true
  }

  deleteGroup() {
    const index = this.groups.findIndex(group => group.id === this.groupId);
    
    if (index !== -1) {
      this.groups.splice(index, 1)[0];
      this.menuService.updateGroups(this.groups)
      this.todoService.updatedGroupsUpdate(this.groupId)
      this.menuService.activeGroup.next('abcdef')
    }
    this.showConfirmationDialog = false;
  }
  infoTimeout(text: string) {
    this.message = text
    clearTimeout(this.isTimeOut)
    this.isTimeOut = setTimeout(() => {
    this.message = '';
  }, 1000);
  }
}
