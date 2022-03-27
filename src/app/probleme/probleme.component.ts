import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typesprobleme';
import { TypesproblemeService } from './typesprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
problemeForm: FormGroup;
typesProb: ITypeProbleme[];
errorMessage: string;
//probleme: IProbleme;
messageSauvegarde: string;

constructor(private fb: FormBuilder, private typeproblemeService: TypesproblemeService) { }



ngOnInit(): void {
  this.problemeForm = this.fb.group({
    prenom: ['' , [Validators.required, VerifierCaracteresValidator.longueurMinimum(3)]],
    nom: ['', [Validators.required, Validators.maxLength(50)]],
    noTypeProbleme: ['', Validators.required],
    telephone: [{value: '', disabled: true}],
    courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true}],
      courrielConfirmation: [{value: '', disabled: true}],
    })

  });


this.typeproblemeService.obtenirTypesProbleme()
.subscribe(typesP => this.typesProb = typesP,
error => this.errorMessage = <any>error);
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
    courrielControl.setValidators([Validators.required]);      
    courrielControl.enable(); 
     
    courrielConfirmationControl.setValidators([Validators.required]);              
    courrielConfirmationControl.enable(); 

    // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
    //Validators.compose([emailMatcherValidator.courrielDifferents()]);

    courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
}   
else
{
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



save(): void {
  }


  
 

}
