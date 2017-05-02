import { Injectable } from '@angular/core';
// import { KeycloakService } from "../auth/keycloak.service";
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Zona } from '../model/zona';
import { contentHeaders } from '../util/utils';
let options = new RequestOptions({ headers: contentHeaders });

@Injectable()
export class ZonaService {

  private peopleURI = 'http://localhost:8180/fincaRaiz-web/rest/zona'; // URL to web api

  constructor(private http: Http) {
    console.log('init zona component');
  }

  getPeople(rowByPages: number, numberPage: number): Promise<Zona[]> {
    return this.http
      .get(this.peopleURI + '/' + rowByPages + '/' + numberPage, this.generateHeaders())
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(zona: Zona): Promise<Zona> {
    return this.http
      .post(this.peopleURI, JSON.stringify(zona), options)
      .toPromise()
      .then(res => res.json() as Zona)
      .catch(this.handleError);
  }

  update(zona: Zona): Promise<void> {
    return this.http
      .put(this.peopleURI, JSON.stringify(zona), options)
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
    return body as Zona[] || [];
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
