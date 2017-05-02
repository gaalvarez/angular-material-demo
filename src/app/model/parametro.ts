export class Parametro {

  id: number;
  nombre: string;
  clave: string;
  descripcion: string;
  idTipoZona: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}