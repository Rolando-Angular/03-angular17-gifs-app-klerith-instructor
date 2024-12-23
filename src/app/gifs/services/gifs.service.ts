import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchGifResponse } from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: "root",
})
export class GifsService {

  private _gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private _apiKey: string = 'EyYLnYmpCfVHuYULmkKYOWCIxd1jBcpb';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public get tagsHistory() {
    return [...this._tagsHistory];
  }

  public get gifsList() {
    return [...this._gifList];
  }

  private organizeHistory(tag: string): void {
    const tagLower = tag.toLowerCase();
    if (this._tagsHistory.includes(tagLower)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    // unshift -> add a new element on the top of the list
    this._tagsHistory.unshift(tagLower);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) { return; }
    // There is data
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (!this._tagsHistory.length) { return; }
    this.searchTag(this._tagsHistory[0])
  }

  public async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchGifResponse>(`${this._serviceUrl}/search`, { params })
      .subscribe(resp => {
        this._gifList = [...resp.data];
      })
  }

}
