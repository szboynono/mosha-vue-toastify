import useCustomStyle from '../../lib/hooks/useCustomStyle';

describe('useCustomStyle', () => {
  test('should return the correct style for top-right', () => {
    const hook = useCustomStyle('top-right', 100, '')
    expect(hook.customStyle.value).toEqual({ right: '0', top: '100px' });
  })

  test('should return the correct style for top-left', () => {
    const hook = useCustomStyle('top-left', 100, '')
    expect(hook.customStyle.value).toEqual({ left: '0', top: '100px' });
  })

  test('should return the correct style for bottom-left', () => {
    const hook = useCustomStyle('bottom-left', 100, '')
    expect(hook.customStyle.value).toEqual({ left: '0', bottom: '100px' });
  })

  test('should return the correct style for bottom-right', () => {
    const hook = useCustomStyle('bottom-right', 100, '')
    expect(hook.customStyle.value).toEqual({ right: '0', bottom: '100px' });
  })

  test('should return the correct style for bottom-center', () => {
    const hook = useCustomStyle('bottom-center', 100, '')
    expect(hook.customStyle.value).toEqual({
      right: '0', left: '0', bottom: '100px', marginRight: 'auto',
      marginLeft: 'auto'
    });
  })
  

  test('should return the correct style for top-center', () => {
    const hook = useCustomStyle('top-center', 100, 'red')
    expect(hook.customStyle.value).toEqual({
      right: '0', left: '0', top: '100px', marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor : 'red'
    });
  })
})