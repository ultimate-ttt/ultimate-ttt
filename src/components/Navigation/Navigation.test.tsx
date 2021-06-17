import * as React from 'react';
import { render, screen, within } from '../../test-utils';
import { Navigation } from './Navigation';
import routes from '../../routes/routes';

test('should render navigation', () => {
  render(<Navigation />);

  const navigation = screen.getByRole('navigation');
  const navItems = within(navigation).getAllByRole('link');

  const itemTexts = navItems.map((i) => i.textContent);
  expect(itemTexts).toMatchInlineSnapshot(`
    Array [
      "Play",
      "Analysis",
      "Analyse Last Game",
      "Report Bug",
    ]
  `);

  const itemHrefs = navItems.map((i) => {
    if (i instanceof HTMLAnchorElement) {
      const url = new URL(i.href);
      if (url.host === 'localhost') {
        return url.pathname;
      }
      return url.href;
    } else {
      return '';
    }
  });
  expect(itemHrefs).toMatchInlineSnapshot(`
    Array [
      "${routes.Home}",
      "${routes.AnalysisOverview}",
      "${routes.AnalysisLatest}",
      "${routes.GitHubBug}",
    ]
  `);

  const title = 'Ultimate Tic-Tac-Toe';
  expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
});
