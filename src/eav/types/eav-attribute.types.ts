import { Expose } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsDefined,
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { EavAttributeStatus, EavAttributeTypes } from '../enums';

// TYPE: create
export type EavAttributeCreateInput = {
    code: string;
    label: string;
    type: EavAttributeTypes;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};

export class EavAttributeCreateInputModel implements EavAttributeCreateInput {
    @Expose()
    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9._-]*$/)
    public readonly code!: string;

    @Expose()
    @IsDefined()
    @IsString()
    @MinLength(1)
    public readonly label!: string;

    @Expose()
    @IsDefined()
    @IsEnum(EavAttributeTypes)
    public readonly type!: EavAttributeTypes;

    @Expose()
    @IsEnum(EavAttributeStatus)
    public readonly status?: EavAttributeStatus;

    @Expose()
    @IsNumber()
    public readonly sortOrder?: number;

    @Expose()
    @IsBoolean()
    public readonly visibility?: boolean;

    @Expose()
    @IsBoolean()
    public readonly isRequired?: boolean;

    @Expose()
    @IsArray()
    public readonly options?: any[];
}
export type EavAttributeCreateOutput = void;

// TYPE: update
export type EavAttributeUpdateInput = {
    code: string;
    label?: string;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export class EavAttributeUpdateInputModel implements EavAttributeUpdateInput {
    @Expose()
    @IsDefined()
    @IsString()
    public readonly code!: string;

    @Expose()
    @IsString()
    @MinLength(1)
    public readonly label?: string;

    @Expose()
    @IsEnum(EavAttributeStatus)
    public readonly status?: EavAttributeStatus;

    @Expose()
    @IsNumber()
    public readonly sortOrder?: number;

    @Expose()
    @IsBoolean()
    public readonly visibility?: boolean;

    @Expose()
    @IsBoolean()
    public readonly isRequired?: boolean;

    @Expose()
    @IsArray()
    public readonly options?: any[];
}
export type EavAttributeUpdateOutput = void;

// TYPE: delete
export type EavAttributeDeleteInput = void;
export type EavAttributeDeleteOutput = void;
