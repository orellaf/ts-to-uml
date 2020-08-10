import { Component } from '@angular/core';
import { ParseClassService, UmlData } from './service/parse-class.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  umlData: UmlData
  errorMessage: string

  constructor(private parseClassService: ParseClassService) {

  }

  ngOnInit(): void {


  }

  fileChanged(event: any) {
    console.log('event ', event)
    const file = event.target.files[0];
    const clazz = this
    // reset data
    this.errorMessage = null
    this.umlData = null

    this.parseClassService.parse(file).then(data => {
      clazz.umlData = data
    }).catch(err => { 
      clazz.errorMessage = err
    })



  }

}

