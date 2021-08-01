import { createAction, props } from '@ngrx/store';
import { User } from '../shared/models/user.model';

// dentro dos colchetes fica o contexto de onde a section está sendo disparada
// fora fica o que será disparado
// o segundo parâmetro é o props que define objetos
export const doLogin = createAction(
  '[Login] Do Login',
  props<{ name: string, email: string }>(),
);

export const doLoginSuccess = createAction(
  '[API] Do Login Success',
  props<{ user: User }>(),
);

export const doLoginFailure = createAction(
  '[API] Do Login Failure',
);
