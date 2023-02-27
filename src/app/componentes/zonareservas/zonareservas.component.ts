import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { trigger, animate, transition, style } from '@angular/animations';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/global.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from 'src/app/models/User.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from 'src/app/models/Cart.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { LoginModel } from 'src/app/models/Login.model';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';

import { Observable } from 'rxjs';
import { MicuentaService } from 'src/app/services/micuenta.service';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { HorarioModel } from 'src/app/models/Horario.model';
import { ContractModel } from 'src/app/models/Contract.model';
import { RespuestaModel } from 'src/app/models/Respuesta.model';

@Component({
  selector: 'app-zonareservas',
  templateUrl: './zonareservas.component.html',
})
export class ZonareservasComponent implements OnInit {
  @Output() updateDatosData = new EventEmitter();
  @Output() updateDatosAddress = new EventEmitter();
  @Output() zonareservas: EventEmitter<any> = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];

  sWindow: any;

  horarios: HorarioModel[] = [];
  loading: boolean = false;
  isrespon: boolean = false;
  scrollPosition: number = 0;

  verreservas: boolean = false;
  vercuenta: boolean = true;
  reservas: VisitasResultadoModel[] = [];
  loginok: boolean = false;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private micuentaService: MicuentaService,
    private alertasService: AlertasService,
    private auth: AuthService,
    private fb: FormBuilder,
    private platformService: PlatformService,
    private providerService: ProviderService,
    private headfooterService: HeadfooterService
  ) {
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
    this.providerService.setThrowPageadmin(true);
    this.listenProvider();
    this.getReservations();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollPosition = this.sWindow.pageYOffset;
  }

  listenProvider() {
    this.providerService.getThrowIsresize.subscribe((resp) => {
      this.isrespon = resp;
    });
  }

  getReservas() {
    this.pedidos.forEach((pedido) => {
      if (pedido.visitasPedido.length > 0) {
        this.reservas.push(...pedido.visitasPedido);
      }
    });
  }

  getReservations() {
    this.micuentaService.getReservation().subscribe((resp) => {
      this.horarios = resp as HorarioModel[];

      this.reservas = [];
      this.horarios.forEach((horario) => {
        if (horario.time?.time?.visit != null) {
          let visita = new VisitasResultadoModel();
          let v = horario.time?.time?.visit;
          let t = horario.time?.time;

          visita.visit_uuid = v.uuid;
          visita.visit_image_url = v.image.image.url;
          visita.visit_lang_title = v.language[0].title;
          visita.visit_lang_description = v.language[0].description;
          visita.visit_time_date = t.date;
          visita.visit_encuentro = v.encuentro;
          visita.visit_time_uuid = t.uuid;
          visita.visit_time_init = t.time_init;
          visita.visit_time_end = t.time_end;
          visita.precio = t.list_price.price;

          visita.ninos = horario.users?.filter((u) => u.old < 13).length;
          visita.adultos = horario.users.length - visita.ninos;
          visita.codigoreserva = horario.uuid.toString();
          visita.status = horario.status.name  ;

          this.reservas.push(visita);
        }
      });
    });
  }

  cancelarVisita(reserva) {
    this.alertasService
      .alertaWarning('Madguides', '¿Seguro que desea eliminar?')
      .then((result) => {
        if (result.value) {
          this.micuentaService
            .deleteReservation(reserva.codigoreserva)
            .subscribe((resp) => {
              let respuesta = resp as RespuestaModel;
              if ((respuesta.status = 'success')) {
                this.alertasService.alertaInfo(
                  'Madguides',
                  'Visita cancelada correctamente'
                );
              }
              this.getReservations();
            });
        }
      });
  }


  reservarahora(reserva) {
    this.alertasService
      .alertaWarning('Madguides', '¿Seguro que desea reservar la visita?')
      .then((result) => {
        if (result.value) {
           //guardar en carrito la reserva
           
           this.router.navigate(['/carrito']);
        }
      });
  }







}
