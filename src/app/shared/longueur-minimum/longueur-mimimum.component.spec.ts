import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {

    it("#7 | une chaîne avec 10 espaces est invalide", () =>{
        let control = { value: ' '.repeat(10) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        
    });

    it("#8 | Une phrase avec des mots est valide", () =>{
        let control = { value: 'Vive angular' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBe(null);
        
    });

   
});