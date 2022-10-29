import { Router } from '@angular/router';
import { of } from 'rxjs'; 
import { AuthService } from '../service/auth.service';
import { LoginComponent } from './login.component';

describe('@LoginComponent', () => {
  let component: LoginComponent;
  const StubRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
  const StubAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['signIn']);

  beforeEach(() => {
    component = new LoginComponent(StubRouter, StubAuthService);
  });

  describe('when run onLogin', () => {
    it('#should call void onList', () => {
      //Arrange
      StubAuthService.signIn.and.returnValue(of('token'));
      const spy = spyOn(component, 'onList');
      //Act
      component.onLogin();
      //Assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when run onList', ()=> {
    it('#should go component lista', () => { 
      //Act
      component.onList();
      //Assert
      expect(StubRouter.navigate).toHaveBeenCalled();
    });
  });


});
