import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { AuthService } from 'src/app/services/auth.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent  implements OnInit {
  isloading$ = this.spinnerService.isloading$;
  imagen: ImagenesModel = new ImagenesModel();

  constructor(
    private readonly spinnerService: SpinnerService,
  ) { 
    this.imagen.url = "assets/images/logo-madguides.svg";
  }

  ngOnInit(){
    ///
  }


  

}
