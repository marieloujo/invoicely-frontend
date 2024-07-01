import { DatePipe } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';

describe('CustomDatePipe', () => {
  let pipe: CustomDatePipe;

  beforeEach(() => {
    pipe = new CustomDatePipe(new DatePipe('en-US'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the date correctly', () => {
    expect(pipe.transform('30/06/2024')).toBe('30 Jun, 2024');
  });

  it('should return null for invalid date', () => {
    expect(pipe.transform('')).toBeNull();
  });
});
