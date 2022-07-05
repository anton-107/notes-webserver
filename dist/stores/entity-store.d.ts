export interface EntityStore<T> {
    getOne(owner: string, id: string): Promise<T | undefined>;
}
