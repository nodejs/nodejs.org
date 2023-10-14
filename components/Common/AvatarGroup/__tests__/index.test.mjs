import { render, fireEvent } from '@testing-library/react';

import { githubProfileAvatarUrl } from '@/util/github';

import AvatarGroup from '../index';

const names = [
  'ovflowd',
  'bmuenzenmeyer',
  'AugustinMauroy',
  'HinataKah0',
  'Harkunwar',
  'rodion-arr',
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
  src: githubProfileAvatarUrl(name),
  alt: name,
}));

describe('AvatarGroup component', () => {
  it('renders the AvatarGroup component properly', () => {
    const { getByText } = render(<AvatarGroup avatars={avatars} limit={2} />);

    const showMoreButton = getByText('+12');
    expect(showMoreButton).toBeInTheDocument();
  });

  it('displays the rest of the avatars when "show more" button is clicked', () => {
    const { getByText } = render(<AvatarGroup avatars={avatars} limit={2} />);

    const showMoreButton = getByText('+12');
    fireEvent.click(showMoreButton);

    const hideMoreButton = getByText('-');
    expect(hideMoreButton).toBeInTheDocument();
  });
});
