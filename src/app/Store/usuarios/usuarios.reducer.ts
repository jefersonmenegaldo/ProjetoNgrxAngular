import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as fromUsuariosAction from "../usuarios/usuarios.actions";
import { UsuarioModel } from "src/app/Models/UsuarioModel";

export interface UsuariosState {
  usuarios: UsuarioModel[];
  usuario: UsuarioModel | null,
  error: string | ''

}

export const initialState: UsuariosState = {
  usuarios: [],
  usuario: null,
  error: ''
}

const _usuariosReducer = createReducer(
  initialState,
  on(fromUsuariosAction.LoadUsuariosSucess, (state, { payload }) => ({ ...state, usuarios: payload, error: '' })),
  on(fromUsuariosAction.LoadUsuariosFail, (state, { error }) => ({ ...state, error: error })),

  on(fromUsuariosAction.LoadUsuarioSucess, (state, { payload }) => ({ ...state, usuario: payload, error: '' })),
  on(fromUsuariosAction.LoadUsuarioFail, (state, { error }) => ({ ...state, error: error })),

  on(fromUsuariosAction.CreateUsuarioSucess, (state, { payload }) => ({ ...state, usuarios: [...state.usuarios, payload], error: '' })),
  on(fromUsuariosAction.CreateUsuarioFail, (state, { error }) => ({ ...state, error: error })),

  on(fromUsuariosAction.UpdateUsuarioSucess, (state, { payload }) => ({
    ...state,
    usuarios: [...state.usuarios].map((row) => {
      if (row.id == payload.id) {
        return payload;
      }
      else {
        return row;
      }
    }),
    error: ''
  })),
  on(fromUsuariosAction.UpdateUsuarioFail, (state, { error }) => ({ ...state, error: error })),

  on(fromUsuariosAction.DeleteUsuarioSucess, (state, { payload }) => ({
    ...state,
    usuarios: [...state.usuarios].filter((filter) => filter.id != payload.id),
    error: ''
  })),
  on(fromUsuariosAction.DeleteUsuarioFail, (state, { error }) => ({ ...state, error: error }))
)

export function usuariosReducer(state = initialState, action: Action) {
  return _usuariosReducer(state, action);
}

const getusuariosFeatureState = createFeatureSelector<UsuariosState>(
  'usuarios'
)

export const getUsuarios = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState) => state.usuarios
)

export const getUsuario = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState) => state.usuario
)

export const getUsuarioErro = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState) => state.error
)

export const getUsuariosAdmn = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState) => state.usuarios.filter((filter) => filter.perfil == 'Adm')
)

export const getUsuariosPorParametro = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState, props: { perfil: string }) => state.usuarios.filter((filter) => filter.perfil == props.perfil)
)

export const getUsuariosIdadeMaiorQue18 = createSelector(
  getusuariosFeatureState,
  (state: UsuariosState) => state.usuarios.filter((filter) => filter.idade >= 18)
)
