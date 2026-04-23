import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AIPanel } from '../AIPanel';

describe('AIPanel component', () => {
  it('triggers generation action', () => {
    const onGenerate = jest.fn();
    render(<AIPanel onGenerate={onGenerate} />);

    fireEvent.click(screen.getByRole('button', { name: 'Generate Suggestion' }));

    expect(onGenerate).toHaveBeenCalled();
  });
});
