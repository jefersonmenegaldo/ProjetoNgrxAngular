import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../Models/UsuarioModel';
import { UsuarioService } from '../Repository/UsuarioService';
import { AppState } from '../Store/app.state';
import { Store } from '@ngrx/store';
import * as fromUsuarioAction from '../Store/usuarios/usuarios.actions';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {

  model: UsuarioModel = { id: 0, nome: '', idade: 0, perfil: '' };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  addUsuario() {
    console.log(this.model);
    if (this.model.id == 0) {
      //this.usuarioService.addUsuario(this.model).subscribe();
      this.store.dispatch(fromUsuarioAction.CreateUsuario({ payload: this.model }))
    }
    else {
      this.store.dispatch(fromUsuarioAction.UpdateUsuario({ payload: this.model }))
    }
  }
}
