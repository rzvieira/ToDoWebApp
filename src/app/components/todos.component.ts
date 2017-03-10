import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/todos.service';
import { ToDo } from '../models/todo';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class ToDosComponent implements OnInit {

    public todos: ToDo[] = [];

    ngOnInit(): void {
        this.loadTodos();
    }

    constructor(private service: ToDoService) {
    }

    private loadTodos() : void{
        this.todos = [];
        this.service.list()
            .subscribe((res) => {
               if(res.success){
                   console.log(res.result);
               } 
               else{
                   console.log(res.errors);
               }
            })
    }
}