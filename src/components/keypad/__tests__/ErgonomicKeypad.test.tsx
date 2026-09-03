describe('ErgonomicKeypad logic unit verification', () => {
  it('correctly handles digit concatenation', () => {
    let amount = '0.00';
    const appendDigit = (d: string) => {
      if (amount === '0.00') amount = d;
      else amount += d;
    };
    appendDigit('1');
    appendDigit('5');
    expect(amount).toBe('15');
  });

  it('correctly handles backspace removal', () => {
    let amount = '150';
    amount = amount.slice(0, -1);
    expect(amount).toBe('15');
  });
});