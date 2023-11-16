import { getNodeApiLink } from '../getNodeApiLink';

describe('getNodeApiLink', () => {
  it('returns the correct API link for versions >=0.3.1 and <0.5.1', () => {
    const version = '0.4.0';
    const expectedLink = `https://nodejs.org/docs/${version}/api/`;

    const result = getNodeApiLink(version);

    expect(result).toBe(expectedLink);
  });

  it('returns the correct API link for versions >=0.1.14 and <0.3.1', () => {
    const version = '0.2.0';
    const expectedLink = `https://nodejs.org/docs/${version}/api.html`;

    const result = getNodeApiLink(version);

    expect(result).toBe(expectedLink);
  });

  it('returns the correct API link for versions >=1.0.0 and <4.0.0', () => {
    const version = '2.3.0';
    const expectedLink = `https://iojs.org/dist/${version}/docs/api/`;

    const result = getNodeApiLink(version);

    expect(result).toBe(expectedLink);
  });

  it('returns the correct API link for other versions', () => {
    const version = '5.0.0';
    const expectedLink = `https://nodejs.org/dist/${version}/docs/api/`;

    const result = getNodeApiLink(version);

    expect(result).toBe(expectedLink);
  });
});
