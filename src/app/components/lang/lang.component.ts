import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css']
})
export class LangComponent implements OnInit {

  constructor(private translateConfigService: TranslateConfigService) {
   }

  ngOnInit(): void {
  }

  public changeLang(lang: string) {
    this.translateConfigService.changeLanguage(lang);
    // window.location.reload();
  }
}
