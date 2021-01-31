import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Param } from "./types";

export interface ICrud<T> {
  http: HttpClient;
  resourcePrefix: string;
  create(formData?: FormData,param?: Param): Observable<T>
  read(param?: Param): Observable<T>
  readList(param?: Param): Observable<T[]>
  update(param: Param, formData?: FormData): Observable<T>
  delete(param?: Param): Observable<T>
  forceDelete?(param: Param ): Observable<T>
}
