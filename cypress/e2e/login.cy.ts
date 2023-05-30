describe('ThanksCard', () => {
  it('login', () => {
    cy.visit('http://localhost:3000')

    // ログイン情報を入力する
    cy.get('input[name="email"]').type('admin@ts.occ.co.jp')
    cy.get('input[name="password"]').type('admin')
    //フォームのsubmitボタンをクリック
    cy.get('form').submit()

    // Home 画面が表示されていることを確認する
    cy.contains('Home')
  })
})