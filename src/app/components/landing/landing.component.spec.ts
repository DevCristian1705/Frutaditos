import { Router } from "@angular/router";
import { LandingComponent } from "./landing.component";

 
describe('@LandingComponent', () => {
  let component: LandingComponent;
  const StubRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
 
  beforeEach(() => {
    component = new LandingComponent(StubRouter);
  });

  describe('when run onLogin', ()=> {
    it('#should go component login', () => { 
      //Act
      component.onLogin();
      //Assert
      expect(StubRouter.navigate).toHaveBeenCalled();
    });
  });

});
