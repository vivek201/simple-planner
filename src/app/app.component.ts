import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupDialogComponent } from './dialogs/group.component';
import { ItemDialogComponent } from './dialogs/item.component';
import { GroupModel } from './models/group.model';
import { ItemModel } from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: GroupModel[] = [];

  constructor(
    private dialog: MatDialog
  ) {
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
  }

  addGroup() {
    const dialogRef = this.dialog.open(GroupDialogComponent);
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        this.groups.push({
          title: result.title,
          data: []
        } as GroupModel);
      }
    });
  }

  editGroup(group: GroupModel) {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: group
    });
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        group.title = result.title
      }
    });
  }

  deleteGroup(group: GroupModel) {
    let t = confirm("Are you sure you want to delete this group?");
    if (t) {
      let index = this.groups.findIndex(x => x == group);
      this.groups.splice(index, 1);
    }
  }

  addItem(group: GroupModel) {
    const dialogRef = this.dialog.open(ItemDialogComponent);
    dialogRef.afterClosed().subscribe((result: ItemModel) => {
      if (result?.title && result?.score) {
        group.data.push({
          title: result.title,
          score: result.score
        });
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
      }
    });
  }

  deleteItem(item: ItemModel, data: ItemModel[]) {
    let t = confirm("Are you sure you want to delete this item?");
    if (t) {
      let index = data.findIndex(x => x == item);
      data.splice(index, 1);
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
