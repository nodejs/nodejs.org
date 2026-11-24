import assert from 'node:assert/strict';
import { beforeEach, describe, it, mock } from 'node:test';

import { act, render } from '@testing-library/react';

mock.module('next/navigation', {
  namedExports: { usePathname: () => '/en/about' },
});

const { default: useCarbonAd } = await import('#site/hooks/useCarbonAd');

const ad = {
  company: 'Company',
  description: 'Description',
  callToAction: 'Learn more',
  statlink: 'https://srv.buysellads.com/ads/click/x/1',
  statview: 'https://srv.buysellads.com/ads/view/x/1',
};

let requests;
let observers;
let beacons;

class FakeIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    observers.push(this);
  }

  observe() {}

  disconnect() {
    this.disconnected = true;
  }
}

const intersect = ratio =>
  act(() => {
    for (const observer of observers.filter(o => !o.disconnected)) {
      observer.callback([{ intersectionRatio: ratio }]);
    }
  });

// Lets pending fetch promises and their React state updates settle
const flush = () => act(() => new Promise(resolve => setTimeout(resolve, 0)));

const Probe = () => {
  const { ad, ref } = useCarbonAd('CWBI6KJY');

  return ad ? <div ref={ref}>{ad.company}</div> : null;
};

const renderAd = async t => {
  render(<Probe />);
  await flush();

  t.mock.timers.enable({ apis: ['setTimeout'] });
};

beforeEach(() => {
  requests = [];
  observers = [];
  beacons = [];

  mock.method(globalThis, 'fetch', async url => {
    requests.push(new URL(url));

    return { ok: true, json: async () => ({ ads: [ad] }) };
  });

  window.matchMedia = () => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {},
  });

  globalThis.IntersectionObserver = FakeIntersectionObserver;

  globalThis.Image = class {
    set src(value) {
      beacons.push(value);
    }
  };
});

describe('useCarbonAd', () => {
  it('does not count impressions outside production', async () => {
    render(<Probe />);
    await flush();

    assert.equal(requests.length, 1);
    assert.equal(requests[0].searchParams.get('ignore'), 'yes');
  });

  describe('loading', () => {
    const LoadingProbe = () => {
      const { ad, loading } = useCarbonAd('CWBI6KJY');

      return <div>{`${loading}:${ad?.company}`}</div>;
    };

    const respondWith = implementation => {
      globalThis.fetch.mock.mockImplementation(implementation);
    };

    it('is true until the ad has loaded', async () => {
      const { container } = render(<LoadingProbe />);

      assert.equal(container.textContent, 'true:undefined');

      await flush();

      assert.equal(container.textContent, 'false:Company');
    });

    it('is false after an empty response', async () => {
      respondWith(async () => ({ ok: true, json: async () => ({ ads: [] }) }));

      const { container } = render(<LoadingProbe />);
      await flush();

      assert.equal(container.textContent, 'false:undefined');
    });

    it('is false after an error response', async () => {
      respondWith(async () => ({ ok: false }));

      const { container } = render(<LoadingProbe />);
      await flush();

      assert.equal(container.textContent, 'false:undefined');
    });

    it('is false after a failed request', async () => {
      respondWith(async () => {
        throw new TypeError('Failed to fetch');
      });

      const { container } = render(<LoadingProbe />);
      await flush();

      assert.equal(container.textContent, 'false:undefined');
    });
  });

  describe('validation', () => {
    const ValidationProbe = () => {
      const { ad } = useCarbonAd('CWBI6KJY');

      return <div>{ad ? 'ad' : 'no ad'}</div>;
    };

    const renderWith = async creative => {
      globalThis.fetch.mock.mockImplementation(async () => ({
        ok: true,
        json: async () => ({ ads: [creative] }),
      }));

      const { container } = render(<ValidationProbe />);
      await flush();

      return container.textContent;
    };

    it('accepts an ad without a title', async () => {
      assert.equal(await renderWith(ad), 'ad');
    });

    it('accepts an ad with a title', async () => {
      assert.equal(await renderWith({ ...ad, title: 'Title' }), 'ad');
    });

    for (const field of ['statlink', 'description', 'callToAction']) {
      it(`rejects a missing ${field}`, async () => {
        assert.equal(await renderWith({ ...ad, [field]: undefined }), 'no ad');
      });

      it(`rejects a non-string ${field}`, async () => {
        assert.equal(await renderWith({ ...ad, [field]: { a: 1 } }), 'no ad');
      });
    }

    it('rejects a non-string title', async () => {
      assert.equal(await renderWith({ ...ad, title: { a: 1 } }), 'no ad');
    });

    it('rejects an empty creative', async () => {
      assert.equal(await renderWith({}), 'no ad');
    });
  });

  it('sends the view beacon after the ad was at least 50% visible for one second', async t => {
    await renderAd(t);

    intersect(0.5);
    t.mock.timers.tick(999);

    assert.deepEqual(beacons, []);

    t.mock.timers.tick(1);

    assert.deepEqual(beacons, [ad.statview]);
  });

  it('does not send the view beacon when the ad stops being visible within one second', async t => {
    await renderAd(t);

    intersect(1);
    t.mock.timers.tick(500);
    intersect(0.4);
    t.mock.timers.tick(5000);

    assert.deepEqual(beacons, []);
  });

  it('sends the view beacon only once per ad', async t => {
    await renderAd(t);

    for (let i = 0; i < 3; i++) {
      intersect(1);
      t.mock.timers.tick(1000);
    }

    assert.equal(beacons.length, 1);
  });
});
