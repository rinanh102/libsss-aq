import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class AttributeIsRequiredError extends RuntimeError {
    constructor(attributeCode: string, message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.ATTRIBUTE_IS_REQUIRED,
            message ?? `EAV attribute ${attributeCode} is required`,
        );
    }
}
