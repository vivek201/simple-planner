import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GroupDialogComponent } from "../dialogs/group-dialog.component";
import { ItemDialogComponent } from "../dialogs/item-dialog.component";
import { GroupModel } from "../_models/group.model";
import { ItemModel } from "../_models/item.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  host: {
    class: 'group'
  }
})
export class GroupComponent {
  @Input('group') group!: GroupModel;
  @Input() screenshotMode = false;
  @Output() groupEdited = new EventEmitter<GroupModel>();
  @Output() groupDeleted = new EventEmitter<GroupModel>();

  constructor(
    private dialog: MatDialog
  ){}

  getTotals() {
    let sum = 0;
    if (this.group?.data?.length) {
      this.group.data.forEach(x => sum += x.score);
    }
    return sum;
  }

  addItem(group: GroupModel) {
    const dialogRef = this.dialog.open(ItemDialogComponent);
    dialogRef.afterClosed().subscribe((result: ItemModel) => {
      if (result?.title && result?.score) {
        group.data.push({
          title: result.title,
          score: result.score
        });

        this.groupEdited.emit(this.group);
      }
    });
  }

  onItemEdited() {
    this.groupEdited.emit(this.group);
  }

  onItemDeleted(item: ItemModel) {
    let index = this.group.data.findIndex(x => x == item);
    this.group.data.splice(index, 1);

    this.groupEdited.emit(this.group);
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
    this.groupEdited.emit(this.group);
  }

  editGroup() {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: this.group
    });
    dialogRef.afterClosed().subscribe((result: GroupModel) => {
      if (result?.title) {
        this.group.title = result.title;
        this.groupEdited.emit(this.group);
      }
    });
  }

  deleteGroup() {
    let t = confirm("Are you sure you want to delete this group?");
    if (t) {
      this.groupDeleted.emit(this.group);
    }
  }
}