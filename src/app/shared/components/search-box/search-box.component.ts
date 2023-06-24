import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubcription?: Subscription;
  @Input()
  placeholder: string = '';
  @Input()
  initialValue: string = '';
  @Output()
  onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
  }
  emitValue(term: string): void {
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
