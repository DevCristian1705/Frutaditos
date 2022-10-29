import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgregarPostComponent } from './agregar-post/agregar-post.component';
import { ILista, ISaveLista } from './interface/lista.interface';
import { ListaService } from './service/lista.service';
 
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class ListaComponent implements OnInit {
  
  dataSource! : any[];
  columnsToDisplay = ['name', 'username', 'address' , 'email', 'phone', 'post'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any
  arraypost : ISaveLista[] = []; 
  tableData: ILista[] = [];
 

  constructor(
    private dialog: MatDialog,
    private apiService: ListaService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.onLoadTable();
  }

  onLoadTable(){
    this.apiService.list().subscribe((resp) => {
      if (resp) {  
        this.tableData = resp;
      }
    });
  }

  onListPostById(element: any){    
    let arrayLocales = JSON.parse(localStorage.getItem('posts')!); 
    if(arrayLocales){ 
      this.arraypost = [];
      arrayLocales.forEach((elem :any) => {
        if(elem.userId == element.id){
          this.arraypost.push(elem);  
        }
      }); 
    }
    /** OBTENEMOS EL LISTADO DEL COLLECTION */
    // this.apiService.listById(element.id).subscribe((resp)=> {
    //   this.arraypost = resp; 
    // })
  }
 

  onAddPost(element : any){  
    const dialogRef = this.dialog.open(AgregarPostComponent, {
      width: '500px',
      height: '320px',
      disableClose: true,
      data: element
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onLoadTable();
      }
    }); 
  }

  onReturn(){
    this.router.navigate(['/components'])  
  }


}

 
 