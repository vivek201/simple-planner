import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ItemDialogComponent } from "../dialogs/item-dialog.component";
import { ItemModel } from "../_models/item.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input('item') item!: ItemModel;
  @Input() screenshotMode = false;
  @Output() itemEdited = new EventEmitter<ItemModel>();
  @Output() itemDeleted = new EventEmitter<ItemModel>();

  @HostBinding('class') elementClass = `example-box`;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.elementClass += ` score-${this.item?.score}`;
  }

  editItem() {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: this.item
    });
    dialogRef.afterClosed().subscribe((result: ItemModel) => {
      if (result?.title && result?.score) {
        this.item.title = result.title;
        this.item.score = result.score;

        this.itemEdited.emit(this.item);
      }
    });
  }

  deleteItem() {
    this.itemDeleted.emit(this.item);
  }
}