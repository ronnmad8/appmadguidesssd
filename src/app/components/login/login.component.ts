import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ClientesModel } from "../../models/Clientes.model";
import { UsuarioModel } from "../../models/Usuario.model";
import { PersonasModel } from "../../models/Personas.model";
import { AuthService } from "../../services/auth.service";
import { PersonasService } from "../../services/personas.service";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { AlertasService } from "../../services/alertas.service";
import { ClientesService } from "../../services/clientes.service";
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Output() clienteReg = new EventEmitter();

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  forma: FormGroup;
  usuario: UsuarioModel;
  persona: PersonasModel;
  btactivado;
  emailloginsel: string;
  passwloginsel: string;
  cliente: ClientesModel;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private personasService: PersonasService,
    private clientesService: ClientesService
  ) {
    this.crearFormulario();
    this.cambiosFormulario();
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size: "sm",
    };

    this.usuario = new UsuarioModel();
    this.btactivado = false;
    this.resetear();
  }

  //validaciones rojo
  get novalidoEmail() {
    return (
      this.forma.get("emaillogin").invalid &&
      this.forma.get("emaillogin").touched
    );
  }
  get novalidoPassw() {
    return (
      this.forma.get("passwlogin").invalid &&
      this.forma.get("passwlogin").touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      emaillogin: [
        "",
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      passwlogin: ["", [Validators.required, Validators.minLength(1)]],
    });
  }

  cambiosFormulario() {
    ///// statuChanges
    this.forma.valueChanges.subscribe((value) => {
      this.btactivado = false;
      this.usuario.email = this.forma.get("emaillogin").value;
      this.usuario.passw = this.forma.get("passwlogin").value;

      if (this.forma.status != "INVALID") {
        this.btactivado = true;
      }
    });
  }

  cerrarmodallogin() {
    this.resetear();
    this.modal.dismiss();
  }

  resetear() {
    this.emailloginsel = "";
    this.passwloginsel = "";
  }

  login() {
    document.getElementById("btmodallogin").click();
  }

  loginopen(content) {
    this.modal = this.modalService.open(content, this.modalOptions);
  }

  entrar() {
    if (!this.forma.invalid) {
      this.auth.login(this.usuario).subscribe(
        (resp) => {
        
          let noencontrado = true;
          if (resp != null) {
            if (resp["idrol"] == "2") {
              this.persona = resp as PersonasModel;
              if (this.persona.id != null) {
                
                noencontrado = false;
                this.cerrarmodallogin();
                this.router.navigateByUrl("/adminhome");
              }
            }
          }
          if (noencontrado) {
            this.alertasService
              .alertaKO("NO ENCONTRADO", "pruebe de nuevo")
              .then();
          }
        },
        (err) => {
          this.alertasService
            .alertaKO("NO ENCONTRADO", "pruebe de nuevo")
            .then();
        }
      );
    }
  }
}
