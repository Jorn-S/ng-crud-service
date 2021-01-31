import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IConfig } from './config.interface';
import { EndPointInterceptor } from './end-point.interceptor';
import { CONFIG, HTTP_CLIENT } from './tokens';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})

export class CrudServiceModule {
  static forRoot(config: IConfig): ModuleWithProviders<CrudServiceModule> {
    return {
      ngModule: CrudServiceModule,
      providers: [
        {provide: CONFIG , useValue: config},
        {provide: HTTP_CLIENT, useClass: HttpClient},
        {provide: HTTP_INTERCEPTORS, useClass: EndPointInterceptor, multi: true, deps: [CONFIG]}
      ]
    };
  }
}
