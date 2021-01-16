import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IConfig } from './config.interface';
import { EndPointInterceptor } from './end-point.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})

export class CrudServiceModule {
  static forRoot(config: IConfig): ModuleWithProviders<CrudServiceModule> {
    return {
      ngModule: CrudServiceModule,
      providers: [
        {provide: 'config' , useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: EndPointInterceptor, multi: true, deps: [config]},
      ]
    };
  }
}
