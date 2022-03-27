import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../Models/UsuarioModel';

@Injectable({providedIn: 'root'})
export class UsuarioService{

  constructor(private http: HttpClient){

  }

  getUsuarios(){
    return this.http.get<UsuarioModel[]>('http://localhost:3000/Usuarios');
  }

  getUsuario(id:number){
    return this.http.get<UsuarioModel>('http://localhost:3000/Usuarios/'+id);
  }

  addUsuario(record:UsuarioModel){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json; charset=utf-8');

    return this.http.post<UsuarioModel>('http://localhost:3000/Usuarios',JSON.stringify(record),{headers:headers});
  }

  updateUsuario(record:UsuarioModel){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json; charset=utf-8');

    return this.http.put<UsuarioModel>('http://localhost:3000/Usuarios/' + record.id,JSON.stringify(record),{headers:headers});
  }

  deleteUsuario(id:number){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json; charset=utf-8');

    return this.http.delete('http://localhost:3000/Usuarios/' + id,{headers:headers});
  }
}
