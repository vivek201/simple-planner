import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupModel } from "../_models/group.model";

@Component({
  template: `
    <form (onSubmit)="onSave()" autocomplete="off">
      <h1 mat-dialog-title>Add a group</h1>
      <div mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input #input type="text" name="groupName" matInput [(ngModel)]="groupName" required autocompleteoff>
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
  @ViewChild('input')
  input!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupModel,
    private cd: ChangeDetectorRef
  ){
    if (data) {
      this.groupName = data.title;
    }
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
    this.cd.detectChanges();
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