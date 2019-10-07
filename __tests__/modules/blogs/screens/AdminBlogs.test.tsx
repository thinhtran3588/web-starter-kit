import React from 'react';
import { render } from '@testing-library/react';
import { AdminBlogs } from '@app/modules/blogs/screens/AdminBlogs';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/AdminBlogs/screens/AdminBlogs', () => {
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
        <AdminBlogs />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
