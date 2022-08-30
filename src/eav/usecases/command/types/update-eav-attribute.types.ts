import { Expose } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    MinLength,
    IsEnum,
    IsNumber,
    IsBoolean,
    IsArray,
} from 'class-validator';
import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';
import { EavAttributeStatus } from '../../../enums';

// TYPE: update
export type UpdateEavAttributeUseCaseInput = {
    code: string;
    label?: string;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export class UpdateEavAttributeUseCaseInputModel implements UpdateEavAttributeUseCaseInput {
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
export type UpdateEavAttributeUseCaseOutput = EavAttributeDTO;

export type UpdateEavAttributeUseCaseContext = {
    firstInput: UpdateEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export type UpdateEavAttributeUseCaseValidateInput = UpdateEavAttributeUseCaseInput;
export type UpdateEavAttributeUseCaseValidateOutput = UpdateEavAttributeUseCaseInput;

export type UpdateEavAttributeUseCaseProcessingInput = UpdateEavAttributeUseCaseValidateOutput;
export type UpdateEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};

export type UpdateEavAttributeUseCaseMapInput = UpdateEavAttributeUseCaseProcessingOutput;
export type UpdateEavAttributeUseCaseMapOutput = UpdateEavAttributeUseCaseOutput;
