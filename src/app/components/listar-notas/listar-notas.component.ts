import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotaService } from 'src/app/services/nota.service';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Nota } from 'src/app/models/nota';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css']
})
export class ListarNotasComponent implements OnInit, OnDestroy {

  notas: Nota[] = [];

  destroyed$ = new Subject<boolean>();

  constructor(
    private notaService: NotaService
  ) { }

  ngOnInit() {
    this.notaService.obtenerNotas().valueChanges().pipe(
      takeUntil(this.destroyed$),
    ).subscribe(
      (notas) => {
        this.notas = notas;
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  editarNota(nota: Nota) {
    this.notaService.editarNota$.next(nota);
  }
}
