import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
export declare type GetEavAttributeUseCaseInput = string;
export declare type GetEavAttributeUseCaseOutput = EavAttributeDTO;
export declare type GetEavAttributeUseCaseContext = {
    firstInput: GetEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export declare type GetEavAttributeUseCaseValidateInput = GetEavAttributeUseCaseInput;
export declare type GetEavAttributeUseCaseValidateOutput = GetEavAttributeUseCaseInput;
export declare type GetEavAttributeUseCaseProcessingInput = GetEavAttributeUseCaseValidateOutput;
export declare type GetEavAttributeUseCaseProcessingOutput = Partial<EavAttributeDTO>;
export declare type GetEavAttributeUseCaseMapInput = GetEavAttributeUseCaseProcessingOutput;
export declare type GetEavAttributeUseCaseMapOutput = Partial<EavAttributeDTO>;
