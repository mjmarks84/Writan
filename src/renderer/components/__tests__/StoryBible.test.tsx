import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoryBible } from '../StoryBible';

describe('StoryBible component', () => {
  it('renders entries', () => {
    render(<StoryBible entries={['Hero', 'Villain']} />);

    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Villain')).toBeInTheDocument();
  });
});
