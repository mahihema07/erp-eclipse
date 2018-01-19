import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {IBook} from '../../models/books';
import {Observable} from 'rxjs/Observable';

@Component({
    templateUrl: './app/components/books/listbooks.html'
})

export class ListBooks implements OnInit {
    formUrl: string;
    books: IBook

    constructor(private http: Http) {
        this.formUrl = "listbooks.do"
    }

    ngOnInit() {
        this.getBooks();
    }

    getBooks(): void {
        this.http
            .post(this.formUrl, "")
            .map(res => {
                return res.json();
            }).subscribe(
            data => {
                this.books = data;
            });
    }
}