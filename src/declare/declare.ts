import caller from 'caller-callsite';
import callsites from 'callsites';

import { MyError } from '../Errors/index.js';
import { ThreadzAPI } from '../ThreadzAPI/index.js';
import { ERROR_CONFIG, ModuleType } from './consts.js';
import ThreadzWorkerPool from '../ThreadzWorkerPool/index.js';

import type { Declarations } from './types.js';

/**
 *
 * Declare your workers within this function, and make its return value the default export of the current file.
 *
 * @param declarations Declarations
 * @returns ThreadzAPI
 *
 * **NOTE:** The return value of the declaration function _MUST_ be the default export of the file!
 *
 * @example export default declare({ add5: { worker: (x) => x + 5 } })
 *
 */
export const declare = <T extends Declarations>(declarations: T, { fileLocation }: { fileLocation?: string } = {}) => {
    // If declarations are undefined, an array, or not an object
    const isNotObject = !declarations || Array.isArray(declarations) || typeof declarations !== 'object';

    if (isNotObject) throw new MyError(ERROR_CONFIG('Declarations must be defined, and must be an object.'));

    const values = Object.values(declarations);

    const areNotValidDeclarations =
        values.some((declaration) => !declaration?.worker || typeof declaration.worker !== 'function') || !values.length;

    // If any declarations don't have a "worker" key, or the "worker" isn't a function
    if (areNotValidDeclarations) {
        throw new MyError(ERROR_CONFIG('Each declaration must have a "worker" property which is a function.'));
    }

    const location = fileLocation || (!ThreadzWorkerPool.isESM ? caller().getFileName() : callsites()[1].getFileName());

    return new ThreadzAPI({ location, declarations });
};
