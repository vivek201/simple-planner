import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupDialogComponent } from './dialogs/group.component';
import { ItemDialogComponent } from './dialogs/item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: any[] = [];

  constructor(
    private dialog: MatDialog
  ) {
  }

  drop(event: CdkDragDrop<{title: string}[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addItem(group: {data: any[]}) {
    const dialogRef = this.dialog.open(ItemDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result?.itemName && result?.score) {
        group.data.push({
          title: result.itemName,
          score: result.score
        });
      }
    });
  }

  addGroup() {
    const dialogRef = this.dialog.open(GroupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result?.groupName) {
        this.groups.push({
          title: result.groupName,
          data: []
        });
      }
    });
  }

  editItem(item: {title: string, score: number}) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.itemName && result?.score) {
        item.title = result.itemName;
        item.score = result.score;
      }
    });
  }

  deleteItem(item: {title: string, score: number}, data: any[]) {
    let t = confirm("Are you sure you want to delete this item?");
    if (t) {
      let index = data.findIndex(x => x == item);
      data.splice(index, 1);
    }
  }

  getTotals(group: {data: any[]}) {
    let sum = 0;
    if (group?.data?.length) {
      group.data.forEach(x => sum += x.score);
    }
    return sum;
  }
}
