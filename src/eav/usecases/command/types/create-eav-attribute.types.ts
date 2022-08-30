import { Expose } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEnum,
    IsOptional,
    IsNumber,
    IsBoolean,
    IsArray,
} from 'class-validator';
import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';
import { EavAttributeTypes, EavAttributeStatus } from '../../../enums';

export type CreateEavAttributeUseCaseInput = {
    code: string;
    label: string;
    type: EavAttributeTypes;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};

export class CreateEavAttributeUseCaseInputModel implements CreateEavAttributeUseCaseInput {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_-]*$/)
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
export type CreateEavAttributeUseCaseOutput = EavAttributeDTO;

export type CreateEavAttributeUseCaseContext = {
    firstInput: CreateEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};

export type CreateEavAttributeUseCaseValidateInput = CreateEavAttributeUseCaseInput;
export type CreateEavAttributeUseCaseValidateOutput = CreateEavAttributeUseCaseInput;

export type CreateEavAttributeUseCaseProcessingInput = CreateEavAttributeUseCaseValidateOutput;
export type CreateEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};

export type CreateEavAttributeUseCaseMapInput = CreateEavAttributeUseCaseProcessingOutput;
export type CreateEavAttributeUseCaseMapOutput = CreateEavAttributeUseCaseOutput;
