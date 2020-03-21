import { MascarasModule } from './mascaras.module';

describe('MascarasModule', () => {
  let mascarasModule: MascarasModule;

  beforeEach(() => {
    mascarasModule = new MascarasModule();
  });

  it('should create an instance', () => {
    expect(mascarasModule).toBeTruthy();
  });
});
