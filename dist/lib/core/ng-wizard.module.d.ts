import { ModuleWithProviders } from '@angular/core';
import { NgWizardConfig } from '../utils/interfaces';
import * as i0 from "@angular/core";
import * as i1 from "./wizard/ng-wizard.component";
import * as i2 from "./wizard-step/ng-wizard-step.component";
import * as i3 from "./ng-wizard-step-content.directive";
import * as i4 from "@angular/common";
export declare class NgWizardModule {
    /**
     * forRoot
     * @returns A module with its provider dependencies
     */
    static forRoot(ngWizardConfig: NgWizardConfig): ModuleWithProviders<NgWizardModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgWizardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgWizardModule, [typeof i1.NgWizardComponent, typeof i2.NgWizardStepComponent, typeof i3.NgWizardStepContentDirective], [typeof i4.CommonModule], [typeof i1.NgWizardComponent, typeof i2.NgWizardStepComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgWizardModule>;
}
