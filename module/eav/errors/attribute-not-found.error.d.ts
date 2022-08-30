import { RuntimeError } from '@heronjs/common';
export declare class AttributeNotFoundError extends RuntimeError {
    constructor(attributeCode: string, message?: string);
}
