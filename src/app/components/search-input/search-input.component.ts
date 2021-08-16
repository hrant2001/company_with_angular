import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  value = '';
  @Input() input_text = '';
  constructor() { }

  ngOnInit(): void {
  }

}
