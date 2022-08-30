import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { ValidatorUtil } from '../../../validator';
import { IEavAttributeMapper } from '../../mappers';
import {
    UpdateEavAttributeUseCaseInput,
    UpdateEavAttributeUseCaseOutput,
    UpdateEavAttributeUseCaseContext,
    UpdateEavAttributeUseCaseValidateInput,
    UpdateEavAttributeUseCaseValidateOutput,
    UpdateEavAttributeUseCaseInputModel,
    UpdateEavAttributeUseCaseProcessingInput,
    UpdateEavAttributeUseCaseProcessingOutput,
    UpdateEavAttributeUseCaseMapInput,
    UpdateEavAttributeUseCaseMapOutput,
} from './types';

export type IUpdateEavAttributeUseCase = IUseCase<
    UpdateEavAttributeUseCaseInput,
    UpdateEavAttributeUseCaseOutput,
    UpdateEavAttributeUseCaseContext
>;

export class UpdateEavAttributeUseCase
    extends UseCase<
        UpdateEavAttributeUseCaseInput,
        UpdateEavAttributeUseCaseOutput,
        UpdateEavAttributeUseCaseContext
    >
    implements IUpdateEavAttributeUseCase
{
    constructor(protected readonly _mapper: IEavAttributeMapper, protected readonly _repo: IEavEntityRepo) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<
        UpdateEavAttributeUseCaseValidateInput,
        UpdateEavAttributeUseCaseValidateOutput
    > = async (input) => {
        return ValidatorUtil.validatePlain(UpdateEavAttributeUseCaseInputModel, input);
    };

    processing: UseCasePipeMethod<
        UpdateEavAttributeUseCaseProcessingInput,
        UpdateEavAttributeUseCaseProcessingOutput
    > = async (input) => {
        const entity = await this._repo.updateAttribute(input.code, input);
        return { entity };
    };

    map: UseCasePipeMethod<UpdateEavAttributeUseCaseMapInput, UpdateEavAttributeUseCaseMapOutput> = async ({
        entity,
    }) => {
        return this._mapper.fromEntityToDTO(entity);
    };
}
