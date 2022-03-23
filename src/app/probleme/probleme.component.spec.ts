import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
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


  
});
