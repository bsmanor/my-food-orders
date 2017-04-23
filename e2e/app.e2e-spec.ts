import { TunefoodordersPage } from './app.po';

describe('tunefoodorders App', () => {
  let page: TunefoodordersPage;

  beforeEach(() => {
    page = new TunefoodordersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
