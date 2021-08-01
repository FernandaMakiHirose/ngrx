import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

import { ListEffects } from './list.effects';
import { listInitialState } from './list.reducer';
import { TodosService } from 'src/app/shared/services/todos.service';
import { Todo } from '../../../shared/models/todo.model';
import * as fromListActions from './list.actions';

describe('ListEffects', () => {
  let actions$: Observable<Action>; // emite toda vez que uma action for despachada
  let effects: ListEffects;
  let store: MockStore<any>;
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListEffects, // é um injectable então é adicionado nos providers
        provideMockActions(() => actions$), // faz um link do observable
        provideMockStore({ initialState: { list: listInitialState } }),
        {
          provide: TodosService, // injeção de dependências
          useValue: {
            getList: () => {}, // diz que essa variável é do tipo arrow function
          },
        },
      ],
    });

    effects = TestBed.inject(ListEffects);
    store = TestBed.inject(MockStore);
    service = TestBed.inject(TodosService);
  });

  // se dentro do store a api for 0 ou tiver 10 ou mais entities o retorno vai ser despachar a action
  describe('loadList$', () => {
    it('should dispatch #notifyHydrated when page is zero and entities >= 10', () => {
      store.setState({ // atualiza o array de entities
        list: {
          ...listInitialState,
          entities: new Array(10).fill({} as Todo), // passa 10 itens para o array de entities
        },
      });

      // é do tipo hot: controla e escolhe qual valor vai ser emitido
      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() }); // emite um valor a, depois define um objeto e carrega a lista de todos os valores

      // cold: só vai ouvir o que vai emitir, recebe um valor b (action)
      const expected = cold('b', { b: fromListActions.notifyHydrated() });

      // espera receber o expected
      expect(effects.loadList$).toBeObservable(expected);
    });

    it('should return #loadListSuccess', () => {

      // passa a instância (service) e o que vai ser mockado (getList) que espera retornar um array vazio
      spyOn(service, 'getList').and.returnValue(of([]));

      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() });
      // espera receber um loadListSuccess que recebe uma entity com valor vazio
      const expected = cold('b', { b: fromListActions.loadListSuccess({ entities: [] }) });

      expect(effects.loadList$).toBeObservable(expected);
    });

    it('should return #loadListFailure', () => {

      // para mostrar que vai ser um erro usa-se o throwError 
      spyOn(service, 'getList').and.returnValue(throwError({}));

      actions$ = hot('a', { a: fromListActions.loadListFromLastTodos() });

      // recebe o loadListFailure porque quer espera receber um erro
      const expected = cold('b', { b: fromListActions.loadListFailure() });

      expect(effects.loadList$).toBeObservable(expected);
    });
  });
});
