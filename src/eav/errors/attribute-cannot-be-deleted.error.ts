import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class AttributeCannotBeDeletedError extends RuntimeError {
    constructor(message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.SYSTEM_DEFINED_ATTRIBUTE_CANNOT_BE_DELETED,
            message ?? 'EAV system defined attribute cannot be deleted',
        );
    }
}
