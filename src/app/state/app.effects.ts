import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../shared/services/login.service';
import * as fromAppActions from './app.actions';

@Injectable()
export class AppEffects {

  // faz a definição do effect
  doLogin$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromAppActions.doLogin), // filtra todas as actions para passar apenas actions de um tipo específico
      mergeMap(({ name, email }) => this.loginService.login(name, email) // utiliza as informações das actions para fazer uma chamada para o serviço
        .pipe(
          map(user => {
            this.router.navigate(['d']); // roteia para o dashboard
            return fromAppActions.doLoginSuccess({ user }); // retorna a action de sucesso
          }),
          catchError(() => of(fromAppActions.doLoginFailure())),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, // tem um $ porque estende um Observable
              private loginService: LoginService,
              private router: Router) {
  }
}
