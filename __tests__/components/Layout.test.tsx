import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Layout } from '@app/components/Layout';
import { createMuiTheme } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

describe('components/Layout', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const { baseElement } = render(<Layout />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with title', async () => {
    const { baseElement } = render(<Layout title='Title' />);

    expect(baseElement).toMatchSnapshot();
  });

  it('opens sidebar when click Menu icon', async () => {
    const theme = createMuiTheme({
      props: {
        MuiWithWidth: {
          initialWidth: 'xs',
        },
      },
    });
    const { getByTestId } = render(
      <MuiThemeProvider theme={theme}>
        <Layout title='Title' />
      </MuiThemeProvider>,
    );
    fireEvent.click(getByTestId('menu-icon'));

    expect(getByTestId('sidebar')).toBeDefined();
    expect(getByTestId('sidebar').getAttribute('aria-hidden')).not.toBe('true');
  });

  it('closes sidebar when click a page link', async () => {
    const theme = createMuiTheme({
      props: {
        MuiWithWidth: {
          initialWidth: 'xs',
        },
      },
    });
    const { getByTestId } = render(
      <MuiThemeProvider theme={theme}>
        <Layout title='Title' />
      </MuiThemeProvider>,
    );
    fireEvent.click(getByTestId('menu-icon'));
    const backdrop = getByTestId('sidebar').querySelector('.MuiBackdrop-root');
    if (!backdrop) {
      expect(true).toEqual(false);
      return;
    }
    fireEvent.click(backdrop);

    expect(getByTestId('sidebar').getAttribute('aria-hidden')).toBe('true');
  });
});
