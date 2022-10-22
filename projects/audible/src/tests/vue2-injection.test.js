import { mount } from 'vue-test-utils';
import audible from '../audible';
import webFetch from '../file-fetcher/web-file-fetcher';

describe('vue 2 provide/inject target', () => {
  it('properly injects the configuration', async () => {
    webFetch.get = jest.fn(() => Promise.resolve({
      testValue: 'expected value'
    }));

    const TestComponent = {
      inject: ['$configuration'],
      data: function() {
        return {
          testValue: this.$configuration.testValue
        }
      }
    }

    const options = await audible.call({ target: 'inject' }, {});
    const underTest = mount(TestComponent, options);
    expect(underTest.vm.$data.testValue).toEqual('expected value');
  })
})