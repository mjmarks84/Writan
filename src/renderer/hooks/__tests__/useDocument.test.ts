import { renderHook } from '@testing-library/react';
import { useDocument } from '../useDocument';

describe('useDocument', () => {
  it('builds document slug', () => {
    const { result } = renderHook(() => useDocument('doc1', 'My Chapter'));

    expect(result.current.slug).toBe('doc1-my-chapter');
  });
});
