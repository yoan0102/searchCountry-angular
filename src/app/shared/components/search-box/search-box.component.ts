import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  placeholder: string = ''
  @Output()
  onValue: EventEmitter<string> = new EventEmitter();


  emitValue(term: string) :void{

    this.onValue.emit(term)
  }

}
