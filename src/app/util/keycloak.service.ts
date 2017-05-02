//import {Injectable} from "@angular/core";
//
//declare var Keycloak: any;
//
//@Injectable()
//export class KeycloakService {
//  static auth: any = {};
//
//  static init(): Promise<any> {
//    console.log("init keycloak");
//    let keycloakAuth: any = new Keycloak('../../keycloak.json');
//    KeycloakService.auth.loggedIn = false;
//
//      return new Promise((resolve, reject) => {
//        keycloakAuth.init({ onLoad: 'login-required' })
//          .success(() => {
//            console.log("keycloak seccessful login");
//            KeycloakService.auth.loggedIn = true;
//            KeycloakService.auth.authz = keycloakAuth;
//            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/demo/protocol/openid-connect/logout?redirect_uri=/home";
//            resolve();
//          })
//          .error(() => {
//            console.log("keycloak error login");
//            reject();
//          });
//      });
//    }
//
//  login(redirectUri) {
//
//  }
//
//  logout() {
//    console.log('*** LOGOUT');
//    KeycloakService.auth.loggedIn = false;
//    KeycloakService.auth.authz = null;
//
//    window.location.href = KeycloakService.auth.logoutUrl;
//  }
//
//  getToken(): Promise<string> {
//    return new Promise<string>((resolve, reject) => {
//      if (KeycloakService.auth.authz.token) {
//        KeycloakService.auth.authz.updateToken(5)
//          .success(() => {
//            resolve(<string>KeycloakService.auth.authz.token);
//          })
//          .error(() => {
//            reject('Failed to refresh token');
//          });
//      }
//    });
//  }
//}
