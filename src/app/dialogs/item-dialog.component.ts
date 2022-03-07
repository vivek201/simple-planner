import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ItemModel } from "../_models/item.model";

@Component({
  template: `
    <form (onSubmit)="onSave()" autocomplete="off">
      <h1 mat-dialog-title>Add an item</h1>
      <div mat-dialog-content>
        <mat-form-field appearance="fill" style="display:block">
          <mat-label>Name</mat-label>
          <input #input type="text" name="itemName" matInput [(ngModel)]="itemName" required autocompleteoff>
        </mat-form-field>
        <mat-form-field appearance="fill" style="display:block">
          <mat-label>Score</mat-label>
          <mat-select required name="score" [(ngModel)]="score">
            <mat-option *ngFor="let sc of scores" [value]="sc">
              {{sc}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onSave()" cdkFocusInitial>Save</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </div>
    </form>
  `
})
export class ItemDialogComponent {
  itemName = "";
  score = 0;
  scores = [1,2,3,5,8,13];

  @ViewChild('input')
  input!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemModel,
    private cd: ChangeDetectorRef
  ){
    if (data) {
      this.itemName = data.title;
      this.score = data.score;
    }
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus()
    this.cd.detectChanges();
  }

  onSave() {
    if (this.itemName && this.score) {
      this.dialogRef.close({
        title: this.itemName,
        score: this.score
      } as ItemModel);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
