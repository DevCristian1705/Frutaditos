import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaService } from '../service/lista.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ILista } from '../interface/lista.interface';


@Component({
  selector: 'app-agregar-post',
  templateUrl: './agregar-post.component.html',
  styleUrls: ['./agregar-post.component.scss'],  
})
export class AgregarPostComponent implements OnInit {
 
  form!: FormGroup;
  post :any;
  postLocal :any[]=[] ;

  constructor(
    public dialogRef: MatDialogRef<AgregarPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILista,
    private apiService: ListaService,
    private matSnackBar: MatSnackBar
  ) { 
    this.builform();
  }

  private builform(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]), 
      userId: new FormControl(null), 
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (!this.form.valid) {
      this.matSnackBar.open(
        'Por favor, completa el formulario.',
        'Cerrar',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' }
      ); return;
    }

    this.form.disable();
    
    const newPost = this.form.getRawValue(); 
    newPost.userId = this.data.id 
    

    this.apiService.save(newPost).subscribe((response) => {
      if (response) {  
        let myArrayLocal = JSON.parse(localStorage.getItem('posts')!);
        if(myArrayLocal){
          myArrayLocal.push(response);
          let arrayPost =  JSON.stringify(myArrayLocal);
          localStorage.setItem('posts', arrayPost) 
        }else{
          let myArrayLocalVacio = []
          myArrayLocalVacio.push(response);  
          let arrayPost =  JSON.stringify(myArrayLocalVacio);
          localStorage.setItem('posts', arrayPost) 
        }
      

        this.matSnackBar.open(
          'Post registrado con éxito.' , 'Cerrar',
          { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' }
        );
        this.dialogRef.close(true);
      }
    });
  }
}
