import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, Directive, Input, HostBinding, forwardRef, Component, ViewChild, EventEmitter, ContentChildren, Output, NgModule } from '@angular/core';
import { Subject, of, isObservable } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

var TOOLBAR_POSITION;
(function (TOOLBAR_POSITION) {
    TOOLBAR_POSITION["none"] = "none";
    TOOLBAR_POSITION["top"] = "top";
    TOOLBAR_POSITION["bottom"] = "bottom";
    TOOLBAR_POSITION["both"] = "both";
})(TOOLBAR_POSITION || (TOOLBAR_POSITION = {}));
var TOOLBAR_BUTTON_POSITION;
(function (TOOLBAR_BUTTON_POSITION) {
    TOOLBAR_BUTTON_POSITION["start"] = "start";
    TOOLBAR_BUTTON_POSITION["end"] = "end";
})(TOOLBAR_BUTTON_POSITION || (TOOLBAR_BUTTON_POSITION = {}));
// export enum TRANSITION_EFFECT {
//     none = 'none',
//     slide = 'slide',
//     fade = 'fade'
// }
var THEME;
(function (THEME) {
    THEME["default"] = "default";
    THEME["arrows"] = "arrows";
    THEME["circles"] = "circles";
    THEME["dots"] = "dots";
})(THEME || (THEME = {}));
var STEP_STATE;
(function (STEP_STATE) {
    STEP_STATE["normal"] = "normal";
    STEP_STATE["disabled"] = "disabled";
    STEP_STATE["error"] = "error";
    STEP_STATE["hidden"] = "hidden";
})(STEP_STATE || (STEP_STATE = {}));
var STEP_STATUS;
(function (STEP_STATUS) {
    STEP_STATUS["untouched"] = "untouched";
    STEP_STATUS["done"] = "done";
    STEP_STATUS["active"] = "active";
})(STEP_STATUS || (STEP_STATUS = {}));
var STEP_DIRECTIN;
(function (STEP_DIRECTIN) {
    STEP_DIRECTIN["forward"] = "forward";
    STEP_DIRECTIN["backward"] = "backward";
})(STEP_DIRECTIN || (STEP_DIRECTIN = {}));
var STEP_POSITION;
(function (STEP_POSITION) {
    STEP_POSITION["first"] = "first";
    STEP_POSITION["final"] = "final";
    STEP_POSITION["middle"] = "middle";
})(STEP_POSITION || (STEP_POSITION = {}));

const DEFAULT_CONFIG = {
    selected: 0,
    keyNavigation: true,
    cycleSteps: false,
    lang: {
        next: 'Next',
        previous: 'Previous'
    },
    toolbarSettings: {
        toolbarPosition: TOOLBAR_POSITION.bottom,
        toolbarButtonPosition: TOOLBAR_BUTTON_POSITION.end,
        showNextButton: true,
        showPreviousButton: true,
        toolbarExtraButtons: []
    },
    anchorSettings: {
        anchorClickable: true,
        enableAllAnchors: false,
        markDoneStep: true,
        markAllPreviousStepsAsDone: true,
        removeDoneStepOnNavigateBack: false,
        enableAnchorOnDoneStep: true
    },
    theme: THEME.default,
};

const NG_WIZARD_CONFIG_TOKEN = new InjectionToken('ngWizardCustom.config');

// https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
// Merge a `source` object to a `target` recursively
function merge(target, source) {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], merge(target[key], source[key]));
        }
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
}

