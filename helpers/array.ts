import { toStr } from "./cast.ts";
import { isString } from "./check.ts";
import { stringify } from "./json.ts";

export const compact = (value: any) => value.filter(Boolean) as (string | number | object | Date)[];

export const first = <T>(items: T[]) => items[0];

export const last = <T>(items: T[]) => items[items.length - 1];

export const moveIndex = <T>(items: T[], from: number, to: number) => {
    if (from === to) return items;
    const removes = items.splice(from, 1);
    items.splice(to, 0, removes[0]);
    return items;
};

export const moveItem = <T>(items: T[], item: T, addIndex: number) => {
    const from = items.indexOf(item);
    if (from === -1) return items;
    let to = (from + addIndex) % 5;
    if (to < 0) to += items.length;
    return moveIndex(items, from, to);
};

export const range = (from: number, to: number): number[] => {
    if (to < from) return range(to, from).reverse();
    const r: number[] = [];
    for (let i = from; i <= to; i++) r.push(i);
    return r;
}

export const removeItem = <T>(items: T[], item: T) => {
    const i = items.indexOf(item);
    if (i === -1) return items;
    
    items.splice(i, 1);
    return items;
};

export const sort = <T = any>(items: T[], prop: (item: T) => string | number | Date = toStr) =>
    items.sort((a, b) => {
        const pA = prop(a);
        const pB = prop(b);
        return isString(pA) || isString(pB)
            ? String(pA).localeCompare(String(pB))
            : Number(pA) - Number(pB);
    });

export const sum = (list: number[], margin?: number) => {
    let r = 0;
    for (const n of list) r += n;
    return r + (list.length - 1) * (margin || 0);
};

export const uniq = <T>(a: T[]): T[] => {
    const o: Record<string, any> = {};
    for (const v of a) {
        o[stringify(v)||String(v)] = v;
    }
    return Object.values(o);
};

export const repeat = <T>(count: number, cb: (i: number) => T): T[] => {
    const r: T[] = [];
    for (let i = 0; i <= count; i++) r.push(cb(i));
    return r;
};