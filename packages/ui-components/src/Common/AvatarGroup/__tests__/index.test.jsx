import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, fireEvent } from '@testing-library/react';

import AvatarGroup from '../index';

const names = [
  'ovflowd',
  'bmuenzenmeyer',
  'AugustinMauroy',
  'HinataKah0',
  'Harkunwar',
  'rodion-arr',
  'avivkeller',
  'mikeesto',
  'bnb',
  'benhalverson',
  'aymen94',
  'shanpriyan',
  'Wai-Dung',
  'manishprivet',
  'araujogui',
];

const avatars = names.map(name => ({
  image: `https://avatars.githubusercontent.com/${name}`,
  nickname: name,
}));

const limit = 2;
const remaining = names.length - limit;

describe('AvatarGroup', () => {
  it('renders the AvatarGroup component properly', () => {
    const { getByText } = render(
      <AvatarGroup avatars={avatars} limit={limit} />
    );

    const showMoreButton = getByText(`+${remaining}`);
    assert.ok(showMoreButton.ownerDocument);
  });

  it('displays the rest of the avatars when "show more" button is clicked', () => {
    const { getByText } = render(
      <AvatarGroup avatars={avatars} limit={limit} />
    );

    const showMoreButton = getByText(`+${remaining}`);
    fireEvent.click(showMoreButton);

    const hideMoreButton = getByText(`-${remaining}`);
    assert.ok(hideMoreButton.ownerDocument);
  });
});

describe('AvatarGroup on compact screens', () => {
  const noop = () => {};

  it('applies the compact limit when the compact media query matches', () => {
    const { matchMedia } = window;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: true,
        media: query,
        addEventListener: noop,
        removeEventListener: noop,
      }),
    });

    const { getByText } = render(
      <AvatarGroup avatars={avatars} limit={8} compactLimit={5} />
    );

    assert.ok(getByText(`+${names.length - 5}`).ownerDocument);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    });
  });
});
