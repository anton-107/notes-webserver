export interface EntityStore<T> {
    getOne(owner: string, id: string): Promise<T | undefined>;
    deleteOne(owner: string, id: string): Promise<void>;
    editOne(entity: T): Promise<void>;
    add(entity: T): Promise<void>;
}
