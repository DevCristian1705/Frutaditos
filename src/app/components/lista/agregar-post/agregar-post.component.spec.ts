import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { of } from "rxjs";
import { ILista } from "../interface/lista.interface";
import { ListaService } from "../service/lista.service";
import { AgregarPostComponent } from "./agregar-post.component";


describe('@AgregarPostComponent', () => {
  let component: AgregarPostComponent; 
  const StubMatDialogRef = jasmine.createSpyObj< MatDialogRef<AgregarPostComponent>>('MatDialogRef', ['close']);
  const StubILista = jasmine.createSpyObj<ILista>('ILista', ['id']);
  const StubListaService = jasmine.createSpyObj<ListaService>('ListaService', ['save']);
  const StubMatSnackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    beforeEach(() => {
      component = new AgregarPostComponent(StubMatDialogRef, StubILista, StubListaService, StubMatSnackBar);
    });

    describe('when run onSave', () => {
      it('#should close dialogref', () => {
        const RespPost = {
          userId: 0,
          id: 0,
          title: 'string',
          body: 'string',
        }
        //Arrange
        StubListaService.save.and.returnValue(of(RespPost)); 
        const spy = spyOn(component, 'onSave' );
        //Act
        component.onSave();
        //Assert
        expect(spy).toHaveBeenCalled(); 
      });
    }); 
  });