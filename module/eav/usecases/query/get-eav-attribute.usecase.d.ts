import { IBaseDao } from '../../../database';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { EavAttributeDTO } from '../../dtos';
import { GetEavAttributeUseCaseInput, GetEavAttributeUseCaseOutput, GetEavAttributeUseCaseContext, GetEavAttributeUseCaseValidateInput, GetEavAttributeUseCaseValidateOutput, GetEavAttributeUseCaseProcessingInput, GetEavAttributeUseCaseProcessingOutput, GetEavAttributeUseCaseMapInput, GetEavAttributeUseCaseMapOutput } from './types';
export declare type IGetEavAttributeUseCase = IUseCase<GetEavAttributeUseCaseInput, GetEavAttributeUseCaseOutput, GetEavAttributeUseCaseContext>;
export declare class GetEavAttributeUseCase extends UseCase<GetEavAttributeUseCaseInput, GetEavAttributeUseCaseOutput, GetEavAttributeUseCaseContext> implements IGetEavAttributeUseCase {
    protected readonly _eavAttributeDAO: IBaseDao<EavAttributeDTO>;
    constructor(_eavAttributeDAO: IBaseDao<EavAttributeDTO>);
    validate: UseCasePipeMethod<GetEavAttributeUseCaseValidateInput, GetEavAttributeUseCaseValidateOutput>;
    processing: UseCasePipeMethod<GetEavAttributeUseCaseProcessingInput, GetEavAttributeUseCaseProcessingOutput>;
    map: UseCasePipeMethod<GetEavAttributeUseCaseMapInput, GetEavAttributeUseCaseMapOutput>;
}
