import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

import SkipToContentButton from '../';

describe('SkipToContentButton', () => {
  it('renders with correct label', () => {
    render(<SkipToContentButton label="Skip to content" />);
    const link = screen.getByRole('link', { name: 'Skip to content' });
    assert.ok(link);
  });
});
