import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrud } from './crud.interface';

@Injectable()

export class CrudService<T> implements ICrud<T>{
  http: HttpClient;

  constructor(public resourcePrefix: string) { }

  create(formData: FormData): Observable<T> {
    return this.http.post<T>(
      this.resourcePrefix,
      formData
    );
  }

  read(id?: number | string): Observable<T> {
    return this.http.get<T>(
      (id)? `${this.resourcePrefix}/${id}` : this.resourcePrefix
    );
  }

  update(id: number | string,formData: FormData): Observable<T> {
    return this.http.put<T>(
      `${this.resourcePrefix}/${id}`,
      formData
    );
  }

  delete(id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.resourcePrefix}/${id}`);
  }

  forceDelete(id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.resourcePrefix}/${id}`);
  }
}
