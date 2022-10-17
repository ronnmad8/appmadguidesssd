import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'madguides';
  footersinlinks: boolean = false;

  constructor()
{
  this.mostrarenlacesenfooter()
}

  nomostrarenlacesenfooter(){
     
     this.footersinlinks = true;
  }
  
  mostrarenlacesenfooter(){
     
     this.footersinlinks = false;
  }



}
