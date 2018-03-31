import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../models/task';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

  private boardsUrl = environment.apiUrl + 'api/boards';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** PUT: add a new task to the server */
  updateTask (boardLink: string, task: Task): Observable<Task> {
    let url = `${this.boardsUrl}/${boardLink}/tasks/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions).pipe(
      tap((task: Task) => this.log(`updated task w/ id=${task.id}`)),
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  /** DELETE: delete a task from the server */
  deleteTask (boardLink: string, task: Task): Observable<Task> {
    let url = `${this.boardsUrl}/${boardLink}/tasks/${task.id}`;
    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tasks w/ id=${task.id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask (boardLink: string, task: Task): Observable<Task> {
    let url = `${this.boardsUrl}/${boardLink}/tasks`;
    return this.http.post<Task>(url, task, httpOptions).pipe(
      tap((task: Task) => this.log(`added task w/ id=${task.id}`)),
      catchError(this.handleError<Task>('addTask'))
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

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    console.log('TaskService: ' + message);
  }
}
