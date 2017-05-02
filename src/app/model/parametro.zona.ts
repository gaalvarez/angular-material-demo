import { Zona } from './zona';
import { Parametro } from './parametro';

export class ParametroZona {

  parametro: Parametro;
  zona: Zona;
  valorParametro: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
