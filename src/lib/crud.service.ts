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

export class CrudService implements ICrud {
  public resourcePrefix: string;

  constructor(@Inject(HTTP_CLIENT) public http: HttpClient) { }

  /**
   * Returns a POST request response.
   *
   * @param formData - (Optional) The data to be posted
   * @param param - (Optional) Takes the following as URL parameters: number|string|any[]. Single number or string, or array with url parameters.
   * @returns An Observable of the HttpResponse for the request, with a response body in the requested type.
   *
   * @public
   */

  create<T>(formData?: FormData, param?: Param): Observable<T> {
    return this.http.post<T>(
      this.createUrlTree(param),
      formData
    );
  }
  /**
   * Returns a GET request response.
   *
   * @param param - (Optional) Takes the following as URL parameters: number|string|any[]. Single number or string, or array with url parameters.
   * @returns An Observable of the HttpResponse for the request, with a response body in the requested type.
   *
   * @public
   */
  read<T>(param?: Param): Observable<T>{
    return this.http.get<T>(
      this.createUrlTree(param)
    );
  }
   /**
   * Returns a PATCH request response.
   *
   * @param param - (Optional) Takes the following as URL parameters: number|string|any[]. Single number or string, or array with url parameters.
   * @param formData - (Optional) The data to be posted
   * @returns An Observable of the HttpResponse for the request, with a response body in the requested type.
   *
   * @public
   */
  update<T>(param: Param, formData?: FormData): Observable<T> {
    return this.http.patch<T>(
      this.createUrlTree(param),
      formData
    );
  }
  /**
   * Returns a DELETE request response.
   *
   * @param param - Takes the following as URL parameters: number|string|any[]. Single number or string, or array with url parameters.
   * @returns An Observable of the HttpResponse for the request, with a response body in the requested type.
   *
   * @public
   */
  delete<T>(param: Param): Observable<T> {
    return this.http.delete<T>(this.createUrlTree(param));
  }

  forceDelete<T>(param: Param): Observable<T> {
    return this.http.delete<T>(this.createUrlTree(param));
  }

  /**
   * Returns a string of the given URL paramaters. if non given it will return the specidied resource prefix.
   *
   * @param param - Takes the following as URL parameters: number|string|any[]. Single number or string, or array with url parameters.
   * @returns An Observable of the HttpResponse for the request, with a response body in the requested type.
   *
   * @public
   */
  private createUrlTree(param?: number | string | any[]): string{
    if(!param || param === ''){
      return '/'+this.resourcePrefix;
    }

    if(param instanceof Array) {
      return `/${this.resourcePrefix}/${param.join('/')}`;
    }

    return`/${this.resourcePrefix}/${param}`;
  }
}
