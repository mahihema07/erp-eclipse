import {Component, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'star-rating',
    templateUrl: './app/common/shared_components/starrating.html',
    styleUrls: ['./app/common/shared_components/starratingstyle.css']
})

export class StarRating implements OnChanges {
    @Input() rating: number;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5
    }
}