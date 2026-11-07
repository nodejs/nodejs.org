import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeToggle from '../';

const noop = () => {};

const defaultLabels = { system: 'System', light: 'Light', dark: 'Dark' };

describe('ThemeToggle', () => {
  global.ResizeObserver = class {
    observe = noop;
    unobserve = noop;
    disconnect = noop;
  };

  it('renders the trigger button with the given aria-label', () => {
    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        themeLabels={defaultLabels}
      />
    );

    assert.ok(screen.getByRole('button', { name: 'Select theme' }));
  });

  it('opens the dropdown when the trigger is clicked', async () => {
    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        themeLabels={defaultLabels}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));

    assert.ok(screen.getByText('System'));
    assert.ok(screen.getByText('Light'));
    assert.ok(screen.getByText('Dark'));
  });

  it('calls onChange with "light" when the Light option is clicked', async () => {
    let selected = null;

    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        onChange={theme => {
          selected = theme;
        }}
        themeLabels={defaultLabels}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));
    await userEvent.click(screen.getByText('Light'));

    assert.equal(selected, 'light');
  });

  it('calls onChange with "dark" when the Dark option is clicked', async () => {
    let selected = null;

    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        onChange={theme => {
          selected = theme;
        }}
        themeLabels={defaultLabels}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));
    await userEvent.click(screen.getByText('Dark'));

    assert.equal(selected, 'dark');
  });

  it('calls onChange with "system" when the System option is clicked', async () => {
    let selected = null;

    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="light"
        onChange={theme => {
          selected = theme;
        }}
        themeLabels={defaultLabels}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));
    await userEvent.click(screen.getByText('System'));

    assert.equal(selected, 'system');
  });

  it('renders the footer slot when provided', async () => {
    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        themeLabels={defaultLabels}
        footer={<span>Use ⌘+L for Light, ⌘+D for Dark</span>}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));

    assert.ok(
      screen.getByText('Use ⌘+L for Light, ⌘+D for Dark'),
      'footer content should be rendered inside the dropdown'
    );

    const footerId = screen.getByRole('menu').getAttribute('aria-describedby');
    assert.ok(
      footerId,
      'menu content should reference the footer via aria-describedby'
    );
    assert.equal(
      document.getElementById(footerId)?.textContent,
      'Use ⌘+L for Light, ⌘+D for Dark',
      'aria-describedby should point to the footer element'
    );
  });

  it('does not render a footer separator when no footer is provided', async () => {
    render(
      <ThemeToggle
        ariaLabel="Select theme"
        currentTheme="system"
        themeLabels={defaultLabels}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Select theme' }));

    assert.equal(
      document.querySelector('[class*="dropDownFooter"]'),
      null,
      'footer element should not exist without the footer prop'
    );
    assert.equal(
      screen.getByRole('menu').getAttribute('aria-describedby'),
      null,
      'menu content should not reference a footer without the footer prop'
    );
  });
});
