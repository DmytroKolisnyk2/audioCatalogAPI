declare interface ParamsDictionary {
  [key: string]: string;
}

declare interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}
