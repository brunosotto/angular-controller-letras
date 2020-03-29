import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Louvor } from '../models/louvor.model';
import { HttpConnectorService } from '../security/http-connector.service';
import { KeyValueModel } from '../models/key-value.model';

@Injectable()
export class LouvorService {

  constructor(
    private readonly http: HttpConnectorService
  ) { }

  public listLouvores(): Observable<Louvor[]> {
    // cria um observable para retorno
    return Observable.create(observer => {

      // obtém
      this.http.get(environment.louvor.list_louvores).subscribe(
        (res: Louvor[]) => {
          // responde com os dados retificados
          observer.next(res);
          observer.complete();
        },
        error => {
          // repassa o erro
          observer.error(error);
          observer.complete();
        }
      );

    });
  }

  public findLouvor(id: string): Observable<Louvor> {
    // obtém
    const replacement = [{ key: 'id', value: id }];
    return this.http.get(environment.louvor.get_louvor, replacement);
  }

  public deleteLouvor(louvor: Louvor): Observable<any> {
    // deleta
    const replacement = [{ key: 'id', value: louvor.id }];
    return this.http.delete(environment.louvor.delete_louvor, replacement);
  }

  public addLouvor(louvor: Louvor): Observable<any> {
    // cria
    return this.http.post(environment.louvor.insert_louvor, louvor);
  }

  public updateLouvor(louvor: Louvor): Observable<any> {
    // altera
    const replacement = [{ key: 'id', value: louvor.id }];
    return this.http.put(environment.louvor.update_louvor, louvor, replacement);
  }

}
