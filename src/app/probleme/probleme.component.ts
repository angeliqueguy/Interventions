import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    courrielGroup: this.fb.group({
    courriel: [{value: '', disabled: true}],
    courrielConfirmation: [{value: '', disabled: true}],
    }),
    telephone: [{value: '', disabled: true}]
    });
this.typeproblemeService.obtenirTypesProbleme()
.subscribe(typesP => this.typesProb = typesP,
error => this.errorMessage = <any>error);
}



save(): void {
  }


  
 

}
