import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { ValidatorUtil } from '../../../validator';
import { IEavAttributeMapper } from '../../mappers';
import {
    CreateEavAttributeUseCaseContext,
    CreateEavAttributeUseCaseInput,
    CreateEavAttributeUseCaseInputModel,
    CreateEavAttributeUseCaseMapInput,
    CreateEavAttributeUseCaseMapOutput,
    CreateEavAttributeUseCaseOutput,
    CreateEavAttributeUseCaseProcessingInput,
    CreateEavAttributeUseCaseProcessingOutput,
    CreateEavAttributeUseCaseValidateInput,
    CreateEavAttributeUseCaseValidateOutput,
} from './types';

export type ICreateEavAttributeUseCase = IUseCase<
    CreateEavAttributeUseCaseInput,
    CreateEavAttributeUseCaseOutput,
    CreateEavAttributeUseCaseContext
>;

export class CreateEavAttributeUseCase
    extends UseCase<
        CreateEavAttributeUseCaseInput,
        CreateEavAttributeUseCaseOutput,
        CreateEavAttributeUseCaseContext
    >
    implements ICreateEavAttributeUseCase
{
    constructor(protected readonly _mapper: IEavAttributeMapper, protected readonly _repo: IEavEntityRepo) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<
        CreateEavAttributeUseCaseValidateInput,
        CreateEavAttributeUseCaseValidateOutput
    > = async (input) => {
        return ValidatorUtil.validatePlain(CreateEavAttributeUseCaseInputModel, input);
    };

    processing: UseCasePipeMethod<
        CreateEavAttributeUseCaseProcessingInput,
        CreateEavAttributeUseCaseProcessingOutput
    > = async (input) => {
        const entity = await this._repo.createAttribute(input);
        return { entity };
    };

    map: UseCasePipeMethod<CreateEavAttributeUseCaseMapInput, CreateEavAttributeUseCaseMapOutput> = async ({
        entity,
    }) => {
        return this._mapper.fromEntityToDTO(entity);
    };
}
