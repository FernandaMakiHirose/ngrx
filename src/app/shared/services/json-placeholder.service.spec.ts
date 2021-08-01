import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderService } from './json-placeholder.service';

describe('HttpClient testing', () => {
  let httpTestingController: HttpTestingController;
  let service: JsonPlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    // HttpTestingController: consegue mockar as chamadas e fazer algumas definições
    httpTestingController = TestBed.inject(HttpTestingController);

    // para executar um teste que faz chamada http é necessário utilizar a instância do serviço e pega o serviço
    service = TestBed.inject(JsonPlaceholderService);
  });

  // verifica se não tem nenhuma chamada pendente, se tiver alguma chamada pendente vai executar um erro
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get entities', done => {
    service.getTodosByUser(1) // retorna um observable, então é possível dar subscribe
      .subscribe(response => { // recebe a resposta
        expect(testingRequest.request.params.get('userId')).toBe('1'); // consegue mockar as informações, pega o id que espera ser 1
        expect(testingRequest.request.method).toBe('GET'); // espera que o método seja get
        expect(response).toEqual([1, 2]); // espera receber um array de 1 e 2
        done(); // por ser assíncrona precisamos terminar com um done
      });

      // faz uma validação http se foi feito uma chamada http utilizando a url passada
    const testingRequest = httpTestingController.expectOne(req => req.url.includes('todos'));
    testingRequest.flush([1, 2]); // quer fazer uma requisição buscar um array com 1 e 2
  });
});
