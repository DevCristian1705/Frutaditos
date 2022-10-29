import { Injectable } from '@angular/core';
import * as Base64 from 'crypto-js/enc-base64';
import * as HmacSHA256 from 'crypto-js/hmac-sha256';
import * as Utf8 from 'crypto-js/enc-utf8';
import { cloneDeep } from 'lodash-es';  
import { MockApiService } from './mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthMockApi{
    private readonly _secret: any;
    private _user: any = {
        username : 'Cristian Martinez',
        email : 'cristian@gmail.com'
    };

    constructor(private _MockApiService: MockApiService) {
        this._secret = 'YOUR_VERY_CONFIDENTIAL_SECRET_FOR_SIGNING_JWT_TOKENS!!!';
        this.registerHandlers();
    }


    registerHandlers(): void    { 
        // -----------------------------------------------------------------------------------------------------
        // @ Sign in - POST
        // -----------------------------------------------------------------------------------------------------
        this._MockApiService
            .onPost('api/auth/sign-in', 1500)
            .reply(({request}) => {

                if ( request.body.username === 'cristian@gmail.com' && request.body.password === '12345678' ){
                    return [200,
                        {
                            user       : cloneDeep(this._user),
                            accessToken: this._generateJWTToken(),
                            tokenType  : 'bearer'
                        }
                    ];
                }

                return [404,false];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Verify and refresh the access token - POST
        // -----------------------------------------------------------------------------------------------------
        this._MockApiService
            .onPost('api/auth/refresh-access-token')
            .reply(({request}) => {

                const accessToken = request.body.accessToken;

                if ( this._verifyJWTToken(accessToken) ){
                    return [200,
                        {
                            user       : cloneDeep(this._user),
                            accessToken: this._generateJWTToken(),
                            tokenType  : 'bearer'
                        }
                    ];
                }

                // Invalid token
                return [401,{error: 'Invalid token'}];
            });
 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------


    private _base64url(source: any): string{
        let encodedSource = Base64.stringify(source);
        encodedSource = encodedSource.replace(/=+$/, '');
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        return encodedSource;
    }

   
    private _generateJWTToken(): string    {
        // Define token header
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        // Calcular tiempo de expiracion Token
        const date = new Date();
        let minutes = date.getMinutes();
        // 15 es los minutos que durara el token
        date.setMinutes(minutes + 15);
        const iat = Math.floor(date.getTime() / 1000);
        const exp = Math.floor((date.setDate(date.getDate())) / 1000);

        // Define token payload
        const payload = {
            iat: iat,
            iss: 'Fuse',
            exp: exp
        };

        // Stringify and encode the header
        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = this._base64url(stringifiedHeader);

        // Stringify and encode the payload
        const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
        const encodedPayload = this._base64url(stringifiedPayload);

        // Sign the encoded header and mock-api
        let signature: any = encodedHeader + '.' + encodedPayload;
        signature = HmacSHA256(signature, this._secret);
        signature = this._base64url(signature);

        // Build and return the token
        return encodedHeader + '.' + encodedPayload + '.' + signature;
    }


    private _verifyJWTToken(token: string): boolean
    {
        // Split the token into parts
        const parts = token.split('.');
        const header = parts[0];
        const payload = parts[1];
        const signature = parts[2];

        // Re-sign and encode the header and payload using the secret
        const signatureCheck = this._base64url(HmacSHA256(header + '.' + payload, this._secret));

        // Verify that the resulting signature is valid
        return (signature === signatureCheck);
    }
}
