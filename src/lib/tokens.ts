import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { IConfig } from './config.interface';

export const CONFIG = new InjectionToken<IConfig>('Configuration');
export const HTTP_CLIENT = new InjectionToken<HttpClient>('Http Client');
