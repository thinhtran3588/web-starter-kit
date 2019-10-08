import React from 'react';
import { render } from '@testing-library/react';
import { FormHeader } from '@app/components';

describe('components/FormHeader', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const createUser = jest.fn();
    const { baseElement } = render(
      <FormHeader
        breadcrumbLinks={[
          {
            text: 'Auth',
            link: '/admin/users',
          },
          {
            text: 'Users',
          },
        ]}
        commandButtons={[
          {
            text: 'Create',
            onClick: createUser,
            color: 'primary',
          },
        ]}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
