import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

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

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
  }

}
