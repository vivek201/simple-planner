import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SettingsService } from "../services/settings.service";

@Component({
  template: `
  <h1 mat-dialog-title>Settings</h1>
  <div mat-dialog-content>
    <div>
      <mat-checkbox name="autoSave" [(ngModel)]="autoSave">Auto-Save</mat-checkbox>
    </div>
    <ng-container *ngIf="autoSave">
      <div style="margin-top: 10px" *ngIf="hasItems">
        <button mat-raised-button color="warn" (click)="onClearAllItems()">Clear all items</button>
      </div>
      <div style="margin-top: 10px" *ngIf="hasGroups">
        <button mat-raised-button color="warn" (click)="onClearAllData()">Clear all data</button>
      </div>
    </ng-container>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onSave()" cdkFocusInitial>Save</button>
    <button mat-button (click)="onCancel()">Cancel</button>
  </div>
  `
})
export class SettingsDialogComponent {
  autoSave = false;
  hasItems = false;
  hasGroups = false;
  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { hasItems:boolean, hasGroups:boolean },
    private settingsService: SettingsService
  ){
    this.autoSave = this.settingsService.getSettings().autoSave;
    this.hasItems = this.data.hasItems;
    this.hasGroups = this.data.hasGroups;
  }

  onSave() {
    this.settingsService.saveSettings({
      autoSave: this.autoSave,
      groups: this.autoSave ? this.settingsService.getSettings().groups : []
    });
    this.dialogRef.close();
  }

  onClearAllItems() {
    this.dialogRef.close({
      clearAllItems: true
    });
  }

  onClearAllData() {
    this.dialogRef.close({
      clearAllData: true
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}