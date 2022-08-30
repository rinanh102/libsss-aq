import { Expose } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
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
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9._-]*$/)
    public readonly code!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    public readonly label!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(EavAttributeTypes)
    public readonly type!: EavAttributeTypes;

    @Expose()
    @IsOptional()
    @IsEnum(EavAttributeStatus)
    public readonly status?: EavAttributeStatus;

    @Expose()
    @IsOptional()
    @IsNumber()
    public readonly sortOrder?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public readonly visibility?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public readonly isRequired?: boolean;

    @Expose()
    @IsOptional()
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
    @IsNotEmpty()
    @IsString()
    public readonly code!: string;

    @Expose()
    @IsOptional()
    @IsString()
    @MinLength(1)
    public readonly label?: string;

    @Expose()
    @IsOptional()
    @IsEnum(EavAttributeStatus)
    public readonly status?: EavAttributeStatus;

    @Expose()
    @IsOptional()
    @IsNumber()
    public readonly sortOrder?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public readonly visibility?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public readonly isRequired?: boolean;

    @Expose()
    @IsOptional()
    @IsArray()
    public readonly options?: any[];
}
export type EavAttributeUpdateOutput = void;

// TYPE: delete
export type EavAttributeDeleteInput = void;
export type EavAttributeDeleteOutput = void;
