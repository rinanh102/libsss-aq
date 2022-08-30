import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class NotSupportThisTypeError extends RuntimeError {
    constructor(message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.NOT_SUPPORT_THIS_TYPE,
            message ?? 'EAV attribute value not support this type',
        );
    }
}
