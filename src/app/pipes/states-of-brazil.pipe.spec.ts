import { EstadosDoBrasil } from './../utility.service';
import { StatesOfBrazilPipe } from './states-of-brazil.pipe';

describe('StatesOfBrazilPipe', () => {
  it('create an instance', () => {
    const pipe = new StatesOfBrazilPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sp', () => {
    const states = EstadosDoBrasil;
    const pipe = new StatesOfBrazilPipe();
    const state = 'sp';

    const ret = pipe.transform(state);

    expect(ret).toBe(states[state.toUpperCase()]);
  });

  it('should pr', () => {
    const states = EstadosDoBrasil;
    const pipe = new StatesOfBrazilPipe();
    const state = 'PR';

    const ret = pipe.transform(state);

    expect(ret).toBe(states[state.toUpperCase()]);
  });

  it('should mt', () => {
    const states = EstadosDoBrasil;
    const pipe = new StatesOfBrazilPipe();
    const state = 'mt';

    const ret = pipe.transform(state);

    expect(ret).toBe(states[state.toUpperCase()]);
  });

  it('should mx', () => {
    const pipe = new StatesOfBrazilPipe();
    const state = 'mx';

    const ret = pipe.transform(state);

    expect(ret).toBe('MX');
  });

  it('should null', () => {
    const pipe = new StatesOfBrazilPipe();
    const state = null;

    const ret = pipe.transform(state);

    expect(ret).toBe(null);
  });
});
