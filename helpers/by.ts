import { isRecord, isArray, isFunction, isNil } from './check.ts';

export type ArRecKey<T> = undefined | null | keyof T | ((item: T, index: number) => any);
export type ArRecVal<T, U> = undefined | null | keyof T | ((item: T, index: number) => U);
export type RecKey<T> = undefined | null | keyof T | ((item: T, key: string) => any);
export type RecVal<T, U> = undefined | null | keyof T | ((item: T, key: string) => U);

interface GroupBy {
  <T>(items: T[], key?: ArRecKey<T>): Record<string, T[]>;
  <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U[]>;
  <T>(record: Record<string, T>, key?: RecKey<T>): Record<string, T[]>;
  <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U[]>;
}

interface By {
  <T>(items: T[], key?: ArRecKey<T>): Record<string, T>;
  <T, U>(items: T[], key: ArRecKey<T>, val: ArRecVal<T, U>): Record<string, U>;
  <T>(record: Record<string, T>, key?: RecKey<T>): Record<string, T>;
  <T, U>(record: Record<string, T>, key: RecKey<T>, val: RecVal<T, U>): Record<string, U>;
}

interface ById {
  <T extends { id?: string }>(items: T[]): Record<string, T>;
  <T extends { id?: string }, U>(items: T[], val: ArRecVal<T, U>): Record<string, U>;
  <T extends { id?: string }>(record: Record<string, T>): Record<string, T>;
  <T extends { id?: string }, U>(record: Record<string, T>, val: RecVal<T, U>): Record<string, U>;
}

const _groupBy = (items: any, key: any, val: any, add: any) => {
  const getK: (item: any, index: any) => any = isFunction(key) ? key : isNil(key) ? (i: any) => i : (i: any) => i[key];
  const getV: (item: any, index: any) => any = isFunction(val) ? val : isNil(val) ? (i: any) => i : (i: any) => i[val];
  if (isArray(items)) {
    items.forEach((item, index) => {
      add(getK(item, index), getV(item, index));
    });
  }
  if (isRecord(items)) {
    Object.entries(items).forEach(([key, val]) => {
      add(getK(val, key), getV(val, key));
    });
  }
};

/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( groupBy([ 5, 6, 6 ], v => v), { 5: [5], 6: [6, 6] } );
 * isEqual( groupBy([ 5, 6, 6 ], v => v, (v, i) => i), { 5: [0], 6: [1, 2] } );
 * isEqual( groupBy([ a, b, c ], v => v.x), { 5: [a], 6: [b, c] } );
 * isEqual( groupBy({ a, b, c }, null, v => v.x), { a: [5], b: [6], c: [6] } );
 * isEqual( groupBy([ a, b, c ]), groupBy({ 0:a, 1:b, 2:c }) );
 */
export const groupBy = ((items: any, key: any, val?: any): Record<string, any[]> => {
  const r: Record<string, any[]> = {};
  _groupBy(items, key, val, (k: any, v: any) => {
    (r[k] || (r[k] = [])).push(v);
  });
  return r;
}) as GroupBy;

/**
 * @example
 * var a = { x:5 }, b = { x:6 }, c = { x:6 };
 * isEqual( by([ 5, 6, 6 ], v => v), { 5: 5, 6: 6 } );
 * isEqual( by([ 5, 6, 6 ], v => v, (v, i) => i), { 5: 0, 6: 2 } );
 * isEqual( by([ a, b, c ], v => v.x), { 5: a, 6: b } );
 * isEqual( by({ a, b, c }, null, v => v.x), { a: 5, b: 6, c: 6 } );
 * isEqual( by([ a, b, c ]), valueBy({ 0:a, 1:b, 2:c }) );
 */
export const by = ((items: any, key: any, val?: any): Record<string, any> => {
  const r: Record<string, any> = {};
  _groupBy(items, key, val, (k: any, v: any) => {
    r[k] = v;
  });
  return r;
}) as By;

export const byId = ((items: any, val?: any) => by(items, (i: any) => i.id, val)) as ById;

