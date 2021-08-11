import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupModel } from "../models/group.model";

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
    private dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupModel
  ){
    if (data) {
      this.groupName = data.title;
    }
  }

  onSave() {
    if (this.groupName) {
      this.dialogRef.close({
        title: this.groupName
      } as GroupModel);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}