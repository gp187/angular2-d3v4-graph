import { D34Page } from './app.po';

describe('d3-4 App', function() {
  let page: D34Page;

  beforeEach(() => {
    page = new D34Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
