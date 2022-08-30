import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';
export declare type DeleteEavAttributeUseCaseInput = {
    code: string;
};
export declare class DeleteEavAttributeUseCaseInputModel implements DeleteEavAttributeUseCaseInput {
    readonly code: string;
}
export declare type DeleteEavAttributeUseCaseOutput = void;
export declare type DeleteEavAttributeUseCaseContext = {
    firstInput: DeleteEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export declare type DeleteEavAttributeUseCaseValidateInput = DeleteEavAttributeUseCaseInput;
export declare type DeleteEavAttributeUseCaseValidateOutput = DeleteEavAttributeUseCaseInput;
export declare type DeleteEavAttributeUseCaseProcessingInput = DeleteEavAttributeUseCaseValidateOutput;
export declare type DeleteEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};
export declare type DeleteEavAttributeUseCaseMapInput = DeleteEavAttributeUseCaseProcessingOutput;
export declare type DeleteEavAttributeUseCaseMapOutput = DeleteEavAttributeUseCaseOutput;
