import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typesprobleme';
import { TypeProblemeService } from './typesprobleme.service';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';


@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})

export class ProblemeComponent implements OnInit {

problemeForm: FormGroup;
typesProb: ITypeProbleme[];
errorMessage: string;
messageSauvegarde: string;
prob: IProbleme; 

//constructor(private fb: FormBuilder, private typeproblemeService: TypesproblemeService) { }
constructor(private fb: FormBuilder, private typeproblemeService: TypeProblemeService, 
  private problemeService: ProblemeService, private route : Router) { }



ngOnInit(): void {
  this.problemeForm = this.fb.group({
    prenom: ['' , [Validators.required, VerifierCaracteresValidator.longueurMinimum(3)]],
    nom: ['', [Validators.required, Validators.maxLength(50)]],
    notification: [{value: 'NePasNotifier', disabled: false}],
    noTypeProbleme: ['', Validators.required],
    telephone: [{value: '', disabled: true}],
    courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true}],
      courrielConfirmation: [{value: '', disabled: true}],
    }),
    descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
    dateProbleme: {value: Date(), disabled: true},
    noUnite: ['']

  });


  this.typeproblemeService.obtenirTypesProbleme()
  .subscribe(typesP => this.typesProb = typesP,
  error => this.errorMessage = <any>error);

  this.problemeForm.get('notification').valueChanges
  .subscribe(value => this.appliquerNotifications(value));
}

appliquerNotifications(typeNotification: string): void {
  const courrielControl = this.problemeForm.get('courrielGroup.courriel');
  const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
  const courrielGroupControl = this.problemeForm.get('courrielGroup'); 
  const telephoneControl = this.problemeForm.get('telephone');     

  // Tous remettre à zéro
  courrielControl.clearValidators();
  courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
  courrielControl.disable();  

  courrielConfirmationControl.clearValidators();
  courrielConfirmationControl.reset();    
  courrielConfirmationControl.disable();

  telephoneControl.clearValidators();
  telephoneControl.reset();    
  telephoneControl.disable();


  if (typeNotification === 'ParCourriel') {   
    courrielControl.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
    courrielControl.enable(); 
     
    courrielConfirmationControl.setValidators([Validators.required]);              
    courrielConfirmationControl.enable(); 

    // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
    //Validators.compose([emailMatcherValidator.courrielDifferents()]);

    courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
}   
else
{
if(typeNotification === 'ParTelephone')
{
  telephoneControl.setValidators([Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);      
  telephoneControl.enable();       
}

if(typeNotification === 'Inconnu')
{
  courrielControl.setValidators([Validators.required]);      
  courrielControl.disable();           
}
}
  courrielControl.updateValueAndValidity();   
  courrielConfirmationControl.updateValueAndValidity(); 
  courrielGroupControl.updateValueAndValidity();
  telephoneControl.updateValueAndValidity();         
  }


//TP24


save(): void {
  if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.prob = this.problemeForm.value;
        this.prob.id = 0;
        this.prob.prenom = this.problemeForm.get('prenom').value;
        this.prob.nom = this.problemeForm.get('nom').value;
        this.prob.notification =  this.problemeForm.get('notification').value;
        this.prob.noTypeProbleme = this.problemeForm.get('noTypeProbleme').value;
        this.prob.telephone = this.problemeForm.get('telephone').value;
        this.prob.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        this.prob.descriptionProbleme = this.problemeForm.get('descriptionProbleme').value;
        this.prob.noUnite = this.problemeForm.get('noUnite').value;
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.prob)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }



  
 

}
