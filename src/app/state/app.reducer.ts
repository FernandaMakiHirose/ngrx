import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../shared/models/user.model';
import * as fromAppActions from './app.actions';

// definição do estado
export interface AppState {
  user: User;
}

// inicialmente não se tem um usuário definido
export const initialState: AppState = {
  user: undefined,
};

// cria o reducer
const appStateReducer = createReducer(
  initialState,
  // quando essa action for disparada vai receber e devolve o usuário que foi retornado da chamada de serviço
  on(fromAppActions.doLoginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
);

// função pura que aceita um estado atual, uma action e retorna o estado modificado
export function reducer(state: AppState | undefined, action: Action): AppState {
  return appStateReducer(state, action);
}
