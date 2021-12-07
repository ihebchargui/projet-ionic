import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { DatePicker } from "@ionic-native/date-picker/ngx";
import { AlertController,ToastController } from '@ionic/angular';

interface ReservationData {
  
  Name: string;
  Phone: number;
  date:Date;
  Time: string;
  Person: number;
 
}
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
})
export class BookingHistoryPage implements OnInit {
  reservationList = [];
  reservationData:  ReservationData;
  reservationForm: FormGroup;

  constructor(private firebaseService: FirebaseService,public FB: FormBuilder,public DatePicker: DatePicker,public alertController: AlertController,private toastCtrl: ToastController
    ) {
    this.reservationData = {} as  ReservationData;
  }

  ngOnInit() {
    this.reservationForm = this.FB.group({
      Name: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      date: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      Person: ['', [Validators.required]]
     
    })
    this.firebaseService.afficherListe().subscribe(data => {
      this.reservationList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Phone: e.payload.doc.data()['Phone'],
          date: e.payload.doc.data()['Date'],
          Time: e.payload.doc.data()['Time'],
          Person: e.payload.doc.data()['Person'],
         
        };
      })
      console.log(this.reservationList);
    });
  }

 

  


  Supprimer(id) {
    this.firebaseService.supprimerEtudiant(id);
  }

  Ajouter(reservationinf) {
    reservationinf.isEdit = true;
    reservationinf.EditName = reservationinf.Name;
    reservationinf.EditPhone = reservationinf.Phone;
    reservationinf.Editdate = reservationinf.date;
    reservationinf.EditTime = reservationinf.Time;
    reservationinf.EditPerson = reservationinf.Person;
  }

  Update(reservation) {
    let reservationinf = {};
    reservationinf['Name'] = reservation.EditName;
    reservationinf['Phone'] = reservation.EditPhone;
    reservationinf['date'] = reservation.Editdate;
    reservationinf['Time'] = reservation.EditTime;
    reservationinf['Person'] = reservation.EditPerson;
    this.firebaseService.updateEtudiant(reservation.id, reservationinf);
    reservation.isEdit = false;
  }


  


}

