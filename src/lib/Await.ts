// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types
// Allows unwrapping Promise<string> to string
export type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;
