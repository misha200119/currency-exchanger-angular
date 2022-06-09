import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Rates } from 'src/types/CurrencyDataFromApi';
import { x as rawData } from '../../api/testDataFromApi';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() {
    this.exchangeForm.valueChanges.subscribe(changes => {
      if (this.to?.valid
        && this.from?.valid
        && this.fromAmount?.valid
        && this.toAmount?.valid) {
        console.log('can calculate');

      }
    });
  }

  ngOnInit() {
    this.rates = rawData.rates;
  }
}
