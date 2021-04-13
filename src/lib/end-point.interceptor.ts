import { Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from './tokens';
import { IConfig } from './config.interface';

export class EndPointInterceptor implements HttpInterceptor {
  constructor(@Inject(CONFIG) public config: IConfig) {}

  /**
   * Intercepts the outgoing request and prepends the api url to the request url.
   *
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<unknown>>}
   * @memberof EndPointInterceptor
   * @public
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiRequest = request.clone({ url: this.config.apiUrl + request.url });
    return next.handle(apiRequest);
  }
}
