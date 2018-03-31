import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'


import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BoardService} from "./services/board.service";
import {ColumnService} from "./services/column.service";
import {TaskService} from "./services/task.service";
import {FormsModule} from "@angular/forms";
import {DndModule} from 'ng2-dnd';


const appRoutes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'board/:link', component: BoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DndModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true} // <-- debugging purposes only
    )
  ],
  providers: [
    BoardService,
    ColumnService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