class NgWizardDataService {
    config;
    resetWizard$;
    showNextStep$;
    showPreviousStep$;
    showStep$;
    setTheme$;
    stepChangedArgs$;
    _resetWizard;
    _showNextStep;
    _showPreviousStep;
    _showStep;
    _setTheme;
    _stepChangedArgs;
    _defaultConfig;
    constructor(config) {
        this.config = config;
        this._defaultConfig = { ...DEFAULT_CONFIG };
        if (this.config) {
            this._defaultConfig = merge(this._defaultConfig, this.config);
        }
        // Observable sources
        this._resetWizard = new Subject();
        this._showNextStep = new Subject();
        this._showPreviousStep = new Subject();
        this._showStep = new Subject();
        this._setTheme = new Subject();
        this._stepChangedArgs = new Subject();
        // Observable streams
        this.resetWizard$ = this._resetWizard.asObservable();
        this.showNextStep$ = this._showNextStep.asObservable();
        this.showPreviousStep$ = this._showPreviousStep.asObservable();
        this.showStep$ = this._showStep.asObservable();
        this.setTheme$ = this._setTheme.asObservable();
        this.stepChangedArgs$ = this._stepChangedArgs.asObservable();
    }
    getDefaultConfig() {
        return { ...this._defaultConfig };
    }
    resetWizard() {
        this._resetWizard.next();
    }
    showNextStep() {
        this._showNextStep.next();
    }
    showPreviousStep() {
        this._showPreviousStep.next();
    }
    showStep(index) {
        this._showStep.next(index);
    }
    setTheme(theme) {
        this._setTheme.next(theme);
    }
    stepChanged(args) {
        this._stepChangedArgs.next(args);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardDataService, deps: [{ token: NG_WIZARD_CONFIG_TOKEN, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardDataService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NG_WIZARD_CONFIG_TOKEN]
                }] }]; } });

class NgWizardService {
    ngWizardDataService;
    constructor(ngWizardDataService) {
        this.ngWizardDataService = ngWizardDataService;
    }
    reset() {
        this.ngWizardDataService.resetWizard();
    }
    next() {
        this.ngWizardDataService.showNextStep();
    }
    previous() {
        this.ngWizardDataService.showPreviousStep();
    }
    show(index) {
        this.ngWizardDataService.showStep(index);
    }
    theme(theme) {
        this.ngWizardDataService.setTheme(theme);
    }
    stepChanged() {
        return this.ngWizardDataService.stepChangedArgs$;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, deps: [{ token: NgWizardDataService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: NgWizardDataService }]; } });

class NgWizardStep {
    index;
    title;
    description;
    state;
    initialState;
    component;
    componentRef;
    canEnter;
    canExit;
    status;
    initialStatus;
    get hidden() {
        return this.status != STEP_STATUS.active;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStep, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.5", type: NgWizardStep, inputs: { title: "title", description: "description", state: "state", component: "component", canEnter: "canEnter", canExit: "canExit" }, host: { properties: { "hidden": "this.hidden" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStep, decorators: [{
            type: Directive
        }], propDecorators: { title: [{
                type: Input
            }], description: [{
                type: Input
            }], state: [{
                type: Input
            }], component: [{
                type: Input
            }], canEnter: [{
                type: Input
            }], canExit: [{
                type: Input
            }], hidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });

class NgWizardStepContentDirective {
    viewContainerRef;
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStepContentDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.5", type: NgWizardStepContentDirective, selector: "[ngWizardStepContent]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStepContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngWizardStepContent]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });

class NgWizardStepComponent extends NgWizardStep {
    componentFactoryResolver;
    stepContent;
    constructor(componentFactoryResolver) {
        super();
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnInit() {
        this.loadComponent();
    }
    loadComponent() {
        if (!this.component) {
            return;
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.stepContent.viewContainerRef.clear();
        this.componentRef = this.stepContent.viewContainerRef.createComponent(componentFactory);
    }
    get isHidden() {
        return this.state == STEP_STATE.hidden;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStepComponent, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.5", type: NgWizardStepComponent, selector: "ng-wizard-step", providers: [
            { provide: NgWizardStep, useExisting: forwardRef(() => NgWizardStepComponent) }
        ], viewQueries: [{ propertyName: "stepContent", first: true, predicate: NgWizardStepContentDirective, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"tab-pane step-content\" style=\"display: block\">\r\n    <ng-content></ng-content>\r\n    <ng-template ngWizardStepContent></ng-template>\r\n</div>", styles: [""], dependencies: [{ kind: "directive", type: NgWizardStepContentDirective, selector: "[ngWizardStepContent]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-wizard-step', providers: [
                        { provide: NgWizardStep, useExisting: forwardRef(() => NgWizardStepComponent) }
                    ], template: "<div class=\"tab-pane step-content\" style=\"display: block\">\r\n    <ng-content></ng-content>\r\n    <ng-template ngWizardStepContent></ng-template>\r\n</div>" }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }]; }, propDecorators: { stepContent: [{
                type: ViewChild,
                args: [NgWizardStepContentDirective, { static: true }]
            }] } });

