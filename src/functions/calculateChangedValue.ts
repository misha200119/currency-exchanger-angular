import { Rates } from "src/types/CurrencyDataFromApi";

export type ExchangeConfig = {
  rates: Rates,
  from: string,
  fromAmount: string,
  to: string,
}

export const calculateChangedValue: (config: ExchangeConfig) => number
= (config: ExchangeConfig) => {
  const valueFrom = parseFloat(config.fromAmount);
  const courseToUSDFrom = config.rates[config.from];
  const courseToUSDTo = config.rates[config.to];

  return courseToUSDTo / courseToUSDFrom * valueFrom;
};
