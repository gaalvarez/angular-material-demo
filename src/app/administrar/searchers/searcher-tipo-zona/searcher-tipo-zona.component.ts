import { Component, OnInit } from '@angular/core';

import { TipoZonaService } from '../../../services/tipo-zona.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TipoZona } from '../../../model/tipo.zona';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-searcher-tipo-zona',
  templateUrl: './searcher-tipo-zona.component.html',
  styleUrls: ['./searcher-tipo-zona.component.scss']
})
export class SearcherTipoZonaComponent implements OnInit {

pageSize = 6;
  totalItems: number;
  currentPage: number;
  public error;
  source: LocalDataSource;
  private selectedTipoZona: TipoZona;
  settings = {
    columns: {
      idTipoZona: {
        title: 'ID',
        filter: false
      },
      nombreZona: {
        title: 'Nombre',
        filter: false
      },
      claveZona: {
        title: 'Clave',
        filter: false
      },
      descripcionZona: {
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

  constructor(private personService: TipoZonaService, public dialogRef: MdDialogRef<SearcherTipoZonaComponent>) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    // this.getTipoZona();
    this.currentPage = 1;
  }

  selectRow(): void {
    this.dialogRef.close(this.selectedTipoZona);
  }

  onRowSelect($event): void {
    console.log('row select');
    this.selectedTipoZona = $event.data;
  }

  onPageChange($event): void {
    console.log('onPageChange. ' + this.currentPage);
    this.getTipoZona();
  }

  getTipoZona(): void {
    this.personService
      .count()
      .then(data => this.totalItems = data
      , error => this.error = <any>error);
    this.personService
      .getPeople(this.pageSize, this.currentPage)
      .then(data => this.source.load(data), error => this.error = <any>error);
  }

}
