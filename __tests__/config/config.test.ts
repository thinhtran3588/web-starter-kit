import { config } from '@app/config';

describe('pages/Index', () => {
  beforeEach(() => {});

  it('renders successfully', async () => {
    expect(config).toMatchSnapshot();
  });
});
