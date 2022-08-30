import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class AttributeValueDoesNotAllowUpdatedError extends RuntimeError {
    constructor(message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.ATTRIBUTE_VALUE_DOES_NOT_ALLOW_UPDATE,
            message ?? 'EAV attribute does not allow update',
        );
    }
}
