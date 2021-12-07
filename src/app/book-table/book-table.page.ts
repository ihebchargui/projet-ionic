import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { DatePicker } from "@ionic-native/date-picker/ngx";
import { AlertController,ToastController } from '@ionic/angular';

interface ReservationData {
  
  Name: string;
  Phone: number;
  Date:Date;
  Time: string;
  Person: number;
 
}
@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.page.html',
  styleUrls: ['./book-table.page.scss'],
})
export class BookTablePage implements OnInit {
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
      Date: ['', [Validators.required]],
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
          Date: e.payload.doc.data()['Date'],
          Time: e.payload.doc.data()['Time'],
          Person: e.payload.doc.data()['Person'],
         
        };
      })
      console.log(this.reservationList);
    });
  }

  Creer() {
    console.log(this.reservationForm.value);
    this.presentConfirm()

    .catch(error => {
        console.log(error);
      });
   
    }

  


  Supprimer(id) {
    this.firebaseService.supprimerEtudiant(id);
  }

  Ajouter(reservationinf) {
    reservationinf.isEdit = true;
    reservationinf.EditName = reservationinf.Name;
    reservationinf.EditPhone = reservationinf.Phone;
    reservationinf.EditDate = reservationinf.Date;
    reservationinf.EditTime = reservationinf.Time;
    reservationinf.EditPerson = reservationinf.Person;
  }

  Update(reservation) {
    let reservationinf = {};
    reservationinf['Name'] = reservation.EditName;
    reservationinf['Phone'] = reservation.EditPhone;
    reservationinf['Date'] = reservation.EditDate;
    reservationinf['Time'] = reservation.EditTime;
    reservationinf['Person'] = reservation.EditPerson;
    this.firebaseService.updateEtudiant(reservation.id, reservationinf);
    reservation.isEdit = false;
  }


  async presentConfirm() {
    let alert = await this.alertController.create({
      header: 'Confirm Booking',
      message: 'Sure? Do you want to book table?',
      buttons: [
        {
          text:'Cancel',
          role: "cancel",
          handler: () => {
            this.presentToast("Not Intrested?. Going back...");
            this.reservationForm.reset();
          }
        },
        {
        text: 'Book',
        handler: () => {

          this.firebaseService.creerEtudiant(this.reservationForm.value).then(resp => {
            this.presentToast("Table has been Booked succesfully!");
          this.reservationForm.reset();
          
              

            });
          } 
        }
       ]
    });

    await alert.present();
  }


  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
   
  
    await toast.present();
  }



}
