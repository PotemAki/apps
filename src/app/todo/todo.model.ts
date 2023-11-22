export interface ToDo {
  text: string;
  date: string;
  id: string;
  group?: string;
  doneDate?: string;
}

export interface Group {
  name: string;
  id: string
}
