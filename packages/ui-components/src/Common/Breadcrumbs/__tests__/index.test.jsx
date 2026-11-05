import { render } from '@testing-library/react';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Breadcrumbs from '..';

const links = [
  { label: 'Learn', href: '/learn' },
  { label: 'Getting Started', href: '/learn/getting-started' },
  { label: 'Introduction', href: '/learn/getting-started/intro' },
  { label: 'Installation', href: '/learn/getting-started/intro/installation' },
];

const classesOf = container =>
  [...container.querySelectorAll('li')].map(item => item.className);

describe('Breadcrumbs', () => {
  it('truncates the leading links beyond `maxLength`', () => {
    const { container, getByText } = render(
      <Breadcrumbs links={links} as="a" maxLength={3} />
    );

    assert.ok(getByText('…'));

    for (const label of ['Learn', 'Getting Started', 'Introduction']) {
      assert.ok(
        getByText(label).closest('li').className.includes('visuallyHidden')
      );
    }

    assert.ok(
      !getByText('Installation')
        .closest('li')
        .className.includes('visuallyHidden')
    );
    assert.ok(classesOf(container).every(c => !c.includes('mobileOnly')));
  });

  it('truncates more on mobile through CSS alone', () => {
    const { getByText } = render(
      <Breadcrumbs links={links} as="a" maxLength={5} mobileMaxLength={2} />
    );

    const truncated = getByText('…').closest('li');

    assert.ok(truncated.className.includes('mobileOnly'));
    assert.ok(
      getByText('Learn').closest('li').className.includes('hiddenOnMobile')
    );
    assert.ok(
      getByText('Introduction')
        .closest('li')
        .className.includes('hiddenOnMobile')
    );
    assert.ok(
      !getByText('Installation')
        .closest('li')
        .className.includes('hiddenOnMobile')
    );
    assert.ok(
      !getByText('Learn').closest('li').className.includes('visuallyHidden')
    );
  });
});
