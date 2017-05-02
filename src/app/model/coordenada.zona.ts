import { Zona } from './zona';

export class CoordenadaZona {

  id: number;
  latitud: number;
  longitud: number;
  altitud: number;
  orden: number;
  zona: Zona;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}