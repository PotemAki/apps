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
  filteredOptions: Observable<string[]>;

  constructor(private weatherService: WeatherService) {}

  weatherData?: WeatherData;
  icon = '';

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.weatherService.getData(this.city).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.icon = response.current.condition.icon;
      },
    });
    this.city = '';
  }
  onSubmit() {
    this.city = this.myControl.value
    this.weatherService.getData(this.city).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.icon = response.current.condition.icon;
      },
    });
    this.city = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
