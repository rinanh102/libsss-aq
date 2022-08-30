import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class AttributeNotFoundError extends RuntimeError {
    constructor(attributeCode: string, message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.ATTRIBUTE_NOT_FOUND,
            message ?? `EAV attribute ${attributeCode} is not found`,
        );
    }
}
