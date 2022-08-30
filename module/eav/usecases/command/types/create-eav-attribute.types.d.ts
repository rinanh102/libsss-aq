import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';
import { EavAttributeTypes, EavAttributeStatus } from '../../../enums';
export declare type CreateEavAttributeUseCaseInput = {
    code: string;
    label: string;
    type: EavAttributeTypes;
    status?: EavAttributeStatus;
    sortOrder?: number;
    visibility?: boolean;
    isRequired?: boolean;
    options?: any[];
};
export declare class CreateEavAttributeUseCaseInputModel implements CreateEavAttributeUseCaseInput {
    readonly code: string;
    readonly label: string;
    readonly type: EavAttributeTypes;
    readonly status?: EavAttributeStatus;
    readonly sortOrder?: number;
    readonly visibility?: boolean;
    readonly isRequired?: boolean;
    readonly options?: any[];
}
export declare type CreateEavAttributeUseCaseOutput = EavAttributeDTO;
export declare type CreateEavAttributeUseCaseContext = {
    firstInput: CreateEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export declare type CreateEavAttributeUseCaseValidateInput = CreateEavAttributeUseCaseInput;
export declare type CreateEavAttributeUseCaseValidateOutput = CreateEavAttributeUseCaseInput;
export declare type CreateEavAttributeUseCaseProcessingInput = CreateEavAttributeUseCaseValidateOutput;
export declare type CreateEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};
export declare type CreateEavAttributeUseCaseMapInput = CreateEavAttributeUseCaseProcessingOutput;
export declare type CreateEavAttributeUseCaseMapOutput = CreateEavAttributeUseCaseOutput;
