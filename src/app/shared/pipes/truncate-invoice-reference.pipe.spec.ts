import { TruncateInvoiceReferencePipe } from './truncate-invoice-reference.pipe';

describe('TruncateInvoiceReferencePipe', () => {
  let pipe: TruncateInvoiceReferencePipe;

  beforeEach(() => {
    pipe = new TruncateInvoiceReferencePipe();
  });

  it('create an instance', () => {
    const pipe = new TruncateInvoiceReferencePipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate the invoice ID correctly', () => {
    expect(pipe.transform('INV-C042CA8BEC982D91')).toBe('INV-C042CA');
  });

  it('should not truncate if the invoice ID is shorter than expected', () => {
    expect(pipe.transform('INV-123')).toBe('INV-123');
  });

  it('should return the original string if it does not start with INV-', () => {
    expect(pipe.transform('ABC-C042CA8BEC982D91')).toBe('ABC-C042CA8BEC982D91');
  });
});
