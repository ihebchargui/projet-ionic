import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BookTablePageRoutingModule } from './book-table-routing.module';

import { BookTablePage } from './book-table.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BookTablePageRoutingModule
  ],
  declarations: [BookTablePage]
})
export class BookTablePageModule {}
