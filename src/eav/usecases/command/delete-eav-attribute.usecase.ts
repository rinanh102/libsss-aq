import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { ValidatorUtil } from '../../../validator';
import { IEavAttributeMapper } from '../../mappers';
import {
    DeleteEavAttributeUseCaseInput,
    DeleteEavAttributeUseCaseOutput,
    DeleteEavAttributeUseCaseContext,
    DeleteEavAttributeUseCaseValidateInput,
    DeleteEavAttributeUseCaseValidateOutput,
    DeleteEavAttributeUseCaseInputModel,
    DeleteEavAttributeUseCaseProcessingInput,
    DeleteEavAttributeUseCaseProcessingOutput,
    DeleteEavAttributeUseCaseMapInput,
    DeleteEavAttributeUseCaseMapOutput,
} from './types';

export type IDeleteEavAttributeUseCase = IUseCase<
    DeleteEavAttributeUseCaseInput,
    DeleteEavAttributeUseCaseOutput,
    DeleteEavAttributeUseCaseContext
>;

export class DeleteEavAttributeUseCase
    extends UseCase<
        DeleteEavAttributeUseCaseInput,
        DeleteEavAttributeUseCaseOutput,
        DeleteEavAttributeUseCaseContext
    >
    implements IDeleteEavAttributeUseCase
{
    constructor(protected readonly _mapper: IEavAttributeMapper, protected readonly _repo: IEavEntityRepo) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<
        DeleteEavAttributeUseCaseValidateInput,
        DeleteEavAttributeUseCaseValidateOutput
    > = async (input) => {
        return ValidatorUtil.validatePlain(DeleteEavAttributeUseCaseInputModel, input);
    };

    processing: UseCasePipeMethod<
        DeleteEavAttributeUseCaseProcessingInput,
        DeleteEavAttributeUseCaseProcessingOutput
    > = async (input) => {
        const entity = await this._repo.deleteAttribute(input.code);
        return { entity };
    };

    map: UseCasePipeMethod<DeleteEavAttributeUseCaseMapInput, DeleteEavAttributeUseCaseMapOutput> =
        async () => {
            return;
        };
}
