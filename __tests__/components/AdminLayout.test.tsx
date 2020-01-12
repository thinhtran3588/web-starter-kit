import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AdminLayout } from '@app/components';
import { TestBaseComponent } from '@test/helpers/TestBaseComponent';

jest.mock('@material-ui/core/useMediaQuery', () => () => false);

describe('components/AdminLayout', () => {
  beforeEach(() => {});
  it('renders successfully', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <AdminLayout userMenuItems={[]} />
      </TestBaseComponent>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with title', async () => {
    const { baseElement } = render(
      <TestBaseComponent>
        <AdminLayout title='Title' userMenuItems={[]} />
      </TestBaseComponent>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('opens sidebar when clicking Menu icon', async () => {
    const { getByTestId } = render(
      <TestBaseComponent>
        <AdminLayout title='Title' userMenuItems={[]} />
      </TestBaseComponent>,
    );
    fireEvent.click(getByTestId('menu-icon'));

    expect(getByTestId('sidebar')).toBeDefined();
    expect(getByTestId('sidebar').getAttribute('aria-hidden')).not.toBe('true');
  });

  it('closes sidebar when clicking sidebar backdrop', async () => {
    const { getByTestId } = render(
      <TestBaseComponent>
        <AdminLayout title='Title' userMenuItems={[]} />
      </TestBaseComponent>,
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
