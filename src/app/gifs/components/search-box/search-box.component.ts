import { Component, ElementRef, ViewChild } from "@angular/core";
import { GifsService } from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input class="form-control" type="text" placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput !: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService,
  ) { }

  public searchTag() {
    const newTag: string = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag.trim());
    this.tagInput.nativeElement.value = '';
  }

}
