import { RuntimeError } from '@heronjs/common';
export declare class AttributeIsRequiredError extends RuntimeError {
    constructor(attributeCode: string, message?: string);
}
