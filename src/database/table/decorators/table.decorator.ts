export const tableNameMetadataKey = Symbol.for('table:name');
export const tableEavMetadataKey = Symbol.for('table:eav');

type TableOptions = {
    name?: string;
    eav?: {
        tableLink: string;
    };
};

export function Table(options: TableOptions): ClassDecorator {
    const { name, eav } = options;
    return (target: Function) => {
        Reflect.defineMetadata(
            tableNameMetadataKey,
            (name || target.name.toLowerCase()).toString(),
            target.prototype,
        );
        Reflect.defineMetadata(tableEavMetadataKey, eav, target.prototype);
    };
}
