// home.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation }        from '../housingLocation';
import { HousingService }         from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent],
  template: `
    <section class="search-section">
      <form class="search-form" (ngSubmit)="applyFilter()">
        <input
          [(ngModel)]="searchTerm"
          name="search"
          type="text"
          placeholder="e.g. housing CA"
          autocomplete="off"
        >
        <button type="submit" class="primary">Search</button>
        <button type="button" class="secondary" (click)="clearFilter()">
          Clear
        </button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let location of filteredLocationList"
        [housingLocation]="location">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm = '';
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  private housingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations()
      .then(list => {
        this.housingLocationList  = list;
        this.filteredLocationList = list;
      });
  }

  applyFilter(): void {
    // normalize and split into non-empty tokens
    const term   = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    const tokens = term.split(/\s+/).filter(t => t.length > 0);

    this.filteredLocationList = this.housingLocationList.filter(loc => {
      // pre‑lowercase each field once per location for performance
      const name  = loc.name.toLowerCase();
      const city  = loc.city.toLowerCase();
      const state = loc.state.toLowerCase();

      // every token must match at least one field
      return tokens.every(token =>
        name.includes(token) ||
        city.includes(token) ||
        state.includes(token)
      );
    });
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.filteredLocationList = this.housingLocationList;
  }
}
