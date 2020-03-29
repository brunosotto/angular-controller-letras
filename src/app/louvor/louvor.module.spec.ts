import { LouvorModule } from './louvor.module';

describe('LouvorModule', () => {
  let louvorModule: LouvorModule;

  beforeEach(() => {
    louvorModule = new LouvorModule();
  });

  it('should create an instance', () => {
    expect(louvorModule).toBeTruthy();
  });
});
