import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { IAdrres, ICompany, ILista } from "./interface/lista.interface";
import { ListaComponent } from "./lista.component";
import { ListaService } from "./service/lista.service";

describe('@ListaComponent', () => {
  let component: ListaComponent;
  const StubMatDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
  const StubListService = jasmine.createSpyObj<ListaService>('ListaService', ['list']);
  const StubRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(() => {
    component = new ListaComponent(StubMatDialog,StubListService, StubRouter);
  });
  

  describe('when run onLoadTable', () => {
    it('#should call list', () => {
      const RespAdress : IAdrres = 
        {
          street: 'string',
          suite: 'string',
          city: 'string',
          zipcode: 'string',
          geo: {
            lat: 'string',
            lng: 'string',
          }
        }
      const RespCompany : ICompany = 
      {
        name: 'string',
        catchPhrase: 'string',
        bs: 'string',
      }
      
      const RespList : ILista[] = [
        {
          id: 0,
          name : 'string',
          username : 'string',
          email : 'string',
          address : RespAdress,
          phone : 'string',
          website : 'string',
          company : RespCompany 
        }
      ]
      //Arrange
      StubListService.list.and.returnValue(of(RespList));
      //Act
      component.onLoadTable();
      //Assert
      expect(component.tableData).toEqual(RespList);
    });
  });

});
