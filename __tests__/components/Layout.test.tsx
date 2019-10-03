import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Layout } from '@app/components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('components/Layout', () => {
  const theme = createMuiTheme({
    props: {
      MuiWithWidth: {
        initialWidth: 'xs',
      },
    },
  });
  beforeEach(() => {});
  it('renders successfully', async () => {
    const { baseElement } = render(
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with title', async () => {
    const { baseElement } = render(
      <MuiThemeProvider theme={theme}>
        <Layout title='Title' />
      </MuiThemeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('opens sidebar when clicking Menu icon', async () => {
    const { getByTestId } = render(
      <MuiThemeProvider theme={theme}>
        <Layout title='Title' />
      </MuiThemeProvider>,
    );
    fireEvent.click(getByTestId('menu-icon'));

    expect(getByTestId('sidebar')).toBeDefined();
    expect(getByTestId('sidebar').getAttribute('aria-hidden')).not.toBe('true');
  });

  it('closes sidebar when clicking sidebar backdrop', async () => {
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
