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

    if (
      (this.fromAmount?.valid || this.toAmount?.valid)
      && typeof fromAmount?.value === 'string'
      && typeof toAmount?.value === 'string'
      && from?.value
      && to?.value
    ) {
      let config = {
        to: fromAmount.value ? from.value : to.value,
        from: fromAmount.value ? to.value : from.value,
        fromAmount: fromAmount.value || toAmount.value,
        rates: rates,
      };
      let changedAmount: string = '';

      if (Number(fromAmount.value) || !Number(toAmount.value)) {
        changedAmount = 'toAmount';
        config = {
          to: to.value,
          from: from.value,
          fromAmount: fromAmount.value,
          rates: rates,
        };
      } else {
        changedAmount = 'fromAmount';
        config = {
          to: from.value,
          from: to.value,
          fromAmount: toAmount.value,
          rates: rates,
        };
      }
      const calculated = calculateChangedValue(config);

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
