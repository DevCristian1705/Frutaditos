
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { ILista, ISaveLista } from '../interface/lista.interface';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  
  url : any;

  constructor(private http: HttpClient) { }
  
  list() {
    return this.http.get<ILista[]>(`https://jsonplaceholder.typicode.com/users`);
  }

  listById(id : number) {
    return this.http.get<ISaveLista[]>(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
  }

  save(values: ISaveLista): Observable<ISaveLista> {
    return this.http.post<ISaveLista>(`https://jsonplaceholder.typicode.com/posts`, values);
  }
 
}
