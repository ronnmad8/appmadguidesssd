import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tituloadmin',
  templateUrl: './tituloadmin.component.html'
})
export class TituloadminComponent {

  @Output() editarRecursos: EventEmitter<number> = new EventEmitter<number>();

  @Input() tituloadmin: string;
  @Input() escoleccion: boolean;
  @Input() esblog: boolean;
  @Input() esgaleria: boolean;

  editarRec: number = 1;

  constructor(
  ) {}

  vertablaadmin(n) {
    this.editarRecursos.emit(n);
    this.editarRec = n;
  }

}
