export * from "./User";
export * from "./Word";

export type Entity<T> = {
    id: number | string;
} & T;
