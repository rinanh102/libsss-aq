import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { IEavAttributeMapper } from '../../mappers';
import { UpdateEavAttributeUseCaseInput, UpdateEavAttributeUseCaseOutput, UpdateEavAttributeUseCaseContext, UpdateEavAttributeUseCaseValidateInput, UpdateEavAttributeUseCaseValidateOutput, UpdateEavAttributeUseCaseProcessingInput, UpdateEavAttributeUseCaseProcessingOutput, UpdateEavAttributeUseCaseMapInput, UpdateEavAttributeUseCaseMapOutput } from './types';
export declare type IUpdateEavAttributeUseCase = IUseCase<UpdateEavAttributeUseCaseInput, UpdateEavAttributeUseCaseOutput, UpdateEavAttributeUseCaseContext>;
export declare class UpdateEavAttributeUseCase extends UseCase<UpdateEavAttributeUseCaseInput, UpdateEavAttributeUseCaseOutput, UpdateEavAttributeUseCaseContext> implements IUpdateEavAttributeUseCase {
    protected readonly _mapper: IEavAttributeMapper;
    protected readonly _repo: IEavEntityRepo;
    constructor(_mapper: IEavAttributeMapper, _repo: IEavEntityRepo);
    validate: UseCasePipeMethod<UpdateEavAttributeUseCaseValidateInput, UpdateEavAttributeUseCaseValidateOutput>;
    processing: UseCasePipeMethod<UpdateEavAttributeUseCaseProcessingInput, UpdateEavAttributeUseCaseProcessingOutput>;
    map: UseCasePipeMethod<UpdateEavAttributeUseCaseMapInput, UpdateEavAttributeUseCaseMapOutput>;
}
