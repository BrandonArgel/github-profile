/// <reference types="vite/client" />

// declare module 'gh-polyglot
declare module 'gh-polyglot' {
  export default class GhPolyglot {
    constructor(username: string);
    userStats(callback: (err: any, stats: any) => void): void;
  }
}