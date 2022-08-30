export declare type EavAttributeValueCreateInput = {
    value: string;
    entityId: string;
    code: string;
};
export declare class EavAttributeValueCreateInputModel implements EavAttributeValueCreateInput {
    readonly value: string;
    readonly code: string;
    readonly entityId: string;
}
export declare type EavAttributeValueCreateOutput = void;
export declare type EavAttributeValueUpdateInput = {
    value?: string;
};
export declare class EavAttributeValueUpdateInputModel implements EavAttributeValueUpdateInput {
    readonly value?: string;
}
export declare type EavAttributeValueUpdateOutput = void;
export declare type EavAttributeValueDeleteInput = void;
export declare type EavAttributeValueDeleteOutput = void;
export declare type CreateAttributesValuesInput = {
    value: any;
    code: string;
}[];
export declare class CreateAttributeValuesInputModel {
    readonly value: string;
    readonly code: string;
}
export declare type CreateAttributesValuesOutput = void;
export declare type UpdateAttributesValuesInput = {
    createItems?: {
        value: any;
        code: string;
    }[];
    updateItems?: {
        value: any;
        code: string;
    }[];
    deleteItems?: {
        code: string;
    }[];
};
export declare type UpdateAttributesValuesOutput = void;
declare type ItemAttributeValue = {
    value: any;
    code: string;
};
export declare class UpdateAttributeValuesInputModel implements UpdateAttributesValuesInput {
    readonly deleteItems?: {
        code: string;
    }[];
    readonly updateItems?: ItemAttributeValue[];
    readonly createItems?: ItemAttributeValue[];
}
export {};
