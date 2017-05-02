import { Component, OnInit } from '@angular/core';

import { ZonaService } from '../../../services/zona.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Zona } from '../../../model/zona';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-searcher-zona',
  templateUrl: './searcher-zona.component.html',
  styleUrls: ['./searcher-zona.component.css']
})
export class SearcherZonaComponent implements OnInit {

  pageSize = 6;
  totalItems: number;
  currentPage: number;
  public error;
  source: LocalDataSource;
  private selectedZona: Zona;
  settings = {
    columns: {
      idZona: {
        title: 'ID',
        filter: false
      },
      tipoZona: {
        title: 'Tipo Zona',
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

  constructor(private personService: ZonaService, public dialogRef: MdDialogRef<SearcherZonaComponent>) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    // this.getZona();
    this.currentPage = 1;
  }

  selectRow(): void {
    this.dialogRef.close(this.selectedZona);
  }

  onRowSelect($event): void {
    console.log('row select');
    this.selectedZona = $event.data;
  }

  onPageChange($event): void {
    console.log('onPageChange. ' + this.currentPage);
    this.getZona();
  }

  getZona(): void {
    this.personService
      .count()
      .then(data => this.totalItems = data
      , error => this.error = <any>error);
    this.personService
      .getPeople(this.pageSize, this.currentPage)
      .then(data => this.source.load(data), error => this.error = <any>error);
  }
  

}
