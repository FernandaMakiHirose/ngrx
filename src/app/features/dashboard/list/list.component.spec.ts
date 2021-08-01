import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ListComponent } from './list.component';
import { listInitialState } from '../state/list.reducer';
import * as fromListActions from '../state/list.actions';
import * as fromListSelectors from '../state/list.selectors';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;

  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        ListComponent,
      ], // define o objeto
      providers: [
        provideMockStore({ initialState: { list: listInitialState } }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    // a store está pronta para executar os testes
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // modifica o status para true
  it('should show loading indicator', () => {
    store.setState({
      list: {
        ...listInitialState,
        loading: true,
      },
    });
    fixture.detectChanges();

    // se tivesse mais de um spam é necessário usar o .queryAll
    const loading = fixture.debugElement.query(By.css('span'));

    // é esperado que o loading seja verdadeiro
    expect(loading).toBeTruthy();
  });

  // verifica se um método foi executado pelo spyOn quando algo não é nosso, exemplo: o store não é um método dentro do componente
  it('should dispatch removeTodo action', () => {
    spyOn(store, 'dispatch');

    // pega o método e passa um valor
    component.onDelete(123);

    // espera que foi chamado um método e passa um valor 
    expect(store.dispatch).toHaveBeenCalledWith(fromListActions.removeTodo({ id: 123 }));
  });
});
