import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from './wrapper';

describe('Wrapper', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Wrapper />);
    const wrapperElement = getByTestId('wrapper');
    expect(wrapperElement).toBeInTheDocument();
    expect(wrapperElement).toHaveStyle(`
      box-sizing: border-box;
      font-family: "Opensans light";
      overflow-y: scroll;
      height: calc(100vh - 200px);
      height: 100vh;
      max-height: 100vh;
      position: fixed;
      padding: 36px 0 36px 36px;
      border: none;
    `);
  });
});
