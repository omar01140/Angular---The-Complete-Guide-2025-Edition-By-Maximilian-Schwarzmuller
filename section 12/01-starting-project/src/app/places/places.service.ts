import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchedPlaces(
      'http://localhost:3000/places',
      'SomeThing wrong happend, please try again later'
    );
  }

  loadUserPlaces() {
    return this.fetchedPlaces(
      'http://localhost:3000/user-places',
      'SomeThing wrong happend, please try again later'
    ).pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        },
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update((p) => [...p, place]);
    }
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place.');
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    this.userPlaces.set(this.userPlaces().filter((p) => p.id !== place.id));

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to delete selected place.');
          return throwError(
            () => new Error('Failed to delete selected place.')
          );
        })
      );
  }

  private fetchedPlaces(url: string, errorMsg: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((res) => res.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
