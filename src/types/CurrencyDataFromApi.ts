export type Rates = {
  [key: string]: number,
}

type Motd = {
  msg: string,
  url: string,
}


export interface CurrencyDataFromApi {
  motd?: Motd
  success?: boolean
  base: string;
  date?: string;
  rates: Rates;
}
