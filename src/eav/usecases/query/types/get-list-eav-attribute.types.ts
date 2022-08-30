import { AuthInput, PaginationInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';

export type GetListEavAttributeUseCaseInput = PaginationInput<EavAttributeDTO>;
export type GetListEavAttributeUseCaseOutput = EavAttributeDTO[];

export type GetListEavAttributeUseCaseContext = {
    firstInput: GetListEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};

export type GetListEavAttributeUseCaseValidateInput = GetListEavAttributeUseCaseInput;
export type GetListEavAttributeUseCaseValidateOutput = GetListEavAttributeUseCaseInput;

export type GetListEavAttributeUseCaseProcessingInput = GetListEavAttributeUseCaseValidateOutput;
export type GetListEavAttributeUseCaseProcessingOutput = Partial<EavAttributeDTO>[];

export type GetListEavAttributeUseCaseMapInput = GetListEavAttributeUseCaseProcessingOutput;
export type GetListEavAttributeUseCaseMapOutput = Partial<EavAttributeDTO>[];
