import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

    // This code my was adjusted from vanilla JS to work on angular becouse this was originally one of my vanilla JS projects that i have decided to implement into bigger angular project.


  previousText: string = '';
  currentText: string = '';
  operator: string = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      this.addOperator(event.key);
    } else if (event.key === '=' || event.key === 'Enter') {
      this.resultMath();
    } else if (event.key === 'Backspace') {
      this.delete();
    } else if (event.key === 'Delete') {
      this.clear();
    } else if (!isNaN(parseFloat(event.key))) {
      this.addNumber(event.key);
    }
  }

  clear() {
    this.currentText = '';
    this.previousText = '';
    this.operator = '';
  }

  delete() {
    if (this.currentText === '') {
      return;
    }
    this.currentText = this.currentText.slice(0, -1);
  }

  addNumber(number: string) {
    if (isNaN(parseFloat(this.currentText))) {
      this.currentText = '';
    }
    if (this.currentText.length >= 15) {
      return;
    }
    if (number === '0' && this.currentText === '0') {
      return;
    }
    if (number === '.' && this.currentText === '') {
      return;
    }
    if (number === '.' && this.currentText.includes('.')) {
      return;
    }
    this.currentText += number;
  }

  addOperator(operator: string) {
    if (isNaN(parseFloat(this.currentText))) {
      this.currentText = '';
    }
    if (this.currentText === '') {
      return;
    }
    if (this.operator !== '' && this.currentText === '') {
      return;
    }
    if (this.operator !== '' && this.previousText !== '') {
      this.resultMath();
      return;
    }
    this.operator = operator;
    this.previousText = `${this.currentText} ${this.operator}`;
    this.currentText = '';
  }


  resultMath() {
    if (this.previousText === '' || this.currentText === '') {
      return;
    }
    const prev = parseFloat(this.previousText);
    const curr = parseFloat(this.currentText);

    switch (this.operator) {
      case '+':
        this.currentText = (prev + curr).toString();
        break;
      case '-':
        this.currentText = (prev - curr).toString();
        break;
      case '*':
        this.currentText = (prev * curr).toString();
        break;
      case '/':
        if (curr === 0) {
          this.currentText = `Don't do that!`;
        } else {
          this.currentText = (prev / curr).toString();
        }
        break;
      default:
        break;
    }
    
    this.previousText = '';
  }
}