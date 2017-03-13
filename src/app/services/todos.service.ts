import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CommonResult, CommonSimpleResult } from '../models/CommonResult';
import { ToDo } from '../models/ToDo';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ToDoService{
    private baseUrl: string = "http://localhost:57102/api/todo";    

    constructor(private http: Http){
    }

    public geById(id: number) : Observable<CommonResult<ToDo>>{
        return this.http.get(this.baseUrl + '/' + id)
            .map(res => res.json());
    }

    public get() : Observable<CommonResult<ToDo[]>>{
        return this.http.get(this.baseUrl)
            .map(res => res.json());
    }

    public post(toDo: ToDo) : Observable<CommonResult<ToDo>>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl, JSON.stringify(toDo), { headers: headers })
            .map(res => res.json());
    }

    public put(id: number, toDo: ToDo) : Observable<CommonSimpleResult>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.baseUrl + '/' + id, JSON.stringify(toDo), { headers: headers })
            .map(res => res.json());
    }

    public delete(id: number) : Observable<CommonSimpleResult>{
        return this.http.delete(this.baseUrl + '/' + id)
            .map(res => res.json());
    }
}