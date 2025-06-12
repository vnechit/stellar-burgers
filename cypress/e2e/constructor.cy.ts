import order from './../fixtures/order.json';

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');

    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('getOrders');

    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.setCookie('accessToken', 'accessToken');

    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });
    cy.wait('@getUser').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });
  });

  it('Доступны ли ингридиенты', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  it('проверяет, что localStorage не пуст', () => {
    cy.getAllLocalStorage().then((localStorage) => {
      expect(Object.keys(localStorage)).to.have.length.at.least(1);
    });
  });

  it('Проверка, что куки не пустые', () => {
    cy.getCookies().then((cookies) => {
      expect(cookies).to.not.be.empty;
    });
  });

  describe('Работоспособность модальных окон', () => {
    it('Открытие модального окна и закрытие на крестик', () => {
      cy.get('#modals').children().should('have.length', 0);
      cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').click();
      cy.wait(1000);
      cy.get('#modals').children().should('have.length.at.least', 2);
      cy.get('#modals').contains('h3', 'Флюоресцентная булка R2-D3');
      cy.get('#modals button:first-of-type').click();
      cy.get('#modals').children().should('have.length', 0);
    });

    it('Открытие модального окна и закрытие на оверлей', () => {
      cy.get('#modals').children().should('have.length', 0);
      cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').click();
      cy.wait(1000);
      cy.get('#modals').children().should('have.length.at.least', 2);
      cy.get('#modals').contains('h3', 'Флюоресцентная булка R2-D3');
      cy.get('#modals>div:nth-of-type(2)').click({ force: true });
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Работа с ингридиентами и заказом', () => {
    it('Добавление ингредиентов в бургер', () => {
      cy.get('[data-cy-no-bread').should('exist');
      cy.get('[data-cy-no-ingredient').should('exist');

      cy.get(
        '[data-cy="643d69a5c3f7b9001cfa093c"]:first-of-type button'
      ).click();
      cy.get(
        '[data-cy="643d69a5c3f7b9001cfa0941"]:first-of-type button'
      ).click();
      cy.get(
        '[data-cy="643d69a5c3f7b9001cfa0942"]:first-of-type button'
      ).click();

      cy.get('.constructor-element__text').contains('Краторная булка N-200i');
      cy.get('.constructor-element__text').contains(
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('.constructor-element__text').contains('Соус Spicy-X');

      cy.get('[data-cy-no-bread').should('not.exist');
      cy.get('[data-cy-no-ingredient').should('not.exist');
    });

    it('Отправка заказа на сервер', () => {
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-ingredient="sauce"]:first-of-type button').click();

      cy.get('[data-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        order.order.number
      );

      cy.get('[data-cy-no-bread').should('not.exist');
      cy.get('[data-cy-no-ingredient').should('not.exist');

      cy.get('#modals button:first-of-type').click();
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
});
