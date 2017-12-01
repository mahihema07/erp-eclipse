import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {IBook} from '../../models/books';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: './app/components/books/ratebook.html'
})

export class RateBooks implements OnInit {
    formUrl: string;
    book: IBook

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.formUrl = "ratebooks.do";
    }

    ngOnInit() {
        //let id = this.route.snapshot.params['id'];

        this.route.params.subscribe(params => {

            let id = params['id'];

            this.http
                .post(this.formUrl, id)
                .map(res => {
                    return res.json();
                }).subscribe(
                data => {
                    this.book = data;
                });

            // Retrieve Pet with Id route param
            //this.petService.findPetById(id).subscribe(dog => this.dog = dog);
        });
    }

    submitRate(values: IBook): void {
        this.http
            .post('submitreview.do', values)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine, return the response
                else {
                    return res.json();
                }
            })
            .subscribe(data => {
                if (data.status === "success") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    backToList() {
        this.router.navigate(['/listbooks']);
    }
}