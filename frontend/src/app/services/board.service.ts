import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Board } from '../models/board';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BoardService {

  private boardsUrl = environment.apiUrl + 'api/boards';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET board by id. Will 404 if id not found */
  getBoard(id: string): Observable<Board> {
    const url = `${this.boardsUrl}/${id}`;
    return this.http.get<Board>(url).pipe(
      tap(_ => this.log(`fetched board id=${id}`)),
      catchError(this.handleError<Board>(`getBoard id=${id}`))
    );
  }

  /** POST: add a new board to the server */
  addBoard (board: Board): Observable<Board> {
    return this.http.post<Board>(this.boardsUrl, board, httpOptions).pipe(
      tap((board: Board) => this.log(`added board w/ id=${board.id}`)),
      catchError(this.handleError<Board>('addBoard'))
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

  /** Log a BoardService message with the MessageService */
  private log(message: string) {
    console.log('BoardService: ' + message);
  }
}
