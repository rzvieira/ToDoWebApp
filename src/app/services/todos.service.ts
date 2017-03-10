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

    public list() : Observable<CommonResult<ToDo>>{
        return this.http.get(this.baseUrl).map(res => res.json());
    }
}