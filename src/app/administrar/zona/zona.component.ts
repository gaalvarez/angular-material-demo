import { Component, OnInit } from '@angular/core';
import { Zona } from '../../model/zona';
import { TipoZona } from '../../model/tipo.zona';
import { Parametro } from '../../model/parametro';
import { ParametroZona } from '../../model/parametro.zona';
import { ZonaService } from '../../services/zona.service';
import { ParametroService } from '../../services/parametro.service';
//import { SearcherZonaComponent } from './searcher/searcher.zona.component';
//import { SearcherComponent } from '../tipo-zona/searcher/searcher.component';
import { SearcherTipoZonaComponent } from '../searchers/searcher-tipo-zona/searcher-tipo-zona.component';
import { SearcherZonaComponent } from '../searchers/searcher-zona/searcher-zona.component';
import { MdDialog } from '@angular/material';
// import { KeycloakService } from '../../auth/keycloak.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'zona-cmp',
    templateUrl: './zona.component.html'
})
export class ZonaComponent implements OnInit {

    selectedZona: Zona;
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
    params: Parametro[];
    originalSelectParam: Parametro;
    existZona: boolean = false;
    listParametroZona: ParametroZona[];

    constructor(private parametroService: ParametroService, private zonaService: ZonaService,
        private _dialog: MdDialog, private _notification_service: NotificationsService) {
    }

    ngOnInit() {
        console.log('init component zona');
        //this.initZona();
        this.listParametroZona = [];
    }

    private initZona(): void {
        this.selectedZona = new Zona();
        this.selectedZona.catTipoZona = new TipoZona();
    }

    searchZona() {
        let dialogRef = this._dialog.open(SearcherZonaComponent, {
            height: '400px',
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedZona = result;
            if (this.selectedZona) {
                if (this.selectedZona.catTipoZona.idTipoZona != null) {
                    this.getListParametro();
                } else {
                    this.initZona();
                }
            }
        });
    }

    searchTipoZona() {
        let dialogRef = this._dialog.open(SearcherTipoZonaComponent, {
            height: '400px',
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedZona.catTipoZona = result;
            if (this.selectedZona.catTipoZona.idTipoZona != null) {
                this.existZona = true;
                this.getListParametro();
            }
        });
    }

    deleteZona(zona: Zona): void {
        this.zonaService
            .delete(String(zona.idZona))
            .then(() => {
                if (this.selectedZona === zona) { this.selectedZona = null; }
                this.existZona = false;
                this.sucessMsg('Correcto', 'Registro eliminado');
            }, error => this.showErrorMsg());
    }

    updateZona(zona: Zona): void {
        this.zonaService
            .update(zona)
            .then(() => {
                this.sucessMsg('Correcto', 'Registro actualizado');
            }, error => this.showErrorMsg());
    }

    createZona(zona: Zona): void {
        this.zonaService
            .create(zona)
            .then((per) => {
                this.selectedZona = per;
                this.existZona = true;
                this.sucessMsg('Correcto', 'Registro creado');
            }, error => this.showErrorMsg());
    }

    addZona(): void {
        this.existZona = false;
        this.params = new Array();
        this.initZona();
    }

    onSelect(zona: Zona): void {
        console.log('selected: ' + zona);
        this.selectedZona = zona;
    }

    // for parametro value register
    getListParametro(): void {
        this.parametroService
            .getListByTipoZona(String(this.selectedZona.catTipoZona.idTipoZona))
            .then((data) => {
                this.params = data;
                this.fillListParametroZona();
            },
            error => this.showErrorMsg());
    }

    fillListParametroZona(): void {
        for (let param of this.params) {
            let parametroZona: ParametroZona = new ParametroZona();
            parametroZona.parametro = param;
            parametroZona.zona = this.selectedZona;
            this.listParametroZona.push(parametroZona);
        }
    }

    saveParametroValor(value: string): void {

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
