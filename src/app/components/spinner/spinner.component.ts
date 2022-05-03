import { Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    
  })

  
  export class SpinnerComponent {
    
    @Input() load: any = {};
    constructor()
    { 
      this.load = false;
    }


  }