import { VilalTemplatePage } from './app.po';

describe('Vilal App', function() {
  let page: VilalTemplatePage;

  beforeEach(() => {
    page = new VilalTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
