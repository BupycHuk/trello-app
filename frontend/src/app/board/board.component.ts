import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../services/board.service";
import {ActivatedRoute} from "@angular/router";
import {ColumnService} from "../services/column.service";
import {Column} from "../models/column";
import {Board} from "../models/board";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";
import { Subscription } from 'rxjs/Subscription';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board = new Board();
  subscription: Subscription;
  columns: Column[];

  constructor(
    private cableService: ActionCableService,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private columnService: ColumnService) { }

  ngOnInit() {
    const link = this.boardLink();
    this.boardService.getBoard(link).subscribe(board => {
      this.board = board;
    });
    this.columnService.getColumns(link).subscribe(columns => {
      this.columns = columns;
    });
    this.actionCableInit(link);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private actionCableInit(link: string) {
    const channel: Channel = this.cableService
      .cable(environment.actionCableUrl)
      .channel('BoardChannel', {link: link});

    // Subscribe to incoming messages
    this.subscription = channel.messages.subscribe(message => {
      switch (message.action) {
        case 'newColumn':
          this.columns.push(message.column);
          break;
        case 'removeColumn':
          let column = this.findById(this.columns, message.column.id);
          BoardComponent.remove(this.columns, column);
          break;
        case 'updateColumn':
          column = this.findById(this.columns, message.column.id);
          column.title = message.column.title;
      }
    });
  }

  private findById(columns: any[], id: any) {
    return columns.find((value, index, obj) => {
      if (value.id == id) {
        return true;
      }
    });
  }

  private boardLink() {
    return this.route.snapshot.paramMap.get('link');
  }

  newColumn(title: string) {
    if (title == "") {
      alert('Заголовок не может быть пустым');
      return;
    }
    let newColumn = new Column();
    newColumn.title = title;
    this.columnService.addColumn(this.boardLink(), newColumn).subscribe();
  }

  updateColumn(column: Column, title: string) {
    column.is_updating = false;
    if (title == '') {
      return
    }
    column.title = title;
    this.columnService.updateColumn(this.boardLink(), column).subscribe()
  }

  removeColumn(column: Column) {
    this.columnService.deleteColumn(this.boardLink(), column).subscribe()
  }

  private static remove(array: any[], element: any) {
    const index: number = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  newTask(column: Column) {
    let task = new Task();
    task.column_id = column.id;
    task.is_updating = true;
    column.tasks.push(task);
    return false
  }

  updateTask(task: Task, column: Column, title: string) {
    task.is_updating = false;
    if (title == '') {
      if (task.id == null) {
        BoardComponent.remove(column.tasks, task)
      }
      return
    }
    task.title = title;
    if (task.id) {
      this.taskService.updateTask(this.boardLink(), task).subscribe()
    } else {
      this.taskService.addTask(this.boardLink(), task).subscribe( newTask => {
        task.id = newTask.id;
      })
    }
  }

  removeTask(task: Task, column: Column) {
    this.taskService.deleteTask(this.boardLink(), task).subscribe(() => {
      BoardComponent.remove(column.tasks, task)
    })
  }

  transferTaskSuccess(column:Column, $event: any) {
    if ($event.dragData.oldColumn == column) {
      return
    }
    let task = $event.dragData.task;
    task.column_id = column.id;
    this.taskService.updateTask(this.boardLink(), task).subscribe(data => {
      BoardComponent.remove($event.dragData.oldColumn.tasks, task);
      column.tasks.push(task);
    });
  }

}
