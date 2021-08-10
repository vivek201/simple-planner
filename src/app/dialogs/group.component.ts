import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  template: `
    <form (onSubmit)="onSave()">
      <h1 mat-dialog-title>Add a group</h1>
      <div mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input type="text" name="groupName" matInput [(ngModel)]="groupName" required>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onSave()" cdkFocusInitial>Save</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </div>
    </form>
  `
})
export class GroupDialogComponent {
  groupName="";

  constructor(
    private dialogRef: MatDialogRef<GroupDialogComponent>
  ){}

  onSave() {
    if (this.groupName) {
      this.dialogRef.close({
        groupName: this.groupName
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}