import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupDialogComponent } from './dialogs/group.component';
import { ItemDialogComponent } from './dialogs/item.component';
import { SettingsDialogComponent } from './dialogs/settings.component';
import { GroupModel } from './models/group.model';
import { ItemModel } from './models/item.model';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: GroupModel[] = [];
  screenshotMode = false;
  
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
    console.log(this.data);
    if (this.data?.screenshotMode) {
      this.screenshotMode = true;
    }
  }

  drop(event: CdkDragDrop<ItemModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.settingsService.saveGroups(this.groups);
  }

  dropGroup(event: CdkDragDrop<GroupModel[]>) {
    moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
    this.settingsService.saveGroups(this.groups);
  }

  addGroup() {
    const dialogRef = this.dialog.open(GroupDialogComponent);
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        this.groups.push({
          title: result.title,
          data: []
        } as GroupModel);

        this.settingsService.saveGroups(this.groups);
      }
    });
  }

  editGroup(group: GroupModel) {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: group
    });
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        group.title = result.title;

        this.settingsService.saveGroups(this.groups);
      }
    });
  }

  deleteGroup(group: GroupModel) {
    let t = confirm("Are you sure you want to delete this group?");
    if (t) {
      let index = this.groups.findIndex(x => x == group);
      this.groups.splice(index, 1);

      this.settingsService.saveGroups(this.groups);
    }
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
        this.settingsService.saveGroups(this.groups);
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

  addItem(group: GroupModel) {
    const dialogRef = this.dialog.open(ItemDialogComponent);
    dialogRef.afterClosed().subscribe((result: ItemModel) => {
      if (result?.title && result?.score) {
        group.data.push({
          title: result.title,
          score: result.score
        });

        this.settingsService.saveGroups(this.groups);
      }
    });
  }

  editItem(item: ItemModel) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result: ItemModel) => {
      if (result?.title && result?.score) {
        item.title = result.title;
        item.score = result.score;

        this.settingsService.saveGroups(this.groups);
      }
    });
  }

  deleteItem(item: ItemModel, data: ItemModel[]) {
    let t = confirm("Are you sure you want to delete this item?");
    if (t) {
      let index = data.findIndex(x => x == item);
      data.splice(index, 1);

      this.settingsService.saveGroups(this.groups);
    }
  }

  getTotals(group: GroupModel) {
    let sum = 0;
    if (group?.data?.length) {
      group.data.forEach(x => sum += x.score);
    }
    return sum;
  }
}
