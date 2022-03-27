import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../Models/UsuarioModel';
import { UsuarioService } from '../Repository/UsuarioService';
import { AppState } from '../Store/app.state';
import { Store } from '@ngrx/store';
import * as fromUsuarioAction from '../Store/usuarios/usuarios.actions';
import { Observable } from 'rxjs';
import * as fromUsuarioSelector from '../Store/usuarios/usuarios.reducer';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  //listaUsuario: UsuarioModel[] = [];

  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuarioSelector.getUsuarios);
  usuario$: Observable<UsuarioModel | null> = this.store.select(fromUsuarioSelector.getUsuario);

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromUsuarioAction.LoadUsuarios());

    //this.usuarioService.getUsuarios().subscribe((usuarios:UsuarioModel[])=>{
    //  this.listaUsuario = usuarios;
    //});
  }

  editar(id: number) {
    this.store.dispatch(fromUsuarioAction.LoadUsuario({ payload: id }));
  }

  excluir(id: number) {
    this.store.dispatch(fromUsuarioAction.DeleteUsuario({ payload: id }));
  }

}
