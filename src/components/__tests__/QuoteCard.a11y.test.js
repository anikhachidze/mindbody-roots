import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import QuoteCard from '../QuoteCard';

jest.mock('@/context/PreferencesContext', () => ({
  usePreferences: () => ({ locale: 'en' }),
}));

jest.mock('@/lib/i18n', () => ({
  localize: (value, locale) => {
    if (value && typeof value === 'object') return value[locale] || value.en;
    return value;
  },
}));

describe('QuoteCard accessibility', () => {
  it('has no detectable a11y violations', async () => {
    const { container } = render(
      <QuoteCard quote={{ text: { en: 'Accessible quote' }, author: { en: 'Author' } }} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