class NgWizardComponent {
    ngWizardDataService;
    steps;
    _pConfig;
    get pConfig() {
        return this._pConfig || {};
    }
    set pConfig(config) {
        this._pConfig = config;
    }
    config;
    stepChanged = new EventEmitter();
    themeChanged = new EventEmitter();
    reseted = new EventEmitter();
    styles = {};
    showToolbarTop = false;
    showPreviousButton = false;
    showNextButton = false;
    showToolbarBottom = false;
    showExtraButtons = false;
    currentStepIndex = null; // Active step index
    currentStep; // Active step
    resetWizardWatcher;
    showNextStepWatcher;
    showPreviousStepWatcher;
    showStepWatcher;
    setThemeWatcher;
    constructor(ngWizardDataService) {
        this.ngWizardDataService = ngWizardDataService;
    }
    ngAfterContentInit() {
        this._backupStepStates();
        this._init();
        // Set toolbar
        this._setToolbar();
        // Assign plugin events
        this._setEvents();
        this.resetWizardWatcher = this.ngWizardDataService.resetWizard$.subscribe(() => this._reset());
        this.showNextStepWatcher = this.ngWizardDataService.showNextStep$.subscribe(() => this._showNextStep());
        this.showPreviousStepWatcher = this.ngWizardDataService.showPreviousStep$.subscribe(() => this._showPreviousStep());
        this.showStepWatcher = this.ngWizardDataService.showStep$.subscribe(index => this._showStep(index));
        this.setThemeWatcher = this.ngWizardDataService.setTheme$.subscribe(theme => this._setTheme(theme));
    }
    _init() {
        // set config
        let defaultConfig = this.ngWizardDataService.getDefaultConfig();
        this.config = merge(defaultConfig, this.pConfig);
        // set step states
        this._initSteps();
        // Set the elements
        this._initStyles();
        // Show the initial step
        this._showStep(this.config.selected);
    }
    _initSteps() {
        this.steps.forEach((step, index) => {
            step.index = index;
            step.status = step.status || STEP_STATUS.untouched;
            step.state = step.state || STEP_STATE.normal;
        });
        // Mark previous steps of the active step as done
        if (this.config.selected > 0
            && this.config.anchorSettings.markDoneStep
            && this.config.anchorSettings.markAllPreviousStepsAsDone) {
            this.steps.forEach(step => {
                if (step.state != STEP_STATE.disabled && step.state != STEP_STATE.hidden) {
                    step.status = step.index < this.config.selected ? STEP_STATUS.done : step.status;
                }
            });
        }
    }
    _backupStepStates() {
        this.steps.forEach(step => {
            step.initialStatus = step.status;
            step.initialState = step.state;
        });
    }
    _restoreStepStates() {
        this.steps.forEach(step => {
            step.status = step.initialStatus;
            step.state = step.initialState;
        });
    }
    // PRIVATE FUNCTIONS
    _initStyles() {
        // Set the main element
        this.styles.main = 'ng-wizard-main ng-wizard-theme-' + this.config.theme;
        // Set anchor elements
        this.styles.step = 'nav-item'; // li
        // Make the anchor clickable
        if (this.config.anchorSettings.enableAllAnchors && this.config.anchorSettings.anchorClickable) {
            this.styles.step += ' clickable';
        }
        // Set the toolbar styles
        this.styles.toolbarTop = 'btn-toolbar ng-wizard-toolbar ng-wizard-toolbar-top justify-content-' + this.config.toolbarSettings.toolbarButtonPosition;
        this.styles.toolbarBottom = 'btn-toolbar ng-wizard-toolbar ng-wizard-toolbar-bottom justify-content-' + this.config.toolbarSettings.toolbarButtonPosition;
        // Set previous&next buttons 
        this.styles.previousButton = 'btn btn-secondary ng-wizard-btn-prev';
        this.styles.nextButton = 'btn btn-secondary ng-wizard-btn-next';
    }
    _setToolbar() {
        this.showToolbarTop = this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.top ||
            this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.both;
        this.showToolbarBottom = this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.bottom ||
            this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.both;
        this.showPreviousButton = this.config.toolbarSettings.showPreviousButton;
        this.showNextButton = this.config.toolbarSettings.showNextButton;
        this.showExtraButtons = this.config.toolbarSettings.toolbarExtraButtons && this.config.toolbarSettings.toolbarExtraButtons.length > 0;
    }
    _setEvents() {
        //TODO: keyNavigation
        // Keyboard navigation event
        if (this.config.keyNavigation) {
            // $(document).keyup(function (e) {
            //   mi._keyNav(e);
            // });
        }
    }
    _getStepCssClass(selectedStep) {
        let stepClass = this.styles.step;
        switch (selectedStep.state) {
            case STEP_STATE.disabled:
                stepClass += ' disabled';
                break;
            case STEP_STATE.error:
                stepClass += ' danger';
                break;
            case STEP_STATE.hidden:
                stepClass += ' hidden';
                break;
        }
        switch (selectedStep.status) {
            case STEP_STATUS.done:
                stepClass += ' done';
                break;
            case STEP_STATUS.active:
                stepClass += ' active';
                break;
        }
        return stepClass;
    }
    _showSelectedStep(event, selectedStep) {
        event.preventDefault();
        if (!this.config.anchorSettings.anchorClickable) {
            return;
        }
        if (!this.config.anchorSettings.enableAnchorOnDoneStep && selectedStep.status == STEP_STATUS.done) {
            return true;
        }
        if (selectedStep.index != this.currentStepIndex) {
            if (this.config.anchorSettings.enableAllAnchors && this.config.anchorSettings.anchorClickable) {
                this._showStep(selectedStep.index);
            }
            else {
                if (selectedStep.status == STEP_STATUS.done) {
                    this._showStep(selectedStep.index);
                }
            }
        }
    }
    _showNextStep(event) {
        if (event) {
            event.preventDefault();
        }
        // Find the next not disabled & hidden step
        let filteredSteps = this.steps.filter(step => {
            return step.index > (this.currentStepIndex == null ? -1 : this.currentStepIndex)
                && step.state != STEP_STATE.disabled
                && step.state != STEP_STATE.hidden;
        });
        if (filteredSteps.length == 0) {
            if (!this.config.cycleSteps) {
                return;
            }
            this._showStep(0);
        }
        else {
            this._showStep(filteredSteps.shift().index);
        }
    }
    _showPreviousStep(event) {
        if (event) {
            event.preventDefault();
        }
        // Find the previous not disabled & hidden step
        let filteredSteps = this.steps.filter(step => {
            return step.index < (this.currentStepIndex == null && this.config.cycleSteps ? this.steps.length : this.currentStepIndex)
                && step.state != STEP_STATE.disabled
                && step.state != STEP_STATE.hidden;
        });
        if (filteredSteps.length == 0) {
            if (!this.config.cycleSteps) {
                return;
            }
            this._showStep(this.steps.length - 1);
        }
        else {
            this._showStep(filteredSteps.pop().index);
        }
    }
    _showStep(selectedStepIndex) {
        // If step not found, skip
        if (selectedStepIndex >= this.steps.length || selectedStepIndex < 0) {
            return;
        }
        // If current step is requested again, skip
        if (selectedStepIndex == this.currentStepIndex) {
            return;
        }
        let selectedStep = this.steps.toArray()[selectedStepIndex];
        // If it is a disabled or hidden step, skip
        if (selectedStep.state == STEP_STATE.disabled || selectedStep.state == STEP_STATE.hidden) {
            return;
        }
        this._showLoader();
        return this._isStepChangeValid(selectedStep, this.currentStep && this.currentStep.canExit).toPromise()
            .then(isValid => {
            if (isValid) {
                return this._isStepChangeValid(selectedStep, selectedStep.canEnter).toPromise();
            }
            return of(isValid).toPromise();
        })
            .then(isValid => {
            if (isValid) {
                // Load step content
                this._loadStepContent(selectedStep);
            }
        })
            .finally(() => this._hideLoader());
    }
    _isStepChangeValid(selectedStep, condition) {
        if (typeof condition === typeof true) {
            return of(condition);
        }
        else if (condition instanceof Function) {
            let direction = this._getStepDirection(selectedStep.index);
            let result = condition({ direction: direction, fromStep: this.currentStep, toStep: selectedStep });
            if (isObservable(result)) {
                return result;
            }
            else if (typeof result === typeof true) {
                return of(result);
            }
            else {
                return of(false);
            }
        }
        return of(true);
    }
    _loadStepContent(selectedStep) {
        // Update controls
        this._setAnchor(selectedStep);
        // Set the buttons based on the step
        this._setButtons(selectedStep.index);
        // Trigger "stepChanged" event
        const args = {
            step: selectedStep,
            previousStep: this.currentStep,
            direction: this._getStepDirection(selectedStep.index),
            position: this._getStepPosition(selectedStep.index)
        };
        this.stepChanged.emit(args);
        this.ngWizardDataService.stepChanged(args);
        // Update the current index
        this.currentStepIndex = selectedStep.index;
        this.currentStep = selectedStep;
    }
    _setAnchor(selectedStep) {
        // Current step anchor > Remove other classes and add done class
        if (this.currentStep) {
            this.currentStep.status = STEP_STATUS.untouched;
            if (this.config.anchorSettings.markDoneStep) {
                this.currentStep.status = STEP_STATUS.done;
                if (this.config.anchorSettings.removeDoneStepOnNavigateBack) {
                    this.steps.forEach(step => {
                        if (step.index > selectedStep.index) {
                            step.status = STEP_STATUS.untouched;
                        }
                    });
                }
            }
        }
        // Next step anchor > Remove other classes and add active class
        selectedStep.status = STEP_STATUS.active;
    }
    _setButtons(index) {
        // Previous/Next Button enable/disable based on step
        if (!this.config.cycleSteps) {
            if (0 >= index) {
                this.styles.previousButton = 'btn btn-secondary ng-wizard-btn-prev disabled';
            }
            else {
                this.styles.previousButton = 'btn btn-secondary ng-wizard-btn-prev';
            }
            if (this.steps.length - 1 <= index) {
                this.styles.nextButton = 'btn btn-secondary ng-wizard-btn-next disabled';
            }
            else {
                this.styles.nextButton = 'btn btn-secondary ng-wizard-btn-next';
            }
        }
    }
    _extraButtonClicked(button) {
        if (button.event) {
            button.event();
        }
    }
    // HELPER FUNCTIONS
    _keyNav(event) {
        // Keyboard navigation
        switch (event.which) {
            case 37:
                // left
                this._showPreviousStep(event);
                event.preventDefault();
                break;
            case 39:
                // right
                this._showNextStep(event);
                event.preventDefault();
                break;
            default:
                return; // exit this handler for other keys
        }
    }
    _showLoader() {
        this.styles.main = 'ng-wizard-main ng-wizard-theme-' + this.config.theme + ' ng-wizard-loading';
    }
    _hideLoader() {
        this.styles.main = 'ng-wizard-main ng-wizard-theme-' + this.config.theme;
    }
    _getStepDirection(selectedStepIndex) {
        return (this.currentStepIndex != null && this.currentStepIndex != selectedStepIndex) ?
            (this.currentStepIndex < selectedStepIndex ? STEP_DIRECTIN.forward : STEP_DIRECTIN.backward) : null;
    }
    _getStepPosition(selectedStepIndex) {
        return (selectedStepIndex == 0) ? STEP_POSITION.first : (selectedStepIndex == this.steps.length - 1 ? STEP_POSITION.final : STEP_POSITION.middle);
    }
    // PUBLIC FUNCTIONS
    _setTheme(theme) {
        if (this.config.theme == theme) {
            return false;
        }
        this.config.theme = theme;
        this.styles.main = 'ng-wizard-main ng-wizard-theme-' + this.config.theme;
        // Trigger "themeChanged" event
        this.themeChanged.emit(this.config.theme);
    }
    _reset() {
        // Reset all elements and classes
        this.currentStepIndex = null;
        this.currentStep = null;
        this._restoreStepStates();
        this._init();
        // Trigger "reseted" event
        this.reseted.emit();
    }
    ngOnDestroy() {
        if (this.resetWizardWatcher) {
            this.resetWizardWatcher.unsubscribe();
        }
        if (this.showNextStepWatcher) {
            this.showNextStepWatcher.unsubscribe();
        }
        if (this.showPreviousStepWatcher) {
            this.showPreviousStepWatcher.unsubscribe();
        }
        if (this.showStepWatcher) {
            this.showStepWatcher.unsubscribe();
        }
        if (this.setThemeWatcher) {
            this.setThemeWatcher.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardComponent, deps: [{ token: NgWizardDataService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.5", type: NgWizardComponent, selector: "ng-wizard", inputs: { pConfig: ["config", "pConfig"] }, outputs: { stepChanged: "stepChanged", themeChanged: "themeChanged", reseted: "reseted" }, queries: [{ propertyName: "steps", predicate: NgWizardStep }], ngImport: i0, template: "<div id=\"ngwizard\" [ngClass]=\"styles.main\">\r\n    <ul class=\"nav nav-tabs step-anchor\">\r\n        <li *ngFor=\"let step of steps; let i = index\" [ngClass]=\"_getStepCssClass(step)\">\r\n            <a href=\"#step-{{ i }}\" (click)=\"_showSelectedStep($event, step)\" *ngIf=\"!step.hidden\"\r\n                class=\"nav-link\">{{ step.title }}<br /><small>{{ step.description }}</small></a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf=\"showToolbarTop\" [ngClass]=\"styles.toolbarTop\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ng-wizard-container tab-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div *ngIf=\"showToolbarBottom\" [ngClass]=\"styles.toolbarBottom\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [""], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-wizard', template: "<div id=\"ngwizard\" [ngClass]=\"styles.main\">\r\n    <ul class=\"nav nav-tabs step-anchor\">\r\n        <li *ngFor=\"let step of steps; let i = index\" [ngClass]=\"_getStepCssClass(step)\">\r\n            <a href=\"#step-{{ i }}\" (click)=\"_showSelectedStep($event, step)\" *ngIf=\"!step.hidden\"\r\n                class=\"nav-link\">{{ step.title }}<br /><small>{{ step.description }}</small></a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf=\"showToolbarTop\" [ngClass]=\"styles.toolbarTop\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ng-wizard-container tab-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div *ngIf=\"showToolbarBottom\" [ngClass]=\"styles.toolbarBottom\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n</div>" }]
        }], ctorParameters: function () { return [{ type: NgWizardDataService }]; }, propDecorators: { steps: [{
                type: ContentChildren,
                args: [NgWizardStep]
            }], pConfig: [{
                type: Input,
                args: ['config']
            }], stepChanged: [{
                type: Output
            }], themeChanged: [{
                type: Output
            }], reseted: [{
                type: Output
            }] } });

class NgWizardModule {
    /**
     * forRoot
     * @returns A module with its provider dependencies
     */
    static forRoot(ngWizardConfig) {
        return {
            ngModule: NgWizardModule,
            providers: [
                {
                    provide: NG_WIZARD_CONFIG_TOKEN,
                    useValue: ngWizardConfig
                }
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.5", ngImport: i0, type: NgWizardModule, declarations: [NgWizardComponent, NgWizardStepComponent, NgWizardStepContentDirective], imports: [CommonModule], exports: [NgWizardComponent, NgWizardStepComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NgWizardComponent, NgWizardStepComponent, NgWizardStepContentDirective],
                    exports: [NgWizardComponent, NgWizardStepComponent]
                }]
        }] });

/*
 * Public API Surface of ng-wizard
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgWizardComponent, NgWizardModule, NgWizardService, NgWizardStep, NgWizardStepComponent, STEP_DIRECTIN, STEP_POSITION, STEP_STATE, THEME, TOOLBAR_BUTTON_POSITION, TOOLBAR_POSITION };
//# sourceMappingURL=ng-wizard.mjs.map
