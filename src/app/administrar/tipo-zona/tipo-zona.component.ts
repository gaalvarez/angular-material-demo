import { Component, OnInit } from '@angular/core';
import { TipoZona } from '../../model/tipo.zona';
import { Parametro } from '../../model/parametro';
import { TipoZonaService } from '../../services/tipo-zona.service';
import { ParametroService } from '../../services/parametro.service';
//import { SearcherComponent } from './searcher/searcher.component';
import { SearcherTipoZonaComponent } from '../searchers/searcher-tipo-zona/searcher-tipo-zona.component';
import { MdDialog } from '@angular/material';
import { LocalDataSource } from 'ng2-smart-table';
// import { KeycloakService } from '../../auth/keycloak.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'tipo-zona',
  templateUrl: './tipo-zona.component.html'
})
export class TipoZonaComponent implements OnInit {

  selectedTipoZona: TipoZona;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    showProgressBar: false,
    clickToClose: true
  };
  //for parametro asociation
  pageSize = 6;
  totalItems: number;
  currentPage: number;
  public error;
  source: LocalDataSource;
  selectedParametro: Parametro;
  originalSelectParam: Parametro;
  existTipoZona: boolean = false;
  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      nombre: {
        title: 'Nombre',
        filter: false
      },
      clave: {
        title: 'Clave',
        filter: false
      },
      descripcion: {
        title: 'Descripción',
        filter: false
      }
    },
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false
    },
    noDataMessage: 'Sin registros'
  };

  constructor(private parametroService: ParametroService, private tipoZonaService: TipoZonaService,
    private _dialog: MdDialog, private _notification_service: NotificationsService) { 
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    console.log('init component');
  }

  searchTipoZona() {
    let dialogRef = this._dialog.open(SearcherTipoZonaComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedTipoZona = result;
      if (this.selectedTipoZona) {
        this.existTipoZona = true;
        this.getListParametro();
      }
    });
  }

  deleteTipoZona(tipoZona: TipoZona): void {
    this.tipoZonaService
      .delete(String(tipoZona.idTipoZona))
      .then(() => {
        if (this.selectedTipoZona === tipoZona) { this.selectedTipoZona = null; }
        this.existTipoZona = false;
        this.sucessMsg('Correcto', 'Registro eliminado');
      }, error => this.showErrorMsg());
  }

  updateTipoZona(tipoZona: TipoZona): void {
    this.tipoZonaService
      .update(tipoZona)
      .then(() => {
        this.sucessMsg('Correcto', 'Registro actualizado');
      }, error => this.showErrorMsg());
  }

  createTipoZona(tipoZona: TipoZona): void {
    this.tipoZonaService
      .create(tipoZona)
      .then((per) => {
        this.selectedTipoZona = per;
        this.existTipoZona = true;
        this.sucessMsg('Correcto', 'Registro creado');
      }, error => this.showErrorMsg());
  }

  addTipoZona(): void {
    this.selectedTipoZona = new TipoZona();
    this.source = new LocalDataSource();
    this.existTipoZona = false;
  }

  onSelect(tipoZona: TipoZona): void {
    console.log('selected: ' + tipoZona);
    this.selectedTipoZona = tipoZona;
  }

  // for parametro asociation
  getListParametro(): void {
    this.parametroService
      .getListByTipoZona(String(this.selectedTipoZona.idTipoZona))
      .then(data => this.source.load(data)
      , error => this.showErrorMsg());
  }

  deleteParametro(parametro: Parametro): void {
    this.parametroService
      .delete(String(parametro.id))
      .then(() => {
        if (this.selectedParametro === parametro) {
          this.source.remove(this.selectedParametro);
          this.selectedParametro = null;
        }
        this.sucessMsg('Correcto', 'Parametro eliminado');
      }, error => this.showErrorMsg());
  }

  updateParametro(parametro: Parametro): void {
    parametro.idTipoZona = this.selectedTipoZona.idTipoZona;
    this.parametroService
      .update(parametro)
      .then(() => {
        this.source.update(this.originalSelectParam, this.selectedParametro);
        this.sucessMsg('Correcto', 'Registro actualizado');
      }, error => this.showErrorMsg());
  }

  createParametro(parametro: Parametro): void {
    console.log('created param whit idTipoZona: ' + this.selectedTipoZona.idTipoZona);
    parametro.idTipoZona = this.selectedTipoZona.idTipoZona;
    this.parametroService
      .create(parametro)
      .then((per) => {
        this.selectedParametro = per;
        this.sucessMsg('Correcto', 'Registro creado');
        this.source.append(this.selectedParametro);
      }, error => this.showErrorMsg());
  }

  addParametro(): void {
    this.selectedParametro = new Parametro();
  }

  onSelectParametro($event): void {
    console.log('parametro selected:');
    this.originalSelectParam = $event.data;
    this.selectedParametro = $event.data;
  }

  showErrorMsg(): void {
      this.errorMsg('Error', '¡Contacte al administador!');
  }

  sucessMsg(title: string, content: string): void {
    this._notification_service.success(
        title,
        content
    );
  }

  errorMsg(title: string, content: string): void {
    this._notification_service.error(
        title,
        content
    );
  }

}
