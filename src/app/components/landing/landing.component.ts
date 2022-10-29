import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  Fecha = new Date();
  AnioActual = this.Fecha.getFullYear();

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    AOS.init({
      duration : 2000
    });
  }

  onLista(){
    this.router.navigate(['/components/lista'])
  }

  onLogin(){
    this.router.navigate(['/auth'])
  }
}
