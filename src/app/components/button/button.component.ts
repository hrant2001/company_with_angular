import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() button_color: string;
  @Input() text_color: string;

  @Output() btnClick = new EventEmitter(); 

  constructor() {
    this.text = '';
    this.button_color = '';
    this.text_color = '';
   }

  ngOnInit(): void {
  }

  onClick() {
    this.btnClick.emit();
  }
}
