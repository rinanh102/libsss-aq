import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';
import { EavAttributeStatus } from '../../../enums';
export declare type UpdateEavAttributeUseCaseInput = {
    code: string;
    label?: string;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export declare class UpdateEavAttributeUseCaseInputModel implements UpdateEavAttributeUseCaseInput {
    readonly code: string;
    readonly label?: string;
    readonly status?: EavAttributeStatus;
    readonly sortOrder?: number;
    readonly visibility?: boolean;
    readonly isRequired?: boolean;
    readonly options?: any[];
}
export declare type UpdateEavAttributeUseCaseOutput = EavAttributeDTO;
export declare type UpdateEavAttributeUseCaseContext = {
    firstInput: UpdateEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export declare type UpdateEavAttributeUseCaseValidateInput = UpdateEavAttributeUseCaseInput;
export declare type UpdateEavAttributeUseCaseValidateOutput = UpdateEavAttributeUseCaseInput;
export declare type UpdateEavAttributeUseCaseProcessingInput = UpdateEavAttributeUseCaseValidateOutput;
export declare type UpdateEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};
export declare type UpdateEavAttributeUseCaseMapInput = UpdateEavAttributeUseCaseProcessingOutput;
export declare type UpdateEavAttributeUseCaseMapOutput = UpdateEavAttributeUseCaseOutput;
