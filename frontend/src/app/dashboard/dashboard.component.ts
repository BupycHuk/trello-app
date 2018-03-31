import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private boardService: BoardService,
              private router: Router) { }

  ngOnInit(){
  }

  createBoard(title) {
    let board = new Board();
    board.title = title;
    this.boardService.addBoard(board).subscribe(board => {
      jQuery('#myModal').modal('hide');
      this.router.navigate(['/board', board.link]);
    });
    return false
  }

}
