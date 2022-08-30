import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthInput } from '../../../../usecase';
import { EavAttributeDTO } from '../../../dtos';
import { EavAttribute } from '../../../entities';

export type DeleteEavAttributeUseCaseInput = {
    code: string;
};

export class DeleteEavAttributeUseCaseInputModel implements DeleteEavAttributeUseCaseInput {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public readonly code!: string;
}

export type DeleteEavAttributeUseCaseOutput = void;

export type DeleteEavAttributeUseCaseContext = {
    firstInput: DeleteEavAttributeUseCaseInput;
    auth: AuthInput<EavAttributeDTO>;
};
export type DeleteEavAttributeUseCaseValidateInput = DeleteEavAttributeUseCaseInput;
export type DeleteEavAttributeUseCaseValidateOutput = DeleteEavAttributeUseCaseInput;

export type DeleteEavAttributeUseCaseProcessingInput = DeleteEavAttributeUseCaseValidateOutput;
export type DeleteEavAttributeUseCaseProcessingOutput = {
    entity: EavAttribute;
};

export type DeleteEavAttributeUseCaseMapInput = DeleteEavAttributeUseCaseProcessingOutput;
export type DeleteEavAttributeUseCaseMapOutput = DeleteEavAttributeUseCaseOutput;
