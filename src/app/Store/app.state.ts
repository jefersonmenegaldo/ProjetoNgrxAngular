import { ActionReducerMap } from "@ngrx/store";
import { UsuariosEffects } from "./usuarios/usuarios.effects";
import { usuariosReducer, UsuariosState } from "./usuarios/usuarios.reducer";


export interface AppState{
  usuarios: UsuariosState

}

export const appReducer: ActionReducerMap<AppState> = {
  usuarios: usuariosReducer
}

export const appEffects = [
  UsuariosEffects
]
