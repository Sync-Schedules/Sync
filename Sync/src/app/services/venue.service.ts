import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Venue} from "../models/venue.model";

@Injectable()
export class VenueService {

  private serviceUrl = 'http://localhost:3000/venues/venues';

  constructor(private http: HttpClient) { }

  getVenue(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.serviceUrl);
  }

}
