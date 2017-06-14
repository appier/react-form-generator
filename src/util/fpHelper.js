//monad
export const Box = x =>
({
  ap: other => other.map(x),
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

export const Right = x =>
({
  chain: f => f(x),
  ap: other => other.map(x),
  traverse: (of, f) => f(x).map(Right),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

export const Left = x =>
({
  chain: f => Left(x),
  ap: other => Left(x),
  traverse: (of, f) => of(Left(x)),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

export const fromNullable = x =>
  x != null ? Right(x) : Left(null)

export const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}


// helper
export const True = () => true;
export const False = () => false;

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

export const curry = (f, ...args) =>
  (f.length <= args.length) ? f(...args) : (...more) => curry(f, ...args, ...more);

export const flip = fn => (...fns) => fn(...fns.reverse());

export const pipe = flip(compose);

export const ifElse = pred => onTrue => onFalse => d => pred(d) ? onTrue(d) : onFalse(d);
export const identity = d => d;
export const thunk = d => () => d;
export const first = d => d[0];
export const equal = a => b => a === b;
export const not = fn => x => !fn(x);
export const and = fa => fb => x => fa(x) && fb(x);
export const or = fa => fb => x => fa(x) || fb(x);
export const xor = fa => fb => x =>  (fa(x) && !fb(x)) || (!fa(x) && fb(x));
export const props = field => x => x[field];
export const map = fn => x => x.map(fn);
export const filter = fn => x => x.filter(fn);
export const reduce = fn => init => x => x.reduce((acc, d)=>fn(acc)(d), init);
export const some = fn => x => x.some(fn);
export const every = fn => x => x.every(fn);


export const peek = tag => d => {
  const msg = typeof d === 'object' ? JSON.stringify(d, null, 2) : String(d);
  console.log(tag, msg);
  return d;
}
