import { EavAttributeDTO } from '../..';
import { DtoUtil, IBaseDao } from '../../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import {
    GetListEavAttributeUseCaseInput,
    GetListEavAttributeUseCaseOutput,
    GetListEavAttributeUseCaseContext,
    GetListEavAttributeUseCaseValidateInput,
    GetListEavAttributeUseCaseValidateOutput,
    GetListEavAttributeUseCaseProcessingInput,
    GetListEavAttributeUseCaseProcessingOutput,
    GetListEavAttributeUseCaseMapInput,
    GetListEavAttributeUseCaseMapOutput,
} from './types';

export type IGetListEavAttributeUseCase = IUseCase<
    GetListEavAttributeUseCaseInput,
    GetListEavAttributeUseCaseOutput,
    GetListEavAttributeUseCaseContext
>;

export class GetListEavAttributeUseCase
    extends UseCase<
        GetListEavAttributeUseCaseInput,
        GetListEavAttributeUseCaseOutput,
        GetListEavAttributeUseCaseContext
    >
    implements IGetListEavAttributeUseCase
{
    constructor(protected readonly _eavAttributeDAO: IBaseDao<EavAttributeDTO>) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<
        GetListEavAttributeUseCaseValidateInput,
        GetListEavAttributeUseCaseValidateOutput
    > = async (input) => {
        return input;
    };

    processing: UseCasePipeMethod<
        GetListEavAttributeUseCaseProcessingInput,
        GetListEavAttributeUseCaseProcessingOutput
    > = async (input) => {
        return this._eavAttributeDAO.find(input);
    };

    map: UseCasePipeMethod<GetListEavAttributeUseCaseMapInput, GetListEavAttributeUseCaseMapOutput> = async (
        input,
    ) => {
        return input.map((i) =>
            DtoUtil.map<Partial<EavAttributeDTO>>(i, {
                useUnixtime: true,
            }),
        );
    };
}
