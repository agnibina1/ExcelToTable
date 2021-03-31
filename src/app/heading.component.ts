import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<div class="container"><h2>Select a file (.csv) to import </h2></div>`,
  styles: [`h1 { font-family: Arial; }`]
})
export class HeadingComponent  {
  @Input() name: string;
}
