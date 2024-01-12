import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {

    // This code my was adjusted from vanilla JS to work on angular becouse this was originally one of my vanilla JS projects that i have decided to implement into bigger angular project.



  number = '0';
  miliSeconds = 0;
  seconds = 0;
  minutes = 0;
  value = '';
  clockId: any;
  index = 0;
  tempMessage: any;
  recordsArray = []

  ngOnInit() {
    this.render();
  }

  ngOnDestroy() {
    clearInterval(this.clockId);
  }

  startCounting() {
    clearInterval(this.clockId);
    this.clockId = setInterval(() => {
      this.miliSeconds += 1;
      if (this.miliSeconds >= 100) {
        this.miliSeconds = 0;
        this.seconds += 1;
      } else if (this.seconds >= 60) {
        this.minutes += 1;
        this.seconds = 0;
      }
      this.render();
    }, 10);
  }

  stopCounting() {
    clearInterval(this.clockId);
  }

  resetCounting() {
    clearInterval(this.clockId);
    this.miliSeconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.render();
    this.recordsArray = []
    this.index = 0;
  }

  flagCounting() {
    if (this.index >= 10) {
      clearTimeout(this.tempMessage);
      document.querySelector('.temp-message').innerHTML = 'This is the maximum you can save!';
      this.tempMessage = setTimeout(() => {
        document.querySelector('.temp-message').innerHTML = '';
      }, 2000);
      return;
    }
    this.index += 1;
    let record = `${this.index}: ${this.value}`;
    this.recordsArray.push(record)
  }

  render() {
    let miliSeconds2 = this.miliSeconds.toString().padStart(2, '0');
    let seconds2 = this.seconds.toString().padStart(2, '0');
    let minutes2 = this.minutes.toString().padStart(2, '0');

    this.value = `${minutes2}:${seconds2}.${miliSeconds2}`;
    this.number = this.value;
  }
  
}
