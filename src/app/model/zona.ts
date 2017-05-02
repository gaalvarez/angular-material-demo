import {TipoZona } from './tipo.zona';

export class Zona {

  idZona: number;
  catTipoZona: TipoZona;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}