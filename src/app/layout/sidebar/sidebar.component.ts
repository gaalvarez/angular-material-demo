import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdSidenav } from "@angular/material";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    
    @ViewChild(MdSidenav)
    private sidenav: MdSidenav;
    menu: Array<any>;
    router: Router;
    sidebarOffcanvasVisible: boolean;

    constructor() {

    }

    ngOnInit() {
        
    }

    toogleSidebar(){
        this.sidenav.toggle();
    }
    
    
}
