import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
//contentHeaders.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFyMTIz' );
