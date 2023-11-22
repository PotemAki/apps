import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Group } from "../todo.model";

@Injectable({ providedIn: 'root' })
export class MenuService {
  public activeGroup: BehaviorSubject<string> = new BehaviorSubject<string>('abcdef');
  groups: Group[] = [{name:'Main', id:"abcdef"}]
  public groupsSubject: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);

  observerMenu() {
    const groupsData = JSON.parse(localStorage.getItem('groups'))
    if (groupsData) {
      this.groups = groupsData
      this.groupsSubject.next(this.groups)
    } else {
      this.groupsSubject.next(this.groups)
    }
  }
  selectGroup(group:any) {
    this.activeGroup.next(group.id)
  }
  createGroup(name: string, id: string) {
    this.groups.push({name: name, id: id})
    localStorage.removeItem('groups')
    localStorage.setItem('groups', JSON.stringify(this.groups))
    this.observerMenu()
    this.activeGroup.next(id)
  }
  updateGroups(groups: object) {
    localStorage.removeItem('groups')
    localStorage.setItem('groups', JSON.stringify(groups))
    this.observerMenu()
  }
}