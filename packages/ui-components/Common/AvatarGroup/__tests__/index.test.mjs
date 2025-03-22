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
    expect(showMoreButton).toBeInTheDocument();
  });

  it('displays the rest of the avatars when "show more" button is clicked', () => {
    const { getByText } = render(
      <AvatarGroup avatars={avatars} limit={limit} />
    );

    const showMoreButton = getByText(`+${remaining}`);
    fireEvent.click(showMoreButton);

    const hideMoreButton = getByText(`-${remaining}`);
    expect(hideMoreButton).toBeInTheDocument();
  });
});
