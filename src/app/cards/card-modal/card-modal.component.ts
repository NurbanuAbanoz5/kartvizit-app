import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardItem } from 'src/app/models/card-item';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent {

    cardForm !: FormGroup ;
    showSpinner : boolean = false; // progres bar ın gözükmesi başta false . 28.08.2023

    constructor( 
      private _snackBar: MatSnackBar,

      private dialogRef : MatDialogRef<CardModalComponent>,

      private fb : FormBuilder,
      private cardService : CardService,




      @Inject(MAT_DIALOG_DATA) public data : CardItem
    ) {}


    ngOnInit() :void {

      console.log(this.data), // burada karta tıklayınca kart bilgilerinden oluşan datayı title,name vs konsolda görüntüleriz
  // yeni kartvizit ekle diyince null döner çünkü data yok içeride 
       this.cardForm = this.fb.group({

        name : [this.data?.name ||'', Validators.maxLength(50)], // başlangıç değeri boştu ama karta tıklayınca 
        //dolması için name varsa modül açılınca başlangıçta name yazılı gelsin yani karta basınca. yeni kart butonuna
        //basınca data yok name yok o yüzden başlangıç boş gelsin. açılan modul boş olsun. data? data varsa name i al yoksa boş kalsın
        title : [this.data?.title ||'', [Validators.required , Validators.maxLength(255)]],
        phone :  [this.data?.phone||'', [Validators.required, Validators.maxLength(20)]], // bunların girilmesi zorunlu olduğunu belirttik değer girmezsek kırmızı yanacak
        email : [this.data?.email ||'',[Validators.email, Validators.maxLength(50)]], // @ kullanımı olmazsa kırmızı olucak. @ kullanılırsa hatasız çalışacak.
        adress : [this.data?.adress ||'', Validators.maxLength(255)],

       })

    }

    
    addCard(){

      this.showSpinner = true ; // addCard a girilince gözük.

      console.log(this.cardForm.value);

      this.cardService.addCard(this.cardForm.value)
      .subscribe ((res:any) => {
      this.getSuccess(res || "Kart Başarıyla Eklendi.");
      },(err: any)=> { this._snackBar.open( err.message || 'Bir hata oluştu', '',{


        duration : 5000,
     

    });
    this.showSpinner = false; 

      });
    }



     updateCard(){
      this.showSpinner = true;
      this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe ((res:any) => {
        console.log(res);

        this.getSuccess(res||"Kart Başarıyla Güncellendi.");
     });
    }



     deleteCard(){
      this.showSpinner = true;
      this.cardService.deleteCard( this.data.id)
      .subscribe ((res:any) => {
        console.log(res);
      this.getSuccess(res||"Kart Başarıyla Silindi.");
     });
    }



     getSuccess(message:string){


        this._snackBar.open( message,'',{


          duration : 5000,
       

      });
       this.cardService.getCards(); // güncel kartvizitleri al
       this.dialogRef.close(); // dialogu kapatmaya yarar
       this.showSpinner = false;  // apiden cevap geline , başarılı eklendi vs. gözükme
     };

    
     } // kodlarda çok tekrar eden kısım vardı. o kısımları bu fonksiyon üzerinden çağırıyoruz


    

