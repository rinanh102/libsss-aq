import { EavAttributeStatus, EavAttributeTypes } from '../enums';
export declare type EavAttributeCreateInput = {
    code: string;
    label: string;
    type: EavAttributeTypes;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export declare class EavAttributeCreateInputModel implements EavAttributeCreateInput {
    readonly code: string;
    readonly label: string;
    readonly type: EavAttributeTypes;
    readonly status?: EavAttributeStatus;
    readonly sortOrder?: number;
    readonly visibility?: boolean;
    readonly isRequired?: boolean;
    readonly options?: any[];
}
export declare type EavAttributeCreateOutput = void;
export declare type EavAttributeUpdateInput = {
    code: string;
    label?: string;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export declare class EavAttributeUpdateInputModel implements EavAttributeUpdateInput {
    readonly code: string;
    readonly label?: string;
    readonly status?: EavAttributeStatus;
    readonly sortOrder?: number;
    readonly visibility?: boolean;
    readonly isRequired?: boolean;
    readonly options?: any[];
}
export declare type EavAttributeUpdateOutput = void;
export declare type EavAttributeDeleteInput = void;
export declare type EavAttributeDeleteOutput = void;
