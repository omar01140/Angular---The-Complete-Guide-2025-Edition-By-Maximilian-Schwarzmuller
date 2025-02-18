import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal<string | undefined>(undefined);
  private placesServices = inject(PlacesService)
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const sub =this.placesServices.loadAvailablePlaces()
      .subscribe({
        next: (resData) => {
          this.places.set(resData);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
      const sub= this.placesServices.addPlaceToUserPlaces(place).subscribe({
        next: (res) => console.log(res),
      });

      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
      });
  }
}
