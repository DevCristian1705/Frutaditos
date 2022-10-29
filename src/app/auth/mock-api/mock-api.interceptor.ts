import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, Observable, of, switchMap, throwError } from 'rxjs'; 
import { MockApiService } from './mock-api.service';
import { MOCK_API_DEFAULT_DELAY } from './mock-api.constants';

@Injectable({
    providedIn: 'root'
})
export class MockApiInterceptor implements HttpInterceptor
{
    constructor(
        @Inject(MOCK_API_DEFAULT_DELAY) private _defaultDelay: number,
        private MockApiService: MockApiService
    ){}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>    {
        const {handler,urlParams} = this.MockApiService.findHandler(request.method.toUpperCase(), request.url);

        if ( !handler ){return next.handle(request);}

        handler.request = request;
        handler.urlParams = urlParams;

        return handler.response.pipe(
            delay(handler.delay ?? this._defaultDelay ?? 0),
            switchMap((response) => {
                if ( !response ){
                    response = new HttpErrorResponse({
                        error     : 'NOT FOUND',
                        status    : 404,
                        statusText: 'NOT FOUND'
                    });
                    return throwError(response);
                }

                const data = {
                    status: response[0],
                    body  : response[1]
                };

                if ( data.status >= 200 && data.status < 300 ){
                    response = new HttpResponse({
                        body      : data.body,
                        status    : data.status,
                        statusText: 'OK'
                    });

                    return of(response);
                }


                console.log('existe url');
                response = new HttpErrorResponse({
                    error     : data.body.error,
                    status    : data.status,
                    statusText: 'ERROR'
                });

                return throwError(response);
            }));
    }
}
