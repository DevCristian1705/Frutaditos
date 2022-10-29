import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  Form!: FormGroup ;

  constructor( 
    private router : Router, 
    private authService : AuthService,
    private matSnackBar: MatSnackBar
  ) { 
    this.builform();
  }

  private builform(): void {
    this.Form = new FormGroup({
      username: new FormControl( 'cristian@gmail.com', [Validators.required, Validators.email]), 
      password: new FormControl( '12345678', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void { 
  }

  onLogin(): void {
    const userLogin = this.Form.getRawValue();
    this.authService.signIn(userLogin).subscribe((resp) => {
      this.onList();  
    }, error => {
      this.matSnackBar.open(
        'El usuario no existe, intente con el usuario cristian@gmail.com y la contraseña 12345678',
        'Cerrar',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'end' }
      );
       return;
    });
  }

  onList(): void {
    this.router.navigate(['/components/lista']) 
  }

}
