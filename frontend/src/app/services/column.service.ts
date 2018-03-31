import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Column } from '../models/column';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ColumnService {

  private boardsUrl = environment.apiUrl + 'api/boards';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET column by id. Will 404 if id not found */
  getColumns(boardLink: string): Observable<Column[]> {
    const url = `${this.boardsUrl}/${boardLink}/columns`;
    return this.http.get<Column[]>(url).pipe(
      tap(_ => this.log(`fetched column for board id=${boardLink}`)),
      catchError(this.handleError(`getColumn id=${boardLink}`, []))
    );
  }

  /** PUT: add a new column to the server */
  updateColumn (boardLink: string, column: Column): Observable<Column> {
    let url = `${this.boardsUrl}/${boardLink}/columns/${column.id}`;
    return this.http.put<Column>(url, column, httpOptions).pipe(
      tap((column: Column) => this.log(`updated column w/ id=${column.id}`)),
      catchError(this.handleError<Column>('updateColumn'))
    );
  }

  /** PUT: add a new column to the server */
  deleteColumn (boardLink: string, column: Column): Observable<Column> {
    let url = `${this.boardsUrl}/${boardLink}/columns/${column.id}`;
    return this.http.delete<Column>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted column w/ id=${column.id}`)),
      catchError(this.handleError<Column>('deleteColumn'))
    );
  }

  /** POST: add a new column to the server */
  addColumn (boardLink: string, column: Column): Observable<Column> {
    let url = `${this.boardsUrl}/${boardLink}/columns`;
    return this.http.post<Column>(url, column, httpOptions).pipe(
      tap((column: Column) => this.log(`added column w/ id=${column.id}`)),
      catchError(this.handleError<Column>('addColumn'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ColumnService message with the MessageService */
  private log(message: string) {
    console.log('ColumnService: ' + message);
  }
}
