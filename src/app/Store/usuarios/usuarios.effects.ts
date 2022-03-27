import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromUsuariosAction from "./usuarios.actions"
import { UsuarioService } from "src/app/Repository/UsuarioService";
import { catchError, exhaustMap, of, map } from "rxjs";

@Injectable()
export class UsuariosEffects {
  constructor(private actions$: Actions, private usuariosServices: UsuarioService) {

  }

  loadUsuarios$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),
        exhaustMap(() => this.usuariosServices.getUsuarios()
          .pipe(
            map(payload =>
              fromUsuariosAction.LoadUsuariosSucess({ payload }),
              catchError(error => of(fromUsuariosAction.LoadUsuariosFail({ error })))
            )
          )
        )
      )
  )

  loadUsuario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
        exhaustMap((record: any) => this.usuariosServices.getUsuario(record.payload)
          .pipe(
            map(payload =>
              fromUsuariosAction.LoadUsuarioSucess({ payload }),
              catchError(error => of(fromUsuariosAction.LoadUsuarioFail({ error })))
            )
          )
        )
      )
  )

  createUsuario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
        exhaustMap((record: any) => this.usuariosServices.addUsuario(record.payload)
          .pipe(
            map(payload =>
              fromUsuariosAction.CreateUsuarioSucess({ payload }),
              catchError(error => of(fromUsuariosAction.CreateUsuarioFail({ error })))
            )
          )
        )
      )
  )

  updateUsuario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
        exhaustMap((record: any) => this.usuariosServices.updateUsuario(record.payload)
          .pipe(
            map(payload =>
              fromUsuariosAction.UpdateUsuarioSucess({ payload }),
              catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error })))
            )
          )
        )
      )
  )

  deleteUsuario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
        exhaustMap((record: any) => this.usuariosServices.deleteUsuario(record.payload)
          .pipe(
            map(() =>
              fromUsuariosAction.DeleteUsuarioSucess({ payload: record.payload  }),
              catchError(error => of(fromUsuariosAction.DeleteUsuarioFail({ error })))
            )
          )
        )
      )
  )
}
