import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  template: `
    <form (onSubmit)="onSave()">
      <h1 mat-dialog-title>Add an item</h1>
      <div mat-dialog-content>
        <mat-form-field appearance="fill" style="display:block">
          <mat-label>Name</mat-label>
          <input type="text" name="itemName" matInput [(ngModel)]="itemName" required>
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
  scores = [1,2,3,5,8];

  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>
  ){}

  onSave() {
    if (this.itemName && this.score) {
      this.dialogRef.close({
        itemName: this.itemName,
        score: this.score
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}