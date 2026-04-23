import { renderHook, act } from '@testing-library/react';
import { useEditor } from '../useEditor';

describe('useEditor', () => {
  it('updates and clears editor value', () => {
    const { result } = renderHook(() => useEditor('start'));

    act(() => result.current.setValue('next'));
    expect(result.current.value).toBe('next');

    act(() => result.current.clear());
    expect(result.current.value).toBe('');
  });
});
