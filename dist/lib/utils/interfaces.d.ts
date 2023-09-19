import { TOOLBAR_POSITION, TOOLBAR_BUTTON_POSITION, /* TRANSITION_EFFECT,*/ THEME, STEP_STATE, STEP_STATUS, STEP_DIRECTIN, STEP_POSITION } from './enums';
import { Type, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface Language {
    next?: string;
    previous?: string;
}
export interface ToolbarSettings {
    toolbarPosition?: TOOLBAR_POSITION;
    toolbarButtonPosition?: TOOLBAR_BUTTON_POSITION;
    showNextButton?: boolean;
    showPreviousButton?: boolean;
    toolbarExtraButtons?: ToolbarButton[];
}
export interface ToolbarButton {
    text: string;
    class: string;
    event?: () => void;
}
export interface AnchorSettings {
    anchorClickable?: boolean;
    enableAllAnchors?: boolean;
    markDoneStep?: boolean;
    markAllPreviousStepsAsDone?: boolean;
    removeDoneStepOnNavigateBack?: boolean;
    enableAnchorOnDoneStep?: boolean;
}
export interface NgWizardConfig {
    selected?: number;
    keyNavigation?: boolean;
    cycleSteps?: boolean;
    lang?: Language;
    toolbarSettings?: ToolbarSettings;
    anchorSettings?: AnchorSettings;
    theme?: THEME;
}
export declare abstract class NgWizardStep {
    index: number;
    title: string;
    description: string;
    state?: STEP_STATE;
    initialState?: STEP_STATE;
    component: Type<any>;
    componentRef: ComponentRef<any>;
    canEnter: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
    canExit: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
    status?: STEP_STATUS;
    initialStatus?: STEP_STATUS;
    get hidden(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgWizardStep, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgWizardStep, never, never, { "title": { "alias": "title"; "required": false; }; "description": { "alias": "description"; "required": false; }; "state": { "alias": "state"; "required": false; }; "component": { "alias": "component"; "required": false; }; "canEnter": { "alias": "canEnter"; "required": false; }; "canExit": { "alias": "canExit"; "required": false; }; }, {}, never, never, false, never>;
}
export interface StepValidationArgs {
    direction: STEP_DIRECTIN;
    fromStep: NgWizardStep;
    toStep: NgWizardStep;
}
export interface StepChangedArgs {
    step: NgWizardStep;
    previousStep: NgWizardStep;
    direction: STEP_DIRECTIN;
    position: STEP_POSITION;
}
