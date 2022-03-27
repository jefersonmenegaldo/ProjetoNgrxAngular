import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { UsuarioModel } from '../Models/UsuarioModel';
import { AppState } from '../Store/app.state';
import * as fromUsuarioSelector from '../Store/usuarios/usuarios.reducer';

@Component({
  selector: 'app-lista-usuarios-admin',
  templateUrl: './lista-usuarios-admin.component.html',
  styleUrls: ['./lista-usuarios-admin.component.scss']
})
export class ListaUsuariosAdminComponent implements OnInit {

  //Maneira n° 1
  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuarioSelector.getUsuariosAdmn);

  //Maneira n° 2
  listaUsuarios2: UsuarioModel[] = [];

  //Maneira n° 3
  listaUsuarios3: UsuarioModel[] = [];

  //Maneira n° 4
  listaUsuarios4: UsuarioModel[] = [];

  //Maneira n° 5
  listaUsuarios5$: Observable<UsuarioModel[]> = this.store.select(fromUsuarioSelector.getUsuariosPorParametro,{perfil: 'Adm'});

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    /// Maneira n° 2
    this.store
      .select(fromUsuarioSelector.getUsuariosAdmn)
      .subscribe((usuarios: UsuarioModel[])=>{
        this.listaUsuarios2 = usuarios;
      });

    /// Maneira n° 3
    this.store
    .select(fromUsuarioSelector.getUsuarios)
    .subscribe((usuarios: UsuarioModel[])=>{
      this.listaUsuarios3 = usuarios.filter((filter)=> filter.perfil == 'Adm');
    });

    /// Maneira n° 4
    this.store
      .select(fromUsuarioSelector.getUsuariosPorParametro,{perfil: 'Adm'})
      .subscribe((usuarios: UsuarioModel[])=>{
        this.listaUsuarios2 = usuarios;
      });
  }

}
