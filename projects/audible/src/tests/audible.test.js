import 'jest';
import webFetch from '../file-fetcher/web-file-fetcher';
import localFetch from '../file-fetcher/local-file-fetcher';

import audible from '../audible';

describe('audible', () => {
  it('gathers from web per default', () => {
    webFetch.get = jest.fn(() => Promise.resolve({}));
    localFetch.get = jest.fn(() => Promise.resolve({}));

    audible.call({}, {});

    expect(webFetch.get.mock.calls.length).toBe(1);
    expect(localFetch.get.mock.calls.length).toBe(0);
  });

  it('gathers from local system if configured', () => {
    webFetch.get = jest.fn(() => Promise.resolve({}));
    localFetch.get = jest.fn(() => Promise.resolve({}));

    audible.call({ host: 'local' }, {});

    expect(webFetch.get.mock.calls.length).toBe(0);
    expect(localFetch.get.mock.calls.length).toBe(1);
  });
  
  it('keeps existing vue options', async () => {
    webFetch.get = jest.fn(() => Promise.resolve({}));
    const alteredVueOptions = await audible.call({ }, { existingProp: true });
    expect(alteredVueOptions).toHaveProperty('existingProp');
  });

  it('returns passed vue options if an error happens during config fetching', async () => {
    webFetch.get = jest.fn(() => Promise.resolve(() => { throw new Error() }));
    const previousConfig = { existingProp: true }
    const alteredVueOptions = await audible.call({ }, previousConfig);
    expect(alteredVueOptions).toEqual(previousConfig);
  })
})