import { AcceptableDataType } from '../SharedMemory';
import api from './declarations';

type ValueType<T> = T extends (infer I)[] ? I : T extends Record<string | number | symbol, infer A> ? A : never;

export class Utility<T extends AcceptableDataType[] | Record<string | number | symbol, AcceptableDataType>> {
    item: T;

    constructor(item: T) {
        this.item = item;
    }

    async map<A extends ValueType<T>, B>(callback: (item: A) => B): Promise<B[]> {
        if (Array.isArray(this.item)) {
            const mapped = await api.workers.map(this.item, callback.toString());
            return mapped as B[];
        }
    }
}
