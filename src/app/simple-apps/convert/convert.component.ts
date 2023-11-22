import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent {
  valueC = '';
  valueF = '';
  valueKG = '';
  valueLBS = '';
  valueKM = '';
  valueMI = '';
  outputF = 32;
  outputC = 0;
  outputLBS = 2.2;
  outputKG = 1;
  outputMI = 0.62
  outputKM = 1.61
  isTimeOut: any;
  message = '';

  reset() {
    this.valueC = '';
    this.valueF = '';
    this.valueKG = '';
    this.valueLBS = '';
    this.valueKM = '';
    this.valueMI = '';
    this.outputF = 32;
    this.outputC = 0;
    this.outputLBS = 2.2;
    this.outputKG = 1;
    this.outputMI = 0.62
    this.outputKM = 1.61
  }
  convert() {
    if(this.valueC) {
      this.outputF = Math.round((+this.valueC * 9/5 + 32) *100) /100
    }
    if(this.valueF) {
      this.outputC = Math.round(((+this.valueF - 32) * 5/9) * 100) /100
    }
    if(this.valueKG) {
      this.outputLBS = Math.round((+this.valueKG * 2.2046) * 100) /100
    }
    if(this.valueLBS) {
      this.outputKG = Math.round((+this.valueLBS / 2.2046) * 100) /100
    }
    if(this.valueKM) {
      this.outputMI = Math.round((+this.valueKM * 0.62137) * 100) /100
    }
    if(this.valueMI) {
      this.outputKM = Math.round((+this.valueMI * 1.60934) * 100) /100
    }
    this.infoTimeout()
  }
  
  infoTimeout() {
    this.message = 'done!'
    clearTimeout(this.isTimeOut)
    this.isTimeOut = setTimeout(() => {
    this.message = '';
  }, 1000);
  }
}
