import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'gn-help-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class HelpArticleComponent {

    articleId: number;

    constructor(private route: ActivatedRoute) {
        this.articleId = route.snapshot.params['id'];
    }

}
