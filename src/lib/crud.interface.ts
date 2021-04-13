import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Param } from "./types";

export interface ICrud{
  http: HttpClient;
  resourcePrefix: string;
  create<T>(formData?: FormData,param?: Param): Observable<T>
  read<T>(param?: Param): Observable<T>
  update<T>(param: Param, formData?: FormData): Observable<T>
  delete<T>(param?: Param): Observable<T>
  forceDelete?<T>(param: Param ): Observable<T>
}
