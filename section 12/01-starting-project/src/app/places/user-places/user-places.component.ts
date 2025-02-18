import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  resData = this.placesService.loadedUserPlaces;

  ngOnInit() {
    const sub = this.placesService.loadUserPlaces().subscribe();

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
  onSelectPlace(place: Place) {
    const del = this.placesService.removeUserPlace(place).subscribe();
  }
}
