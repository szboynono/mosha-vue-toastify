import * as testFile from '../lib/util';
import * as Vue from 'vue';

test('withProps() should pass props to the component', () => {
  jest.spyOn(Vue, 'createVNode').mockImplementation(jest.fn())
  testFile.withProps({} as any, { test: 'test' } as any)
  expect(Vue.createVNode).toHaveBeenCalled()
})