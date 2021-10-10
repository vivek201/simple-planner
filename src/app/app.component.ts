import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SortableOptions } from 'sortablejs';
import { GroupDialogComponent } from './dialogs/group-dialog.component';
import { ItemDialogComponent } from './dialogs/item-dialog.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog.component';
import { GroupModel } from './_models/group.model';
import { ItemModel } from './_models/item.model';
import { SettingsService } from './_services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: GroupModel[] = [];
  screenshotMode = false;
  groupSortableOptions: SortableOptions = {
    handle: '.example-handle',
    onUpdate: () => this.saveAll()
  }
  
  get autoSave() {
    return this.settingsService.getSettings().autoSave;
  }

  constructor(
    private dialog: MatDialog,
    @Optional() private dialogRef: MatDialogRef<AppComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.groups = this.settingsService.getSettings().groups;
    if (this.data?.screenshotMode) {
      this.screenshotMode = true;
    }
  }

  addGroup() {
    const dialogRef = this.dialog.open(GroupDialogComponent);
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        this.groups.push({
          title: result.title,
          data: []
        } as GroupModel);

        this.saveAll();
      }
    });
  }

  onGroupEdited() {
    this.saveAll();
  }

  onGroupDeleted(group: GroupModel) {
    let index = this.groups.findIndex(x => x == group);
    this.groups.splice(index, 1);

    this.saveAll();
  }

  saveAll() {
    this.settingsService.saveGroups(this.groups);
  }
  
  openSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: {
        hasItems: !!this.groups.find(x => x.data.length),
        hasGroups: !!this.groups.length
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.clearAllItems) {
          this.groups.forEach(x => {
            x.data = [];
          });
        }
        if (result.clearAllData) {
          this.groups = []
        }
        this.saveAll();
      }
    });
  }

  openScreenshotMode() {
    this.dialog.open(AppComponent, {
      height: '100vh',
      width: '100vw',
      panelClass: 'screenshot-mode',
      data: {
        screenshotMode: true
      }
    });
  }

  closeScreenshotMode() {
    this.dialogRef.close();
  }
}
