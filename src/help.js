export function generateRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function generateRandomOperation() {
  const number = generateRandomNumber(0, 2);
  return ['+', '-', '*'][number];
}

export function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return function d(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

export function getGcd(a, b) {
  if (!b) {
    return a;
  }

  return getGcd(b, a % b);
}

export const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => acc.then(fn),
  Promise.resolve(x));
