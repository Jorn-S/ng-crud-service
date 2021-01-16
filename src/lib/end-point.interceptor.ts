import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConfig } from './config.interface';

@Injectable()
export class EndPointInterceptor implements HttpInterceptor {

  constructor( @Inject('config') public config: IConfig) {}

  /**
   * Intercepts the outgoing request and prepends the api url to the request url.
   *
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<unknown>>}
   * @memberof EndPointInterceptor
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiRequest = request.clone({ url: this.config.apiUrl + request.url });
    return next.handle(apiRequest);
  }
}
