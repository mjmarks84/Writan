import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Editor } from '../Editor';

describe('Editor component', () => {
  it('renders and updates text input', () => {
    const onChange = jest.fn();
    render(<Editor value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('editor-input'), { target: { value: 'hello' } });

    expect(screen.getByLabelText('bold')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith('hello');
  });
});
