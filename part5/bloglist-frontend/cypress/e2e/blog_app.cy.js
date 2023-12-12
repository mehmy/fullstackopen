describe('Blog app app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'mamo',
      username: 'mamo',
      password: 'required',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173');
  });

  it('Login from is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mamo');
      cy.get('#password').type('required');
      cy.get('#login-button').click();
      cy.contains('mamo logged in successfully');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mamo');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('#error')
        .should('contain', 'Username or password incorrect')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'mamo logged in successfully');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('mamo');
      cy.get('#password').type('required');
      cy.get('#login-button').click();
    });

    it('a blog can be created', function () {
      cy.contains('blog').click();
      cy.get('#title').type('What lan what');
      cy.get('#author').type('Mehmy academy');
      cy.get('#url').type('goooooogle.com');
      cy.contains('save').click();
      cy.contains('What lan what Mehmy academy');
    });

    it('user can like a blog', function () {
      cy.contains('blog').click();
      cy.get('#title').type('What lan what');
      cy.get('#author').type('Mehmy academy');
      cy.get('#url').type('goooooogle.com');
      cy.contains('save').click();
      cy.contains('What lan what Mehmy academy');

      cy.contains('view').click();
      cy.contains('0');
      cy.get('#button-like').click();
      cy.contains('1');
    });

    it.only('user can delete a blog', function () {
      cy.contains('blog').click();
      cy.get('#title').type('What lan what');
      cy.get('#author').type('Mehmy academy');
      cy.get('#url').type('goooooogle.com');
      cy.contains('save').click();
      cy.contains('What lan what Mehmy academy');

      cy.contains('view').click();
      cy.get('#button-delete').click();

      cy.get('html').should('not.contain', 'What lan what Mehmy academy');
    });
  });
});
