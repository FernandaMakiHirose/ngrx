import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

// cria o feature selector
export const selectUserContext = createFeatureSelector('userContext');

// o seletor pode ser usado no nome do usuário
export const selectUserName = createSelector(
  selectUserContext,
  (state: AppState) => state.user.name,
);
