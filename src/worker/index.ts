import { parentPort, workerData } from 'worker_threads';

import { SUCCESS_PAYLOAD, ERROR_PAYLOAD } from './consts.js';
import { ThreadzAPI } from '../ThreadzAPI/index.js';

import type { WorkerData } from './types.js';
import type { Declarations } from '../declare/types.js';
import { BackgroundWorkerCallPayload, BackgroundWorkerCallResponse } from '../BackgroundThreadzWorker/types.js';

const regular = async () => {
    try {
        const { name, location, args } = workerData as WorkerData;

        const api = (await import(location)).default as ThreadzAPI<Declarations>;

        if (!api || !api?.declarations) {
            throw new Error("Make sure you've made your declarations the default export of the file they're in.");
        }
        if (!api.declarations?.[name]) {
            throw new Error('There is no worker by this name in the specified declarations file.');
        }
        if (!(api instanceof ThreadzAPI)) {
            throw new Error('The default export of your declarations file must be a ThreadzAPI instance.');
        }

        const result = await api?.declarations?.[name]?.worker(...args);

        parentPort.postMessage(SUCCESS_PAYLOAD(result));
    } catch (error) {
        parentPort.postMessage(ERROR_PAYLOAD((error as Error)?.message));
    } finally {
        process.exit(0);
    }
};

const background = async () => {
    const { location } = workerData as WorkerData;

    const api = (await import(location)).default as ThreadzAPI<Declarations>;

    if (!api || !api?.declarations) {
        throw new Error("Make sure you've made your declarations the default export of the file they're in.");
    }
    if (!(api instanceof ThreadzAPI)) {
        throw new Error('The default export of your declarations file must be a ThreadzAPI instance.');
    }

    parentPort.on('message', async ({ name, id, args, terminate }: BackgroundWorkerCallPayload) => {
        if (terminate) process.exit();

        if (!api.declarations?.[name]) {
            throw new Error('There is no worker by this name in the specified declarations file.');
        }

        const payload = await api.declarations?.[name]?.worker(...args);
        parentPort.postMessage({ name, id, payload } as BackgroundWorkerCallResponse);
    });
};

if ((workerData as WorkerData).type === 'REGULAR') regular();
if ((workerData as WorkerData).type === 'BACKGROUND') background();
