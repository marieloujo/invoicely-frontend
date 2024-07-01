import { CurrencyXofPipe } from './currency-xof.pipe';

describe('CurrencyXofPipe', () => {
  let pipe: CurrencyXofPipe;

  beforeEach(() => {
    pipe = new CurrencyXofPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the number correctly', () => {
    expect(pipe.transform(100000)).toBe('100 000 FCFA');
  });

  it('should handle null and undefined values', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should handle non-number values', () => {
    expect(pipe.transform(NaN)).toBe('');
  });
});
