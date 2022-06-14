import { Component, OnInit } from '@angular/core';
import { CurrencyDataFromApi, Rates } from 'src/types/CurrencyDataFromApi';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { calculateChangedValue } from '../../functions/calculateChangedValue';
import { CurrencyRateQueries } from 'src/api/currencyRateQueries';

@Component({
  selector: 'exchange-from',
  templateUrl: './exchangeFrom.component.html',
  styleUrls: ['exchangeFrom.component.css']
})
export class ExchangeForm implements OnInit {
  rates: Rates = {};
  exchangeForm = new FormGroup({
    from: new FormControl('', Validators.required),
    fromAmount: new FormControl('',
      [
        Validators.pattern('^[0-9]+(\.?[0-9]+)?$'),
        Validators.required
      ]),
    to: new FormControl('', Validators.required),
    toAmount: new FormControl('', [
      Validators.pattern('^[0-9]+(\.?[0-9]+)?$'),
      Validators.required
    ])
  });

  get from() {return this.exchangeForm.get('from')}
  get fromAmount() {return this.exchangeForm.get('fromAmount')}
  get to() {return this.exchangeForm.get('to')}
  get toAmount() {return this.exchangeForm.get('toAmount')}

  constructor(private currencyAPI: CurrencyRateQueries) {
  }

  calculate(changedFieldName: string) {
    const {to, from, fromAmount, toAmount, rates} = this;

    const isFromAmountValid = this.fromAmount?.valid
      && fromAmount?.value
      && (changedFieldName === 'fromAmount' || changedFieldName === 'from');

    const isToAmountValid = this.toAmount?.valid
      && toAmount?.value
      && (changedFieldName === 'toAmount' || changedFieldName === 'to');

    console.log(isFromAmountValid, isToAmountValid)
    if ((isFromAmountValid || isToAmountValid)
      && from?.value && to?.value) {
      let config;
      let changedAmount: string = '';
      let calculated;

      if ((changedFieldName === 'fromAmount'
      || changedFieldName === 'from')
      && fromAmount?.value) {
        changedAmount = 'toAmount';
        config = {
          to: to.value,
          from: from.value,
          fromAmount: fromAmount.value,
          rates: rates,
        };
        calculated = calculateChangedValue(config);
      } else if (toAmount?.value){
        changedAmount = 'fromAmount';
        config = {
          to: from.value,
          from: to.value,
          fromAmount: toAmount.value,
          rates: rates,
        };
        calculated = calculateChangedValue(config);
      }

      this.exchangeForm.patchValue({
        [changedAmount]: String(calculated),
      });
    }
  }

  onChange(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    this.calculate(element.id);
  }

  ngOnInit() {
    this.currencyAPI.getData().subscribe((dataFromServer) => {
      this.rates = (dataFromServer as CurrencyDataFromApi).rates;
    });
  }
}
