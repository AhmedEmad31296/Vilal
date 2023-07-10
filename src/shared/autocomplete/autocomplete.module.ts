import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { OptionComponent } from './option/option.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutocompleteComponent,
    AutocompleteContentDirective,
    OptionComponent
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteContentDirective,
    OptionComponent
  ]
})
export class AutocompleteModule {
}
