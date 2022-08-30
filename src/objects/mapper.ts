export interface IMapper<DTO, Entity> {
    fromEntityToDTO(entity: Entity): DTO;
    fromDTOToEntity(dto: DTO): Entity;
}
