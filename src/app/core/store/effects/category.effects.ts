import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CategoryActions } from '../actions';
import { Category, RouterStateUrl } from '../../../model';
import { CategoryService } from '../../services';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryActions: CategoryActions,
        private svc: CategoryService
    ) { }

    // Load categories based on url
    @Effect()
    // handle location update
    loadRouteCategories$ = this.actions$
        .ofType('ROUTER_NAVIGATION')
        .map((action: any): RouterStateUrl => action.payload.routerState)
        .filter((routerState: RouterStateUrl) =>
            routerState.url.toLowerCase().startsWith('/'))
        .pipe(() => this.svc.getCategories())
        .map((categories: Category[]) => this.categoryActions.loadCategoriesSuccess(categories)
        );
}
