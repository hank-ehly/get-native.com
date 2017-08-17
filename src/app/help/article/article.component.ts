import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'gn-help-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class HelpArticleComponent implements OnInit {
    articleId: number;

    constructor(private route: ActivatedRoute) {
        this.articleId = route.snapshot.params.id;
    }

    ngOnInit() {
    }

}
