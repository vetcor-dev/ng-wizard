import { ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgWizardStep } from '../../utils/interfaces';
import { NgWizardStepContentDirective } from '../ng-wizard-step-content.directive';
import * as i0 from "@angular/core";
export declare class NgWizardStepComponent extends NgWizardStep implements OnInit {
    private componentFactoryResolver;
    stepContent: NgWizardStepContentDirective;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    loadComponent(): void;
    get isHidden(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgWizardStepComponent, "ng-wizard-step", never, {}, {}, never, ["*"], false, never>;
}
