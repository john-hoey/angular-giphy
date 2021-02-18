import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifHubService {
  apiKey: string = 'fqM1EbfW1AoRe7oyV7FGF8UvlgoqEH24';
  giphyTrendingUrl: string = 'https://api.giphy.com/v1/gifs/trending';
  giphySearchUrl: string = 'https://api.giphy.com/v1/gifs/search';
  favorites: any[] = [];

  constructor(private http: HttpClient) {}

  getTrendingGifs = (): any => {
    return this.http.get(this.giphyTrendingUrl, {
      params: {
        //anytime we refer to a property of a class we must use this. to begin.
        api_key: this.apiKey,
        // limit: '10',
      },
    });
  };

  searchGifs = (searchTerm: string): any => {
    return this.http.get(this.giphySearchUrl, {
      params: {
        api_key: this.apiKey,
        q: searchTerm,
      },
    });
  };
  // return type is void cause we are just going to push this into our favorites array.
  addFavorite = (gif: any): void => {
    this.favorites.push(gif);
    console.log(this.favorites);
  };

  getFavorites = (): any[] => {
    return this.favorites;
  };
}
