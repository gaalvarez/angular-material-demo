import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

    sidebarVisible: false;
    sidebarOffcanvasVisible: boolean;
    userInfo: any;
    @Output() tsEvent: EventEmitter<any> = new EventEmitter();

    constructor(  ) { }


    ngOnInit() {

    }

    toggleSidebarOffcanvasVisible() {
        
    }

    toggleSidebar() {
        this.sidebarVisible = this.sidebarVisible!;
        this.tsEvent.emit(this.sidebarVisible);
    }


    logout() {
    }

    openModalSearch() {

    }

    openModalBar() {

    }

}
