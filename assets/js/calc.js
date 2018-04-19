export function percentage(numerator, denominator, places) {
  let p = 0
  if (numerator !== 0 && denominator !== 0) {
    p = numerator / denominator * 100
    if (p > 100) {
      p = 100
    }
  }
  return p.toFixed(places)
}

