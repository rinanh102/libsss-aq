import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

// TYPE: create

export type EavAttributeValueCreateInput = {
    value: string;
    entityId: string;
    code: string;
};

export class EavAttributeValueCreateInputModel implements EavAttributeValueCreateInput {
    @Expose()
    @IsNotEmpty()
    public readonly value!: string;

    @Expose()
    @IsNotEmpty()
    public readonly code!: string;

    @Expose()
    @IsNotEmpty()
    public readonly entityId!: string;
}
export type EavAttributeValueCreateOutput = void;

// TYPE: update
export type EavAttributeValueUpdateInput = {
    value?: string;
};
export class EavAttributeValueUpdateInputModel implements EavAttributeValueUpdateInput {
    @Expose()
    public readonly value?: string;
}
export type EavAttributeValueUpdateOutput = void;

export type EavAttributeValueDeleteInput = void;
export type EavAttributeValueDeleteOutput = void;

// Repo and UseCase dto
export type CreateAttributesValuesInput = {
    value: any;
    code: string;
}[];

export class CreateAttributeValuesInputModel {
    @Expose()
    @IsNotEmpty()
    public readonly value!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public readonly code!: string;
}

export type CreateAttributesValuesOutput = void;

export type UpdateAttributesValuesInput = {
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
export type UpdateAttributesValuesOutput = void;
type ItemAttributeValue = {
    value: any;
    code: string;
};

class ItemAttributeValueModel {
    @Expose()
    public readonly value?: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public readonly code!: string;
}

export class UpdateAttributeValuesInputModel implements UpdateAttributesValuesInput {
    @Expose()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemAttributeValueModel)
    public readonly deleteItems?: { code: string }[];

    @Expose()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemAttributeValueModel)
    public readonly updateItems?: ItemAttributeValue[];

    @Expose()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemAttributeValueModel)
    public readonly createItems?: ItemAttributeValue[];
}
