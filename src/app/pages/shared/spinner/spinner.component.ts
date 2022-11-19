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
  apiurl: string;
  url: string;
  imagen: ImagenesModel = new ImagenesModel();
  http: any;

  constructor(
    private readonly spinnerService: SpinnerService,
    private auth: AuthService,
    private headfooterService: HeadfooterService,
  ) { 
    this.apiurl = environment.apiurl;
    this.imagen.url = "assets/images/logo-madguides.svg";
  }

  ngOnInit(){
    ///
  }


  

}
