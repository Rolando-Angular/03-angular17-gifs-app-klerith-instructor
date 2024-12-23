import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private _apiKey: string = 'EyYLnYmpCfVHuYULmkKYOWCIxd1jBcpb';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  public get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    const tagLower = tag.toLowerCase();
    if (this._tagsHistory.includes(tagLower)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tagLower);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
  }

  public async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get(`${this._serviceUrl}/search`, { params })
      .subscribe(resp => {
        console.log(resp);
      })
  }

}
