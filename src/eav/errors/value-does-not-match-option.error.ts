import { RuntimeError } from '@heronjs/common';
import { ErrorNamespaces, ErrorCodes } from './eav.errors';

export class ValueDoesNotMatchOptionError extends RuntimeError {
    constructor(message?: string) {
        super(
            ErrorNamespaces.EAV,
            ErrorCodes.VALUE_DOES_NOT_MATCH_OPTION,
            message ?? 'EAV does not match option',
        );
    }
}
