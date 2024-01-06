import { Component, OnInit } from '@angular/core';
import { WeatherData } from './weather.model';
import { WeatherService } from './weather.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css'],
})
export class WeatherAppComponent implements OnInit {
  city: string = 'Warsaw';
  myControl = new FormControl('');
  options: string[] = [
    'Cracow',
    'Warsaw',
    'Tokyo',
    'New York',
    'London',
    'Paris',
    'Beijing',
    'Sydney',
    'Rio de Janeiro',
    'Mumbai',
    'Cape Town',
    'Dubai',
    'Rome',
    'Moscow',
    'Toronto',
    'Los Angeles',
    'Berlin',
  ];
  options2: string[] = this.options;
  error = ''

  constructor(private weatherService: WeatherService) {}

  weatherData?: WeatherData;
  icon = '';

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe(newValue=>{
      this.options = this.filterValues(newValue);
  })
    this.weatherService.getData(this.city).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.icon = response.current.condition.icon;
        this.error = ''
      },
      error: (error) => {
        if (error.error.error.message) {
          this.error = error.error.error.message
        } else {
          this.error = 'Error fetching weather data'
        }
      },
    });
    
  }
  filterValues(search: string) {
    return this.options2.filter(value=>
    value.toLowerCase().indexOf(search.toLowerCase()) === 0);
}
  onSubmit() {
    this.city = this.myControl.value;
    this.weatherService.getData(this.city).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.icon = response.current.condition.icon;
        this.error = ''
      },
      error: (error) => {
        if (error.error.error.message) {
          this.error = error.error.error.message
        } else {
          this.error = 'Error fetching weather data'
        }
      },
    });
    this.city = '';
  }

}
