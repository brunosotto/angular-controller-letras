import { FirstCapitalPhrasePipe } from './first-capital-phrase.pipe';

describe('FirstCapitalPhrasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstCapitalPhrasePipe();
    pipe.transform('SP');
    expect(pipe).toBeTruthy();
  });
});
