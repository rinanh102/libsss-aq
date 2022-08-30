import { AttributeNotFoundError, DtoUtil } from '../../..';
import { IBaseDao } from '../../../database';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { EavAttributeDTO } from '../../dtos';
import {
    GetEavAttributeUseCaseInput,
    GetEavAttributeUseCaseOutput,
    GetEavAttributeUseCaseContext,
    GetEavAttributeUseCaseValidateInput,
    GetEavAttributeUseCaseValidateOutput,
    GetEavAttributeUseCaseProcessingInput,
    GetEavAttributeUseCaseProcessingOutput,
    GetEavAttributeUseCaseMapInput,
    GetEavAttributeUseCaseMapOutput,
} from './types';

export type IGetEavAttributeUseCase = IUseCase<
    GetEavAttributeUseCaseInput,
    GetEavAttributeUseCaseOutput,
    GetEavAttributeUseCaseContext
>;

export class GetEavAttributeUseCase
    extends UseCase<GetEavAttributeUseCaseInput, GetEavAttributeUseCaseOutput, GetEavAttributeUseCaseContext>
    implements IGetEavAttributeUseCase
{
    constructor(protected readonly _eavAttributeDAO: IBaseDao<EavAttributeDTO>) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<GetEavAttributeUseCaseValidateInput, GetEavAttributeUseCaseValidateOutput> =
        async (input) => {
            return input;
        };

    processing: UseCasePipeMethod<
        GetEavAttributeUseCaseProcessingInput,
        GetEavAttributeUseCaseProcessingOutput
    > = async (input) => {
        const todoDTO = await this._eavAttributeDAO.findOne({ filter: { code: { eq: input } } });
        if (!todoDTO) throw new AttributeNotFoundError(input);
        return todoDTO;
    };

    map: UseCasePipeMethod<GetEavAttributeUseCaseMapInput, GetEavAttributeUseCaseMapOutput> = async (
        input,
    ) => {
        return DtoUtil.map<Partial<EavAttributeDTO>>(input, {
            useUnixtime: true,
        });
    };
}
