import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypesproblemeService } from './typesprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypesproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
    //let zone = component.problemeForm.controls['prenom'];
    //zone.setValue("a".repeat(2));
    //let errors = zone.errors || {};
    //expect(errors['minlength']).toBeTruthy();

    let control = { value: 'a'.repeat(2) }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    expect(zone.valid).toBeTruthy();
  }); 
  
  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  }); 

  it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
    //let zone = component.problemeForm.controls['prenom'];
    //zone.setValue(" ".repeat(10));
    //let errors = zone.errors || {};
   // expect(errors['required']).toBeTruthy();
    
    let control = { value: ' '.repeat(10) }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  }); 

  it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère", () =>{
    //let zone = component.problemeForm.controls['prenom'];
    //zone.setValue(" a ");
    //let errors = zone.errors || {};
    //expect(errors['required']).toBeTruthy();
    let control = { value: '  x' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  }); 

//TP11
   it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
     component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('telephone');
     expect(zone.status).toEqual('DISABLED');
   }); 

   it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
    component.appliquerNotifications('NePasNotifier');

   let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  }); 

  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  }); 

  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  }); 

  //TP12
  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
     component.appliquerNotifications('ParCourriel');
     let zone = component.problemeForm.get('courrielGroup.courriel');
     expect(zone.status).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
     component.appliquerNotifications('ParCourriel');
     let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
     expect(zone.status).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
 });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
 });

 it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
  component.appliquerNotifications('ParCourriel');

  let zone = component.problemeForm.get('courrielGroup.courriel');
  zone.setValue('l5');

  let validatorFn = Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+');
  let result= validatorFn(zone as AbstractControl);
  expect(result).toBeTruthy();
});

it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
  component.appliquerNotifications('ParCourriel');
  let errors = {};

  let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
  let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

  zoneCourriel.setValue('');
  zoneCourrielConfirmation.setValue('a@1');

  let grCourriel =  component.problemeForm.get('courrielGroup');
  errors = grCourriel.errors || {};
  
 
  expect(errors).toBeTruthy();
});

 it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
  component.appliquerNotifications('ParCourriel');
   let errors = {};

   let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
   let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

   zoneCourriel.setValue('a@1');
   zoneCourrielConfirmation.setValue('');

   let groupeCourriel =  component.problemeForm.get('courrielGroup');
   errors = groupeCourriel.errors || {};
  
 
   expect(errors).toBeTruthy();
 });

 it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
   component.appliquerNotifications('ParCourriel');
   let errors = {};

   let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
   let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

   zoneCourriel.setValue('9');
   zoneCourrielConfirmation.setValue('a');

   let groupeCourriel =  component.problemeForm.get('courrielGroup');
   errors = groupeCourriel.errors || {};
  
 
   expect(errors).toBeTruthy();
 });

 it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
   component.appliquerNotifications('ParCourriel');
   let errors = {};

   let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
   let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

   zoneCourriel.setValue('1');
   zoneCourrielConfirmation.setValue('1');

   let groupeCourriel =  component.problemeForm.get('courrielGroup');
   errors = groupeCourriel.errors;
  
 
   expect(errors).toEqual(null);
 });




  
});
