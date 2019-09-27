import { theme } from '@app/core/theme';

describe('core/theme', () => {
  it('runs successfully', async () => {
    expect(theme).toMatchSnapshot();
  });
});
