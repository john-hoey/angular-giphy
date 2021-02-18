import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GifHubService } from '../gif-hub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //when the component is loaded. for a moment, there is no gifData. Until the response comes back, there is nothing set for gifData. fix that with the ? in *ngFor="let gif of gifData?.data"> in home.component.html
  gifData: any;
  favorites: any[] = [];

  constructor(private gifService: GifHubService) {}

  ngOnInit(): void {
    this.getAndSetFavorites();
    this.getTrending();
  }

  getTrending = (): void => {
    this.gifService.getTrendingGifs().subscribe((response: any) => {
      console.log(response);
      this.gifData = response;
    });
  };
  // return type void because we are just setting gifData. when you set you dont need a type where you would when you are getting.
  onSubmit = (searchTerm: string): void => {
    this.gifService.searchGifs(searchTerm).subscribe((response: any) => {
      this.gifData = response;
    });
  };

  onFavorite = (gif: any): void => {
    this.gifService.addFavorite(gif);
    this.getAndSetFavorites();
  };

  getAndSetFavorites = (): void => {
    this.favorites = this.gifService.getFavorites();
  };
}
