// REACT
import React from 'react';
// PACKAGES
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
// COMPONENTS
import App from '../App';
// ASSETS
import { resources } from '../i18n';

beforeEach(() => {
  render(<App />)
})

describe('using theme button', () => {
  test('switches to dark mode', () => {
    var themeToggleButton = screen.getByTestId('theming-button');

    fireEvent.click(themeToggleButton);

    expect(document.body.className).toContain('dark-mode');
  });

  test('switches back to default mode', () => {
    var themeToggleButton = screen.getByTestId('theming-button');

    fireEvent.click(themeToggleButton);

    expect(document.body.className).not.toContain('dark-mode');
  });
});

describe('changing display language', () => {
  test('French button renders layout in French', () => {
    var frButton = screen.getByTestId('button-to-fr');
    var frTitle = resources['fr-CA']['translation']['Available Parking'];

    fireEvent.click(frButton);

    frTitle = screen.getAllByText(frTitle);

    expect(frTitle[0]).toBeInTheDocument();
  });

  test('Spanish button renders layout in Spanish', () => {
    var esButton = screen.getByTestId('button-to-es');
    var esTitle = resources['es-MX']['translation']['Available Parking'];

    fireEvent.click(esButton);

    esTitle = screen.getAllByText(esTitle);

    expect(esTitle[0]).toBeInTheDocument();
  });

  test('English button renders layout in English', () => {
    var enButton = screen.getByTestId('button-to-en');
    var enTitle = resources['en-US']['translation']['Available Parking'];

    fireEvent.click(enButton);

    enTitle = screen.getAllByText(enTitle);

    expect(enTitle[0]).toBeInTheDocument();
  });
});