import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotaService } from 'src/app/services/nota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nota } from 'src/app/models/nota';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.component.html',
  styleUrls: ['./crear-nota.component.css']
})
export class CrearNotaComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<boolean>();
  categorias = [
    'trabajo',
    'personal'
  ];

  editandoNota: Nota;

  form = this.fb.group({
    nombre: [],
    categoria: [],
    texto: [],
  });

  constructor(
    private fb: FormBuilder,
    private notaService: NotaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.notaService.editarNota$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (nota: Nota) => {
        this.editandoNota = nota;
        this.form.patchValue(nota);
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit() {
    const nota = this.form.value;
    this.guardarNota(nota);
  }

  guardarNota(nota: Nota) {
    if (this.editandoNota) {
      nota.id = this.editandoNota.id;
      this.notaService.editarNota(nota).then(
        () => {
          this.editandoNota = null;
          this.form.reset();
          this.snackBar.open('Nota Guardada', null, {
            duration: 3000
          });
        }
      );
    } else {
      this.notaService.crearNota(nota).then(
        () => {
          this.form.reset();
          this.snackBar.open('Nota Creada', null, {
            duration: 3000
          });
        }
      );
    }

  }
}
