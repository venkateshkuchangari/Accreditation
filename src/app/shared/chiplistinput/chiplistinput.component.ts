import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MyErrorStateMatcher } from '../form-validations';

@Component({
  selector: 'chiplistinput',
  templateUrl: './chiplistinput.component.html',
  styleUrls: ['./chiplistinput.component.scss']
})
export class ChiplistinputComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Output() valuestoParent = new EventEmitter<any>();
  @Input() inputChips
  chipsList=[]
  controlName=new FormControl();
  @Input() placeHolder
  @Input() isRequired = false;
  constructor() { }

  ngOnInit() {
    this.chipsList=[...this.inputChips]
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
      if ((value || '').trim()) {
      this.chipsList.push(value.trim());
    } 
    if (input) {
      input.value = '';
    }
    this.controlName.patchValue(this.chipsList)
   this.emittoParent()
  }
  
  clearAll() {
    this.chipsList = [];
    this.controlName.reset()
    this.emittoParent()
    }

  remove(chip): void {
    const index = this.chipsList.indexOf(chip);
    if (index >= 0) {
      this.chipsList.splice(index, 1);
    }
    this.controlName.patchValue(this.chipsList)
   this.emittoParent()
  }
  
  emittoParent(){
    this.valuestoParent.emit(this.chipsList)
  }
}
