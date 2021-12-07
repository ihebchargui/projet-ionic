import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingHistoryPageRoutingModule } from './booking-history-routing.module';

import { BookingHistoryPage } from './booking-history.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BookingHistoryPageRoutingModule
  ],
  declarations: [BookingHistoryPage]
})
export class BookingHistoryPageModule {}
