import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';

export type GetEavAttributeUseCaseInput = string;
export type GetEavAttributeUseCaseOutput = EavAttributeDTO;

export type GetEavAttributeUseCaseContext = {
    firstInput: GetEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};

export type GetEavAttributeUseCaseValidateInput = GetEavAttributeUseCaseInput;
export type GetEavAttributeUseCaseValidateOutput = GetEavAttributeUseCaseInput;

export type GetEavAttributeUseCaseProcessingInput = GetEavAttributeUseCaseValidateOutput;
export type GetEavAttributeUseCaseProcessingOutput = Partial<EavAttributeDTO>;

export type GetEavAttributeUseCaseMapInput = GetEavAttributeUseCaseProcessingOutput;
export type GetEavAttributeUseCaseMapOutput = Partial<EavAttributeDTO>;
