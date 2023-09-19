import { NgWizardDataService } from './ng-wizard-data.service';
import { THEME } from '../utils/enums';
import { Observable } from 'rxjs';
import { StepChangedArgs } from '../utils/interfaces';
import * as i0 from "@angular/core";
export declare class NgWizardService {
    private ngWizardDataService;
    constructor(ngWizardDataService: NgWizardDataService);
    reset(): void;
    next(): void;
    previous(): void;
    show(index: number): void;
    theme(theme: THEME): void;
    stepChanged(): Observable<StepChangedArgs>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgWizardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgWizardService>;
}
