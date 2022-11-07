import { Component, OnInit, Input } from '@angular/core';
import { ICat } from 'src/app/models/cats';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit {
  // constructor() {}
  @Input() cat: ICat;

  ngOnInit(): void {}
}
