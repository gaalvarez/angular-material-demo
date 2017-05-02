import { Injectable } from '@angular/core';
// import { KeycloakService } from "../auth/keycloak.service";
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TipoZona } from '../model/tipo.zona';
import { contentHeaders } from '../util/utils';
let options = new RequestOptions({ headers: contentHeaders });

@Injectable()
export class TipoZonaService {

  private peopleURI = 'http://localhost:8180/fincaRaiz-web/rest/tipozona'; // URL to web api

  constructor(private http: Http) {
    console.log('init person component');
  }

  getPeople(rowByPages: number, numberPage: number): Promise<TipoZona[]> {
    return this.http
      .get(this.peopleURI + '/' + rowByPages + '/' + numberPage, this.generateHeaders())
      // .get(this.peopleURI, this.generateHeaders())
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(person: TipoZona): Promise<TipoZona> {
    return this.http
      .post(this.peopleURI, JSON.stringify(person), options)
      .toPromise()
      .then(res => res.json() as TipoZona)
      .catch(this.handleError);
  }

  update(person: TipoZona): Promise<void> {
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
    return body as TipoZona[] || [];
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
