import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GroupDialogComponent } from './dialogs/group-dialog.component';
import { ItemDialogComponent } from './dialogs/item-dialog.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { ItemComponent } from './item/item.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupDialogComponent,
    ItemDialogComponent,
    SettingsDialogComponent,

    ItemComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,

    SortablejsModule.forRoot({animation: 120})
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, width: '400px'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
