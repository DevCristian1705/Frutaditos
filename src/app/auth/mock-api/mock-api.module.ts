import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MOCK_API_DEFAULT_DELAY } from './mock-api.constants';
import { MockApiInterceptor } from './mock-api.interceptor';

@NgModule({
    providers: [{
        provide : HTTP_INTERCEPTORS,
        useClass: MockApiInterceptor,
        multi   : true
    }]
})
export class MockApiModule{
 
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<MockApiModule>    {
        return {
            ngModule : MockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
