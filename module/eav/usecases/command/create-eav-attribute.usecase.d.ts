import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { IEavAttributeMapper } from '../../mappers';
import { CreateEavAttributeUseCaseContext, CreateEavAttributeUseCaseInput, CreateEavAttributeUseCaseMapInput, CreateEavAttributeUseCaseMapOutput, CreateEavAttributeUseCaseOutput, CreateEavAttributeUseCaseProcessingInput, CreateEavAttributeUseCaseProcessingOutput, CreateEavAttributeUseCaseValidateInput, CreateEavAttributeUseCaseValidateOutput } from './types';
export declare type ICreateEavAttributeUseCase = IUseCase<CreateEavAttributeUseCaseInput, CreateEavAttributeUseCaseOutput, CreateEavAttributeUseCaseContext>;
export declare class CreateEavAttributeUseCase extends UseCase<CreateEavAttributeUseCaseInput, CreateEavAttributeUseCaseOutput, CreateEavAttributeUseCaseContext> implements ICreateEavAttributeUseCase {
    protected readonly _mapper: IEavAttributeMapper;
    protected readonly _repo: IEavEntityRepo;
    constructor(_mapper: IEavAttributeMapper, _repo: IEavEntityRepo);
    validate: UseCasePipeMethod<CreateEavAttributeUseCaseValidateInput, CreateEavAttributeUseCaseValidateOutput>;
    processing: UseCasePipeMethod<CreateEavAttributeUseCaseProcessingInput, CreateEavAttributeUseCaseProcessingOutput>;
    map: UseCasePipeMethod<CreateEavAttributeUseCaseMapInput, CreateEavAttributeUseCaseMapOutput>;
}
