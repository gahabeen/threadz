import { declare } from '../declare';

export default declare({
    map: {
        worker: (array: any[], callback: string) => {
            const mapped = array.map(eval(callback));
            return mapped;
        },
    },
});
