import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from '../mock-api/auth.utils';
import { IAuth } from '../interface/auth.interface';


@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient
    ){}

    /* SETEAMOS TOKEN EN EL LOCALSTORAGE */
    set accessToken(token: string){
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string{
        return localStorage.getItem('accessToken') ?? '';
    }

   
    signIn( data : IAuth): Observable<any>{ 
        if ( this._authenticated ){
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', data).pipe(
            switchMap((response: any) => { 
                this.accessToken = response.accessToken;
                this._authenticated = true;
                return of(response);
            })
        );
    }
 

    signOut(): Observable<any>{
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }
 
    check(): Observable<boolean>{
        if ( this._authenticated ){
            return of(true);
        }

        if ( !this.accessToken ){
            return of(false);
        }

        if ( AuthUtils.isTokenExpired(this.accessToken) ){   
            this.signOut();
            return of(false);
        }

        return of(true);
    }
}
