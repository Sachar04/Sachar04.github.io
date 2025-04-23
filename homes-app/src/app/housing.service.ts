import { Injectable } from '@angular/core';
import { HousingLocation } from './housingLocation';
import { housingLocations } from './staticHousingLocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // unsimment commented line and replace return statements for fetching data from a backend json file url
  // url = 'http://localhost:3000/locations'; 
  constructor() { }

  async getAllHousingLocations() : Promise<HousingLocation[]> {
    // const data = await fetch(this.url);
    // return await data.json() ?? [];
    return Promise.resolve(housingLocations);
  }
  
  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined> {
    // const data = await fetch(`${this.url}/${id}`);
    // return await data.json() ?? {};
    return Promise.resolve(housingLocations.find(location => location.id === id))
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email)
  }
}
