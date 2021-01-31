import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrud } from './crud.interface';
import { HTTP_CLIENT } from './tokens';
import { Param } from './types';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class CrudService<T> implements ICrud<T>{
  public resourcePrefix: string;

  constructor(@Inject(HTTP_CLIENT) public http: HttpClient) { }

  create(formData?: FormData, param?: Param): Observable<T> {
    return this.http.post<T>(
      this.createUrlTree(param),
      formData
    );
  }

  read(param?: Param): Observable<T>{
    return this.http.get<T>(
      this.createUrlTree(param)
    );
  }

  readList(param?: Param): Observable<T[]>{
    return this.http.get<T[]>(
      this.createUrlTree(param)
    );
  }

  update(param: Param, formData?: FormData): Observable<T> {
    return this.http.patch<T>(
      this.createUrlTree(param),
      formData
    );
  }

  delete(param: Param): Observable<T> {
    return this.http.delete<T>(this.createUrlTree(param));
  }

  forceDelete(param: Param): Observable<T> {
    return this.http.delete<T>(this.createUrlTree(param));
  }

  createUrlTree(param?: number | string | any[]): string{
    if(!param || param === ''){
      return '/'+this.resourcePrefix;
    }

    if(param instanceof Array) {
      return `/${this.resourcePrefix}/${param.join('/')}`;
    }

    return`/${this.resourcePrefix}/${param}`;
  }
}
