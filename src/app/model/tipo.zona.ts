export class TipoZona {

  idTipoZona: number;
  nombreZona: string;
  claveZona: string;
  descripcionZona: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}