import { AuthInput, PaginationInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
export declare type GetListEavAttributeUseCaseInput = PaginationInput<EavAttributeDTO>;
export declare type GetListEavAttributeUseCaseOutput = EavAttributeDTO[];
export declare type GetListEavAttributeUseCaseContext = {
    firstInput: GetListEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export declare type GetListEavAttributeUseCaseValidateInput = GetListEavAttributeUseCaseInput;
export declare type GetListEavAttributeUseCaseValidateOutput = GetListEavAttributeUseCaseInput;
export declare type GetListEavAttributeUseCaseProcessingInput = GetListEavAttributeUseCaseValidateOutput;
export declare type GetListEavAttributeUseCaseProcessingOutput = Partial<EavAttributeDTO>[];
export declare type GetListEavAttributeUseCaseMapInput = GetListEavAttributeUseCaseProcessingOutput;
export declare type GetListEavAttributeUseCaseMapOutput = Partial<EavAttributeDTO>[];
