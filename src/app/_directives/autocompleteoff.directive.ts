import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[autocompleteoff]'
})
export class AutoCompleteOffDirective {
  @HostBinding('autocomplete') get autoCompleteVal() {
    return this._autocompleteval;
  }

  @HostListener('focus') onFocus() {
    this._autocompleteval = 'new-password';
  }

  @HostListener('blur') onBlur() {
    this._autocompleteval = '';
  }

  private _autocompleteval = '';
}