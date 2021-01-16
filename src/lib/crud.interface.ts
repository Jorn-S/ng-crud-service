import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ICrud<T> {
  http: HttpClient;
  resourcePrefix: string;

  create(formData: FormData): Observable<T>
  read(id?: number | string): Observable<T>
  update(id: number | string,formData: FormData): Observable<T>
  delete(id: number | string): Observable<T>
  forceDelete?(id: number | string ): Observable<T>
}
