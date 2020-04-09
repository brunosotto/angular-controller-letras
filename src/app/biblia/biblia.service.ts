import { environment } from './../../environments/environment';
import { Subject, Observable, of } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BibliaLivro } from '../models/biblia.model';

@Injectable()
export class BibliaService implements OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    private _jsonURL = 'assets/biblia-{v}.json';
    private biblias: { [key: string]: BibliaLivro[] } = {};

    constructor(
        private http: HttpClient,
    ) {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getBiblia(version: string): Observable<BibliaLivro[]> {
        if (!!this.biblias[version]) {
            return of(this.biblias[version]);
        }

        const url = this._jsonURL.replace(/\{v\}/g, version);
        return this.http.get<BibliaLivro[]>(url)
            .pipe(
                tap(biblia => this.biblias[version] = biblia)
            );
    }

}
