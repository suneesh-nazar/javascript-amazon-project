import formatCurrency from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('converts cents to Dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cents', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cents', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  it('works with negative value', () => {
    expect(formatCurrency(-100)).toEqual('-1.00');
  });
});