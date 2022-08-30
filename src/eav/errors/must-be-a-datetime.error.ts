import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class MustBeADatetimeError extends RuntimeError {
    constructor(message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.TYPE_OF_VALUE_MUST_BE_A_DATETIME,
            message ?? 'EAV attribute value must be a datetime',
        );
    }
}
