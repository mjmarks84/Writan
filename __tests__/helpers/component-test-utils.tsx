import React, { type ReactElement } from 'react';
import { render } from '@testing-library/react';

export const renderWithProviders = (ui: ReactElement) => {
  return render(<>{ui}</>);
};
