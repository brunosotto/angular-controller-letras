import { ShowDatePipe, ShowDatePipeOptions } from './show-date.pipe';

describe('ShowDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ShowDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should Nunca', () => {
    const pipe = new ShowDatePipe();
    const date = null;

    const ret = pipe.transform(date);

    expect(ret).toBe('Nunca');
  });

  it('should data', () => {
    const pipe = new ShowDatePipe();
    const date = new Date(1985, 0, 21, 23, 19, 0);

    const ret = pipe.transform(date);

    expect(ret).toBe('21/01/1985 - 23h19');
  });

  it('should só data', () => {
    const pipe = new ShowDatePipe();
    const date = new Date(1985, 0, 21, 23, 19, 0);

    const options: ShowDatePipeOptions = {
      noTime: true
    };

    const ret = pipe.transform(date, options);

    expect(ret).toBe('21/01/1985');
  });
});
