import { ToDoWebAppPage } from './app.po';

describe('to-do-web-app App', function() {
  let page: ToDoWebAppPage;

  beforeEach(() => {
    page = new ToDoWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
