import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('QuoteCard', () => {
  it('renders quote and author', () => {
    render(
      <QuoteCard quote={{ text: { en: 'Test quote' }, author: { en: 'Tester' } }} />,
    );

    expect(screen.getByText(/Test quote/)).toBeInTheDocument();
    expect(screen.getByText(/Tester/)).toBeInTheDocument();
  });
});
