import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/todos.service';
import { ToDo } from '../models/todo';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class ToDosComponent implements OnInit {

    public toDos: ToDo[] = [];
    public inEditMode: boolean = false;
    public currentToDo: ToDo;
    public buttonLabel: string = 'Create';

    constructor(private service: ToDoService) {
        this.currentToDo = new ToDo();
    }

    ngOnInit(): void {
        this.loadToDos();
    }

    public remove(id: number): void {
        this.service.delete(id)
            .subscribe((res) => {
                if (res.success) {
                    this.loadToDos();
                }
                else {
                    console.error(res.errors);
                }
            })
    }

    public edit(toDo: ToDo): void {
        this.currentToDo = toDo;
        this.inEditMode = true;
        this.buttonLabel = 'Save';
    }

    public setOrUnsetCompleted(toDo: ToDo): void {
        toDo.isCompleted = !toDo.isCompleted;
        this.service.put(toDo.id, toDo)
            .subscribe((res) => {
                if (!res.success) {
                    console.error(res.errors);
                }
            });
    }

    public cancel(): void {
        this.currentToDo = new ToDo();
        this.inEditMode = false;
    }

    public save(): void {
        //debugger
        if (!this.inEditMode) {
            this.saveNewToDo();
        }
        else {
            this.updateToDo();
        }
    }

    private saveNewToDo(): void {
        this.service.post(this.currentToDo)
            .subscribe((res) => {
                if (res.success) {
                    this.toDos.push(res.result);
                    this.currentToDo = new ToDo();
                    this.inEditMode = false;
                    this.buttonLabel = 'Create';
                }
                else {
                    console.error(res.errors);
                }
            });
    }

    private updateToDo(): void {
        this.service.put(this.currentToDo.id, this.currentToDo)
            .subscribe((res) => {
                if (res.success) {
                    this.currentToDo = new ToDo();
                    this.inEditMode = false;
                    this.buttonLabel = 'Create';
                }
                else {
                    console.error(res.errors);
                }
            });
    }


    private loadToDos(): void {
        this.toDos = [];
        this.service.get()
            .subscribe((res) => {
                if (res.success) {
                    this.toDos = res.result;
                    console.log(res.result);
                }
                else {
                    console.error(res.errors);
                }
            });
    }
}