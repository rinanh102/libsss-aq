import { IEavEntityRepo } from '../..';
import { IUseCase, UseCase, UseCasePipeMethod } from '../../../usecase';
import { IEavAttributeMapper } from '../../mappers';
import { DeleteEavAttributeUseCaseInput, DeleteEavAttributeUseCaseOutput, DeleteEavAttributeUseCaseContext, DeleteEavAttributeUseCaseValidateInput, DeleteEavAttributeUseCaseValidateOutput, DeleteEavAttributeUseCaseProcessingInput, DeleteEavAttributeUseCaseProcessingOutput, DeleteEavAttributeUseCaseMapInput, DeleteEavAttributeUseCaseMapOutput } from './types';
export declare type IDeleteEavAttributeUseCase = IUseCase<DeleteEavAttributeUseCaseInput, DeleteEavAttributeUseCaseOutput, DeleteEavAttributeUseCaseContext>;
export declare class DeleteEavAttributeUseCase extends UseCase<DeleteEavAttributeUseCaseInput, DeleteEavAttributeUseCaseOutput, DeleteEavAttributeUseCaseContext> implements IDeleteEavAttributeUseCase {
    protected readonly _mapper: IEavAttributeMapper;
    protected readonly _repo: IEavEntityRepo;
    constructor(_mapper: IEavAttributeMapper, _repo: IEavEntityRepo);
    validate: UseCasePipeMethod<DeleteEavAttributeUseCaseValidateInput, DeleteEavAttributeUseCaseValidateOutput>;
    processing: UseCasePipeMethod<DeleteEavAttributeUseCaseProcessingInput, DeleteEavAttributeUseCaseProcessingOutput>;
    map: UseCasePipeMethod<DeleteEavAttributeUseCaseMapInput, DeleteEavAttributeUseCaseMapOutput>;
}
