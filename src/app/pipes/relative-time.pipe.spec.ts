import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  it('create an instance', () => {
    const pipe = new RelativeTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should nunca', () => {
    const pipe = new RelativeTimePipe();

    const ret = pipe.transform(null);

    expect(ret).toBe('Nunca');
  });

  it('should instanceofdate', () => {
    const pipe = new RelativeTimePipe();

    const date = new Date('2019-04-15 21:15:04');

    const ret = pipe.transform(date);

    expect(ret).not.toBeNull();
  });

  it('should not instanceofdate', () => {
    const pipe = new RelativeTimePipe();

    const date = '2019-04-15 21:15:04';

    const ret = (pipe as any).transform(date);

    expect(ret).not.toBeNull();
  });
});
