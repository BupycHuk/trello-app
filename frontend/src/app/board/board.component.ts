import { Component, OnInit } from '@angular/core';
import {BoardService} from "../services/board.service";
import {ActivatedRoute} from "@angular/router";
import {ColumnService} from "../services/column.service";
import {Column} from "../models/column";
import {Board} from "../models/board";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board = new Board();
  columns: Column[];

  constructor(
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
    })
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
    this.columnService.addColumn(this.boardLink(), newColumn).subscribe(column => {
      this.columns.push(column);
    });
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
        this.removeTaskLocally(column, task)
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
    this.taskService.deleteTask(this.boardLink(), task).subscribe(data => {

      this.removeTaskLocally(column, task);
    })
  }

  private removeTaskLocally(column: Column, task: Task) {
    const index: number = column.tasks.indexOf(task);
    if (index !== -1) {
      column.tasks.splice(index, 1);
    }
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
    this.columnService.deleteColumn(this.boardLink(), column).subscribe(data => {

      const index: number = this.columns.indexOf(column);
      if (index !== -1) {
        this.columns.splice(index, 1);
      }
    })
  }

  transferTaskSuccess(column:Column, $event: any) {
    if ($event.dragData.oldColumn == column) {
      return
    }
    let task = $event.dragData.task;
    task.column_id = column.id;
    this.taskService.updateTask(this.boardLink(), task).subscribe(data => {
      this.removeTaskLocally($event.dragData.oldColumn, task);
      column.tasks.push(task);
    });
  }

}
