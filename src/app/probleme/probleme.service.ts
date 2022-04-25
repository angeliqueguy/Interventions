import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProbleme } from "./probleme";

@Injectable({ providedIn: 'root' }) //https://blog.zimbaroos.in/post/2021/03/29/error-uncaught-in-promise-nullinjectorerror-angular-not-able-to-find-custom-service
export class ProblemeService {

private baseUrl = 'https://localhost:7260/Intervention';

constructor(private _http: HttpClient) { }

saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
  }
  
 /** POST: add a new problem to the server */
private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  return this._http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    //return Observable.throw(err.message);
    return throwError(err.message);
  }
}