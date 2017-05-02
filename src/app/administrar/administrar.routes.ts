import { Route } from '@angular/router';

import { TipoZonaComponent } from './tipo-zona/tipo-zona.component';
import { ZonaComponent } from './zona/zona.component';
import { AdministrarComponent } from './administrar.component';
import { LayoutComponent } from '../layout/layout.component';

export const AdministrarRoutes: Route[] = [
    {
        path: 'administrar',
        component: LayoutComponent,
        children: [
            {
                path: 'zona',
                component: ZonaComponent
            },
            {
                path: 'tipo-zona',
                component: TipoZonaComponent
            }
        ]
    }
];
