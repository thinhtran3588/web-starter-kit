import React from 'react';
import { render } from '@testing-library/react';
import { FormHeader } from '@app/components';

describe('components/FormHeader', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    const createUser = jest.fn();
    const { baseElement } = render(
      <FormHeader
        title={'title'}
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
