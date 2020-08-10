import { Component, OnInit, Input } from '@angular/core';
import { UmlData, Attr } from '../service/parse-class.service';

@Component({
  selector: 'app-uml',
  templateUrl: './uml.component.html',
  styleUrls: ['./uml.component.css']
})
export class UmlComponent implements OnInit {
  @Input() umlData: UmlData;
  @Input() attributes: Attr[];

  constructor() { }

  ngOnInit(): void {
  }

}
