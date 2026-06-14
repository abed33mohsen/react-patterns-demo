export function getCounterStatus(counter) {
  if (counter > 0) {
    return {
      isPositive: true,
      isNegative: false,
      label: 'Positive value',
    };
  }

  if (counter < 0) {
    return {
      isPositive: false,
      isNegative: true,
      label: 'Negative value',
    };
  }

  return {
    isPositive: false,
    isNegative: false,
    label: 'Balanced value',
  };
}
