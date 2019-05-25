import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Nota } from '../models/nota';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  URL_NOTA = 'notas';
  editarNota$ = new Subject<Nota>();

  constructor(
    private db: AngularFireDatabase
  ) { }

  obtenerNotas() {
    return this.db.list<Nota>(`/${this.URL_NOTA}/`);
  }

  obtenerNota(id: any) {
    return this.db.object<Nota>(`/${this.URL_NOTA}/${id}`);
  }

  crearNota(nota: Nota) {
    nota.id = Date.now();
    return this.db.database.ref(`/${this.URL_NOTA}/${nota.id}`).set(nota);
  }

  editarNota(nota: Nota) {
    return this.db.database.ref(`/${this.URL_NOTA}/${nota.id}`).set(nota);
  }

  borrarNota(id: any) {
    return this.db.database.ref(`/${this.URL_NOTA}/${id}`).remove();
  }
}
