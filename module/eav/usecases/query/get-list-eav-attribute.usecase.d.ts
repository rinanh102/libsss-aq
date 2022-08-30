import { EavAttributeDTO } from '../..';
import { IBaseDao } from '../../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { GetListEavAttributeUseCaseInput, GetListEavAttributeUseCaseOutput, GetListEavAttributeUseCaseContext, GetListEavAttributeUseCaseValidateInput, GetListEavAttributeUseCaseValidateOutput, GetListEavAttributeUseCaseProcessingInput, GetListEavAttributeUseCaseProcessingOutput, GetListEavAttributeUseCaseMapInput, GetListEavAttributeUseCaseMapOutput } from './types';
export declare type IGetListEavAttributeUseCase = IUseCase<GetListEavAttributeUseCaseInput, GetListEavAttributeUseCaseOutput, GetListEavAttributeUseCaseContext>;
export declare class GetListEavAttributeUseCase extends UseCase<GetListEavAttributeUseCaseInput, GetListEavAttributeUseCaseOutput, GetListEavAttributeUseCaseContext> implements IGetListEavAttributeUseCase {
    protected readonly _eavAttributeDAO: IBaseDao<EavAttributeDTO>;
    constructor(_eavAttributeDAO: IBaseDao<EavAttributeDTO>);
    validate: UseCasePipeMethod<GetListEavAttributeUseCaseValidateInput, GetListEavAttributeUseCaseValidateOutput>;
    processing: UseCasePipeMethod<GetListEavAttributeUseCaseProcessingInput, GetListEavAttributeUseCaseProcessingOutput>;
    map: UseCasePipeMethod<GetListEavAttributeUseCaseMapInput, GetListEavAttributeUseCaseMapOutput>;
}
