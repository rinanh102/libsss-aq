import { Expose } from 'class-transformer';
import {
    IsDefined,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEnum,
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
    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_-]*$/)
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
