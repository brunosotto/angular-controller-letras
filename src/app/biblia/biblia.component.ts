import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss']
})
export class BibliaComponent {

  private destroy$: Subject<void> = new Subject<void>();
  public version: string;

  constructor(
    private readonly route: ActivatedRoute,
  ) {
    // monitora os params
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(params => {
        this.version = params.version;
      });
  }

}
