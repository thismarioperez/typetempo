export * from "./User";
export * from "./Word";
export * from "./Language";
export * from "./Settings";

export type Entity<T> = {
    id: number | string;
} & T;
