
import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//import { KeycloakService } from "../auth/keycloak.service";

@Injectable()
export class AuthGuard implements CanActivate, OnInit {


  ngOnInit() {

  }

  //  constructor(private ck: KeycloakService) {
  //    console.log("INIT AuthGuard: " + KeycloakService.auth.loggedIn )
  //  }
  //  
  //
  //  canActivate() {
  //    console.log("consulta la guarda: " + KeycloakService.auth.loggedIn)
  //    return KeycloakService.auth.lgedIn;
  //  }

  
  constructor() {
    console.log("INIT AuthGuard whithout security ")
  }
  canActivate() {
    console.log("consulta la guarda: always true")
    return true;
  }

}
