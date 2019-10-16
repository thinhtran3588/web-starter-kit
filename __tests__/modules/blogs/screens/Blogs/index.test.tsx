import React from 'react';
import { render } from '@testing-library/react';
import { Blogs } from '@app/modules/blogs/screens/Blogs';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

describe('@app/modules/blogs/screens/Blogs', () => {
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
        <Blogs />
      </MuiThemeProvider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
