# Gerenciamento de estado usando NgRx
Após fazer login, o projeto mostra uma lista dos últimos 10 todos. É possível criar, marcá-los como concluído, ver a lista completa e deletar todos. Além disso, após fazer o login, o nome é automaticamente redirecionado no dashboard do usuário.

![Capturar](https://user-images.githubusercontent.com/72028645/127741728-a35ac92c-f271-491d-94c4-6ce1d0dd611c.PNG)

## Guia
Versão do Angular:
>9.1.12.

No projeto execute:
>npm install

Para executar o programa:
>ng serve

Depois abra no seu navegador:
>http://localhost:4200/

Para gerar um componente:
>ng generate component component-name

Build do projeto - Armazenado dentro da pasta `dist/`:
>ng build

Produção do build:
>--prod

Teste unitário:
>ng test 

Teste end-to-end:
>ng e2e 

Para executar testes:
><a href="https://www.npmjs.com/package/jasmine-marbles">Jasmine Marbles</a>

Outros frameworks bons para testes: ´Cypress´ e o ´Jest´.

## Instalações feitas durante o projeto 
Instalar Store:
>ng add @ngrx/store@latest 

Instalar Store Devtools:
>ng add @ngrx/store-devtools@latest

Instalar Effects:
>ng add @ngrx/effects@latest

Instalar Router Store (conecta o estado da rota do Angular e joga essa informação no Store):
>ng add @ngrx/router-store@latest

## Por que testar?
- Testes são uma boa documentação.
- Permite refatorações e adição de novas features de uma forma mais fácil.
- Dão segurança pro desenvolvedor. 

### Testes unitário
- Testa porções individuais do código.
- Isolados.
- Sem dependências.

### Testes de integração
- Testa componentes/diretivas/serviços com suas dependências.
- Chamadas HTTP.
- View.

### Testes e2e
- Testa o fluxo da aplicação e se as ações esperadas e não esperadas geram estados esperados.

### Testes unitários e de integração 
- Jasmine: Framework onde um teste é descrito.
- Karma: task runner, define o framework de testes, browser, etc.
