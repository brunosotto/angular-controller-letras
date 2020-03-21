import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {

  @Input() private readonly sectiontitle: string;
  @Input() private readonly addable: boolean;
  @Input() private readonly addTitle: string;
  @Output() private readonly add: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() private readonly removable: boolean;
  @Input() private readonly removeTitle: string;
  @Output() private readonly remove: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _open: boolean;

  constructor() {
    this._open = true;
  }

  public ngOnInit(): void {
    this._open = true;
  }

  public get open(): boolean {
    return this._open;
  }

  public get _sectiontitle(): string {
    return this.sectiontitle;
  }

  public get _addable(): boolean {
    return this.addable;
  }

  public get _addTitle(): string {
    return this.addTitle;
  }

  public addEmitter(): void {
    this.add.emit(true);
  }

  public get _removable(): boolean {
    return this.removable;
  }

  public get _removeTitle(): string {
    return this.removeTitle;
  }

  public removeEmitter(): void {
    this.remove.emit(true);
  }

  public toggle(): void {
    this._open = !this._open;
  }

}
