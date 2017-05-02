import { Injectable } from '@angular/core';
// import { KeycloakService } from "../auth/keycloak.service";
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Parametro } from '../model/parametro';
import { contentHeaders } from '../util/utils';
let options = new RequestOptions({ headers: contentHeaders });

@Injectable()
export class ParametroService {

  private peopleURI = 'http://localhost:8180/fincaRaiz-web/rest/parametro'; // URL to web api

  constructor(private http: Http) {
    console.log('init parametro service');
  }

  getListByTipoZona(idTipoZona: string): Promise<Parametro[]> {
    return this.http
      .get(this.peopleURI + '/' + idTipoZona, this.generateHeaders())
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(person: Parametro): Promise<Parametro> {
    return this.http
      .post(this.peopleURI, JSON.stringify(person), options)
      .toPromise()
      .then(res => res.json() as Parametro)
      .catch(this.handleError);
  }

  update(person: Parametro): Promise<void> {
    return this.http
      .put(this.peopleURI, JSON.stringify(person), options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    return this.http
      .delete(this.peopleURI + '/' + id, options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  count(): Promise<number> {
    return this.http
      .get(this.peopleURI + '/count', options)
      .toPromise()
      .then((res) => res.json() as number)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body as Parametro[] || [];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error._body);
    return Promise.reject(error);
  }

  private generateHeaders(): RequestOptions {
    //    let authToken = KeycloakService.auth.authz.token
    let headers = new Headers({ 'Accept': 'application/json' });
    //    headers.append('Authorization', `Bearer ${authToken}`);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    options = new RequestOptions({ headers: headers });
    return options;
  }

}
