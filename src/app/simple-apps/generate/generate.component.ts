import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
  color = '#FAEBD7';
  colorPool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  isTimeOut: any;
  message = '';
  @Output() generateColor = new EventEmitter<string>();

  generate() {
    let generatedColor = '#';
    for (let i = 0; i<6; i++) {
        generatedColor += this.colorPool[
            Math.floor(Math.random() * this.colorPool.length)]
    }
    this.color = generatedColor
    this.generateColor.emit(generatedColor)
  }
  infoTimeout() {
    this.message = 'copied!'
    clearTimeout(this.isTimeOut)
    this.isTimeOut = setTimeout(() => {
    this.message = '';
  }, 1000);
  }
}
