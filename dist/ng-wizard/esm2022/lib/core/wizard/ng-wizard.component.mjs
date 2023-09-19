import { Component, Input, EventEmitter, Output, ContentChildren } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { NgWizardStep } from '../../utils/interfaces';
import { TOOLBAR_POSITION, STEP_STATE, STEP_STATUS, STEP_DIRECTIN, STEP_POSITION } from '../../utils/enums';
import { merge } from '../../utils/functions';
import * as i0 from "@angular/core";
import * as i1 from "../ng-wizard-data.service";
import * as i2 from "@angular/common";
export class NgWizardComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardComponent, deps: [{ token: i1.NgWizardDataService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.5", type: NgWizardComponent, selector: "ng-wizard", inputs: { pConfig: ["config", "pConfig"] }, outputs: { stepChanged: "stepChanged", themeChanged: "themeChanged", reseted: "reseted" }, queries: [{ propertyName: "steps", predicate: NgWizardStep }], ngImport: i0, template: "<div id=\"ngwizard\" [ngClass]=\"styles.main\">\r\n    <ul class=\"nav nav-tabs step-anchor\">\r\n        <li *ngFor=\"let step of steps; let i = index\" [ngClass]=\"_getStepCssClass(step)\">\r\n            <a href=\"#step-{{ i }}\" (click)=\"_showSelectedStep($event, step)\" *ngIf=\"!step.hidden\"\r\n                class=\"nav-link\">{{ step.title }}<br /><small>{{ step.description }}</small></a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf=\"showToolbarTop\" [ngClass]=\"styles.toolbarTop\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ng-wizard-container tab-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div *ngIf=\"showToolbarBottom\" [ngClass]=\"styles.toolbarBottom\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n</div>", styles: [""], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-wizard', template: "<div id=\"ngwizard\" [ngClass]=\"styles.main\">\r\n    <ul class=\"nav nav-tabs step-anchor\">\r\n        <li *ngFor=\"let step of steps; let i = index\" [ngClass]=\"_getStepCssClass(step)\">\r\n            <a href=\"#step-{{ i }}\" (click)=\"_showSelectedStep($event, step)\" *ngIf=\"!step.hidden\"\r\n                class=\"nav-link\">{{ step.title }}<br /><small>{{ step.description }}</small></a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf=\"showToolbarTop\" [ngClass]=\"styles.toolbarTop\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ng-wizard-container tab-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div *ngIf=\"showToolbarBottom\" [ngClass]=\"styles.toolbarBottom\">\r\n        <div class=\"btn-group mr-2 ng-wizard-btn-group\" role=\"group\">\r\n            <button *ngIf=\"showPreviousButton\" [ngClass]=\"styles.previousButton\" type=\"button\"\r\n                (click)=\"_showPreviousStep($event)\">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf=\"showNextButton\" [ngClass]=\"styles.nextButton\" type=\"button\"\r\n                (click)=\"_showNextStep($event)\">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf=\"showExtraButtons\" class=\"btn-group mr-2 ng-wizard-btn-group-extra\" role=\"group\">\r\n            <button *ngFor=\"let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index\"\r\n                [ngClass]=\"button.class\" type=\"button\" (click)=\"_extraButtonClicked(button)\">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n</div>" }]
        }], ctorParameters: function () { return [{ type: i1.NgWizardDataService }]; }, propDecorators: { steps: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctd2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9uZy13aXphcmQvbGliL2NvcmUvd2l6YXJkL25nLXdpemFyZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbmctd2l6YXJkL2xpYi9jb3JlL3dpemFyZC9uZy13aXphcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsS0FBSyxFQUFhLFlBQVksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxZQUFZLEVBQTBCLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFHOUUsT0FBTyxFQUFrQixZQUFZLEVBQXNELE1BQU0sd0JBQXdCLENBQUM7QUFDMUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQVMsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQU85QyxNQUFNLE9BQU8saUJBQWlCO0lBNENSO0lBekNiLEtBQUssQ0FBMEI7SUFFdEMsUUFBUSxDQUFpQjtJQUN6QixJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUNJLE9BQU8sQ0FBQyxNQUFzQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTSxDQUFpQjtJQUViLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQUNsRCxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUN6QyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUU3QyxNQUFNLEdBT0YsRUFB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LFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIE9uRGVzdHJveSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTmdXaXphcmREYXRhU2VydmljZSB9IGZyb20gJy4uL25nLXdpemFyZC1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ1dpemFyZENvbmZpZywgTmdXaXphcmRTdGVwLCBUb29sYmFyQnV0dG9uLCBTdGVwQ2hhbmdlZEFyZ3MsIFN0ZXBWYWxpZGF0aW9uQXJncyB9IGZyb20gJy4uLy4uL3V0aWxzL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBUT09MQkFSX1BPU0lUSU9OLCBTVEVQX1NUQVRFLCBTVEVQX1NUQVRVUywgVEhFTUUsIFNURVBfRElSRUNUSU4sIFNURVBfUE9TSVRJT04gfSBmcm9tICcuLi8uLi91dGlscy9lbnVtcyc7XHJcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZnVuY3Rpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctd2l6YXJkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctd2l6YXJkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy13aXphcmQuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdXaXphcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE5nV2l6YXJkU3RlcClcclxuICBwdWJsaWMgc3RlcHM6IFF1ZXJ5TGlzdDxOZ1dpemFyZFN0ZXA+O1xyXG5cclxuICBfcENvbmZpZzogTmdXaXphcmRDb25maWc7XHJcbiAgZ2V0IHBDb25maWcoKTogTmdXaXphcmRDb25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BDb25maWcgfHwge307XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ2NvbmZpZycpXHJcbiAgc2V0IHBDb25maWcoY29uZmlnOiBOZ1dpemFyZENvbmZpZykge1xyXG4gICAgdGhpcy5fcENvbmZpZyA9IGNvbmZpZztcclxuICB9XHJcblxyXG4gIGNvbmZpZzogTmdXaXphcmRDb25maWc7XHJcblxyXG4gIEBPdXRwdXQoKSBzdGVwQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U3RlcENoYW5nZWRBcmdzPigpO1xyXG4gIEBPdXRwdXQoKSB0aGVtZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRIRU1FPigpO1xyXG4gIEBPdXRwdXQoKSByZXNldGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBzdHlsZXM6IHtcclxuICAgIG1haW4/OiBzdHJpbmc7XHJcbiAgICBzdGVwPzogc3RyaW5nO1xyXG4gICAgcHJldmlvdXNCdXR0b24/OiBzdHJpbmc7XHJcbiAgICBuZXh0QnV0dG9uPzogc3RyaW5nO1xyXG4gICAgdG9vbGJhclRvcD86IHN0cmluZztcclxuICAgIHRvb2xiYXJCb3R0b20/OiBzdHJpbmc7XHJcbiAgfSA9IHt9O1xyXG5cclxuICBzaG93VG9vbGJhclRvcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dQcmV2aW91c0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dOZXh0QnV0dG9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1Rvb2xiYXJCb3R0b206IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93RXh0cmFCdXR0b25zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY3VycmVudFN0ZXBJbmRleDogbnVtYmVyID0gbnVsbDsgLy8gQWN0aXZlIHN0ZXAgaW5kZXhcclxuICBjdXJyZW50U3RlcDogTmdXaXphcmRTdGVwOyAvLyBBY3RpdmUgc3RlcFxyXG5cclxuICByZXNldFdpemFyZFdhdGNoZXI6IFN1YnNjcmlwdGlvbjtcclxuICBzaG93TmV4dFN0ZXBXYXRjaGVyOiBTdWJzY3JpcHRpb247XHJcbiAgc2hvd1ByZXZpb3VzU3RlcFdhdGNoZXI6IFN1YnNjcmlwdGlvbjtcclxuICBzaG93U3RlcFdhdGNoZXI6IFN1YnNjcmlwdGlvbjtcclxuICBzZXRUaGVtZVdhdGNoZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1dpemFyZERhdGFTZXJ2aWNlOiBOZ1dpemFyZERhdGFTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9iYWNrdXBTdGVwU3RhdGVzKCk7XHJcblxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgIC8vIFNldCB0b29sYmFyXHJcbiAgICB0aGlzLl9zZXRUb29sYmFyKCk7XHJcblxyXG4gICAgLy8gQXNzaWduIHBsdWdpbiBldmVudHNcclxuICAgIHRoaXMuX3NldEV2ZW50cygpO1xyXG5cclxuICAgIHRoaXMucmVzZXRXaXphcmRXYXRjaGVyID0gdGhpcy5uZ1dpemFyZERhdGFTZXJ2aWNlLnJlc2V0V2l6YXJkJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcmVzZXQoKSk7XHJcbiAgICB0aGlzLnNob3dOZXh0U3RlcFdhdGNoZXIgPSB0aGlzLm5nV2l6YXJkRGF0YVNlcnZpY2Uuc2hvd05leHRTdGVwJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc2hvd05leHRTdGVwKCkpO1xyXG4gICAgdGhpcy5zaG93UHJldmlvdXNTdGVwV2F0Y2hlciA9IHRoaXMubmdXaXphcmREYXRhU2VydmljZS5zaG93UHJldmlvdXNTdGVwJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc2hvd1ByZXZpb3VzU3RlcCgpKTtcclxuICAgIHRoaXMuc2hvd1N0ZXBXYXRjaGVyID0gdGhpcy5uZ1dpemFyZERhdGFTZXJ2aWNlLnNob3dTdGVwJC5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5fc2hvd1N0ZXAoaW5kZXgpKTtcclxuICAgIHRoaXMuc2V0VGhlbWVXYXRjaGVyID0gdGhpcy5uZ1dpemFyZERhdGFTZXJ2aWNlLnNldFRoZW1lJC5zdWJzY3JpYmUodGhlbWUgPT4gdGhpcy5fc2V0VGhlbWUodGhlbWUpKTtcclxuICB9XHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgLy8gc2V0IGNvbmZpZ1xyXG4gICAgbGV0IGRlZmF1bHRDb25maWcgPSB0aGlzLm5nV2l6YXJkRGF0YVNlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpO1xyXG4gICAgdGhpcy5jb25maWcgPSBtZXJnZShkZWZhdWx0Q29uZmlnLCB0aGlzLnBDb25maWcpO1xyXG5cclxuICAgIC8vIHNldCBzdGVwIHN0YXRlc1xyXG4gICAgdGhpcy5faW5pdFN0ZXBzKCk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBlbGVtZW50c1xyXG4gICAgdGhpcy5faW5pdFN0eWxlcygpO1xyXG5cclxuICAgIC8vIFNob3cgdGhlIGluaXRpYWwgc3RlcFxyXG4gICAgdGhpcy5fc2hvd1N0ZXAodGhpcy5jb25maWcuc2VsZWN0ZWQpO1xyXG4gIH1cclxuXHJcbiAgX2luaXRTdGVwcygpIHtcclxuICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgoc3RlcCwgaW5kZXgpID0+IHtcclxuICAgICAgc3RlcC5pbmRleCA9IGluZGV4O1xyXG4gICAgICBzdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzIHx8IFNURVBfU1RBVFVTLnVudG91Y2hlZDtcclxuICAgICAgc3RlcC5zdGF0ZSA9IHN0ZXAuc3RhdGUgfHwgU1RFUF9TVEFURS5ub3JtYWw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNYXJrIHByZXZpb3VzIHN0ZXBzIG9mIHRoZSBhY3RpdmUgc3RlcCBhcyBkb25lXHJcbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0ZWQgPiAwXHJcbiAgICAgICYmIHRoaXMuY29uZmlnLmFuY2hvclNldHRpbmdzLm1hcmtEb25lU3RlcFxyXG4gICAgICAmJiB0aGlzLmNvbmZpZy5hbmNob3JTZXR0aW5ncy5tYXJrQWxsUHJldmlvdXNTdGVwc0FzRG9uZSkge1xyXG5cclxuICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgIGlmIChzdGVwLnN0YXRlICE9IFNURVBfU1RBVEUuZGlzYWJsZWQgJiYgc3RlcC5zdGF0ZSAhPSBTVEVQX1NUQVRFLmhpZGRlbikge1xyXG4gICAgICAgICAgc3RlcC5zdGF0dXMgPSBzdGVwLmluZGV4IDwgdGhpcy5jb25maWcuc2VsZWN0ZWQgPyBTVEVQX1NUQVRVUy5kb25lIDogc3RlcC5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9iYWNrdXBTdGVwU3RhdGVzKCkge1xyXG4gICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICBzdGVwLmluaXRpYWxTdGF0dXMgPSBzdGVwLnN0YXR1cztcclxuICAgICAgc3RlcC5pbml0aWFsU3RhdGUgPSBzdGVwLnN0YXRlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfcmVzdG9yZVN0ZXBTdGF0ZXMoKSB7XHJcbiAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XHJcbiAgICAgIHN0ZXAuc3RhdHVzID0gc3RlcC5pbml0aWFsU3RhdHVzO1xyXG4gICAgICBzdGVwLnN0YXRlID0gc3RlcC5pbml0aWFsU3RhdGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcbiAgX2luaXRTdHlsZXMoKSB7XHJcbiAgICAvLyBTZXQgdGhlIG1haW4gZWxlbWVudFxyXG4gICAgdGhpcy5zdHlsZXMubWFpbiA9ICduZy13aXphcmQtbWFpbiBuZy13aXphcmQtdGhlbWUtJyArIHRoaXMuY29uZmlnLnRoZW1lO1xyXG5cclxuICAgIC8vIFNldCBhbmNob3IgZWxlbWVudHNcclxuICAgIHRoaXMuc3R5bGVzLnN0ZXAgPSAnbmF2LWl0ZW0nOyAvLyBsaVxyXG5cclxuICAgIC8vIE1ha2UgdGhlIGFuY2hvciBjbGlja2FibGVcclxuICAgIGlmICh0aGlzLmNvbmZpZy5hbmNob3JTZXR0aW5ncy5lbmFibGVBbGxBbmNob3JzICYmIHRoaXMuY29uZmlnLmFuY2hvclNldHRpbmdzLmFuY2hvckNsaWNrYWJsZSkge1xyXG4gICAgICB0aGlzLnN0eWxlcy5zdGVwICs9ICcgY2xpY2thYmxlJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdGhlIHRvb2xiYXIgc3R5bGVzXHJcbiAgICB0aGlzLnN0eWxlcy50b29sYmFyVG9wID0gJ2J0bi10b29sYmFyIG5nLXdpemFyZC10b29sYmFyIG5nLXdpemFyZC10b29sYmFyLXRvcCBqdXN0aWZ5LWNvbnRlbnQtJyArIHRoaXMuY29uZmlnLnRvb2xiYXJTZXR0aW5ncy50b29sYmFyQnV0dG9uUG9zaXRpb247XHJcbiAgICB0aGlzLnN0eWxlcy50b29sYmFyQm90dG9tID0gJ2J0bi10b29sYmFyIG5nLXdpemFyZC10b29sYmFyIG5nLXdpemFyZC10b29sYmFyLWJvdHRvbSBqdXN0aWZ5LWNvbnRlbnQtJyArIHRoaXMuY29uZmlnLnRvb2xiYXJTZXR0aW5ncy50b29sYmFyQnV0dG9uUG9zaXRpb247XHJcblxyXG4gICAgLy8gU2V0IHByZXZpb3VzJm5leHQgYnV0dG9ucyBcclxuICAgIHRoaXMuc3R5bGVzLnByZXZpb3VzQnV0dG9uID0gJ2J0biBidG4tc2Vjb25kYXJ5IG5nLXdpemFyZC1idG4tcHJldic7XHJcbiAgICB0aGlzLnN0eWxlcy5uZXh0QnV0dG9uID0gJ2J0biBidG4tc2Vjb25kYXJ5IG5nLXdpemFyZC1idG4tbmV4dCc7XHJcbiAgfVxyXG5cclxuICBfc2V0VG9vbGJhcigpIHtcclxuICAgIHRoaXMuc2hvd1Rvb2xiYXJUb3AgPSB0aGlzLmNvbmZpZy50b29sYmFyU2V0dGluZ3MudG9vbGJhclBvc2l0aW9uID09IFRPT0xCQVJfUE9TSVRJT04udG9wIHx8XHJcbiAgICAgIHRoaXMuY29uZmlnLnRvb2xiYXJTZXR0aW5ncy50b29sYmFyUG9zaXRpb24gPT0gVE9PTEJBUl9QT1NJVElPTi5ib3RoO1xyXG5cclxuICAgIHRoaXMuc2hvd1Rvb2xiYXJCb3R0b20gPSB0aGlzLmNvbmZpZy50b29sYmFyU2V0dGluZ3MudG9vbGJhclBvc2l0aW9uID09IFRPT0xCQVJfUE9TSVRJT04uYm90dG9tIHx8XHJcbiAgICAgIHRoaXMuY29uZmlnLnRvb2xiYXJTZXR0aW5ncy50b29sYmFyUG9zaXRpb24gPT0gVE9PTEJBUl9QT1NJVElPTi5ib3RoO1xyXG5cclxuICAgIHRoaXMuc2hvd1ByZXZpb3VzQnV0dG9uID0gdGhpcy5jb25maWcudG9vbGJhclNldHRpbmdzLnNob3dQcmV2aW91c0J1dHRvbjtcclxuICAgIHRoaXMuc2hvd05leHRCdXR0b24gPSB0aGlzLmNvbmZpZy50b29sYmFyU2V0dGluZ3Muc2hvd05leHRCdXR0b247XHJcblxyXG4gICAgdGhpcy5zaG93RXh0cmFCdXR0b25zID0gdGhpcy5jb25maWcudG9vbGJhclNldHRpbmdzLnRvb2xiYXJFeHRyYUJ1dHRvbnMgJiYgdGhpcy5jb25maWcudG9vbGJhclNldHRpbmdzLnRvb2xiYXJFeHRyYUJ1dHRvbnMubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudHMoKSB7XHJcbiAgICAvL1RPRE86IGtleU5hdmlnYXRpb25cclxuICAgIC8vIEtleWJvYXJkIG5hdmlnYXRpb24gZXZlbnRcclxuICAgIGlmICh0aGlzLmNvbmZpZy5rZXlOYXZpZ2F0aW9uKSB7XHJcbiAgICAgIC8vICQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vICAgbWkuX2tleU5hdihlKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZ2V0U3RlcENzc0NsYXNzKHNlbGVjdGVkU3RlcDogTmdXaXphcmRTdGVwKSB7XHJcbiAgICBsZXQgc3RlcENsYXNzID0gdGhpcy5zdHlsZXMuc3RlcDtcclxuXHJcbiAgICBzd2l0Y2ggKHNlbGVjdGVkU3RlcC5zdGF0ZSkge1xyXG4gICAgICBjYXNlIFNURVBfU1RBVEUuZGlzYWJsZWQ6XHJcbiAgICAgICAgc3RlcENsYXNzICs9ICcgZGlzYWJsZWQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNURVBfU1RBVEUuZXJyb3I6XHJcbiAgICAgICAgc3RlcENsYXNzICs9ICcgZGFuZ2VyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTVEVQX1NUQVRFLmhpZGRlbjpcclxuICAgICAgICBzdGVwQ2xhc3MgKz0gJyBoaWRkZW4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoc2VsZWN0ZWRTdGVwLnN0YXR1cykge1xyXG4gICAgICBjYXNlIFNURVBfU1RBVFVTLmRvbmU6XHJcbiAgICAgICAgc3RlcENsYXNzICs9ICcgZG9uZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU1RFUF9TVEFUVVMuYWN0aXZlOlxyXG4gICAgICAgIHN0ZXBDbGFzcyArPSAnIGFjdGl2ZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0ZXBDbGFzcztcclxuICB9XHJcblxyXG4gIF9zaG93U2VsZWN0ZWRTdGVwKGV2ZW50OiBFdmVudCwgc2VsZWN0ZWRTdGVwOiBOZ1dpemFyZFN0ZXApIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hbmNob3JTZXR0aW5ncy5hbmNob3JDbGlja2FibGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jb25maWcuYW5jaG9yU2V0dGluZ3MuZW5hYmxlQW5jaG9yT25Eb25lU3RlcCAmJiBzZWxlY3RlZFN0ZXAuc3RhdHVzID09IFNURVBfU1RBVFVTLmRvbmUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGVkU3RlcC5pbmRleCAhPSB0aGlzLmN1cnJlbnRTdGVwSW5kZXgpIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmFuY2hvclNldHRpbmdzLmVuYWJsZUFsbEFuY2hvcnMgJiYgdGhpcy5jb25maWcuYW5jaG9yU2V0dGluZ3MuYW5jaG9yQ2xpY2thYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1N0ZXAoc2VsZWN0ZWRTdGVwLmluZGV4KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRTdGVwLnN0YXR1cyA9PSBTVEVQX1NUQVRVUy5kb25lKSB7XHJcbiAgICAgICAgICB0aGlzLl9zaG93U3RlcChzZWxlY3RlZFN0ZXAuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dOZXh0U3RlcChldmVudD86IEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIC8vIEZpbmQgdGhlIG5leHQgbm90IGRpc2FibGVkICYgaGlkZGVuIHN0ZXBcclxuICAgIGxldCBmaWx0ZXJlZFN0ZXBzID0gdGhpcy5zdGVwcy5maWx0ZXIoc3RlcCA9PiB7XHJcbiAgICAgIHJldHVybiBzdGVwLmluZGV4ID4gKHRoaXMuY3VycmVudFN0ZXBJbmRleCA9PSBudWxsID8gLTEgOiB0aGlzLmN1cnJlbnRTdGVwSW5kZXgpXHJcbiAgICAgICAgJiYgc3RlcC5zdGF0ZSAhPSBTVEVQX1NUQVRFLmRpc2FibGVkXHJcbiAgICAgICAgJiYgc3RlcC5zdGF0ZSAhPSBTVEVQX1NUQVRFLmhpZGRlbjtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChmaWx0ZXJlZFN0ZXBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIGlmICghdGhpcy5jb25maWcuY3ljbGVTdGVwcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fc2hvd1N0ZXAoMClcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLl9zaG93U3RlcChmaWx0ZXJlZFN0ZXBzLnNoaWZ0KCkuaW5kZXgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd1ByZXZpb3VzU3RlcChldmVudD86IEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIC8vIEZpbmQgdGhlIHByZXZpb3VzIG5vdCBkaXNhYmxlZCAmIGhpZGRlbiBzdGVwXHJcbiAgICBsZXQgZmlsdGVyZWRTdGVwcyA9IHRoaXMuc3RlcHMuZmlsdGVyKHN0ZXAgPT4ge1xyXG4gICAgICByZXR1cm4gc3RlcC5pbmRleCA8ICh0aGlzLmN1cnJlbnRTdGVwSW5kZXggPT0gbnVsbCAmJiB0aGlzLmNvbmZpZy5jeWNsZVN0ZXBzID8gdGhpcy5zdGVwcy5sZW5ndGggOiB0aGlzLmN1cnJlbnRTdGVwSW5kZXgpXHJcbiAgICAgICAgJiYgc3RlcC5zdGF0ZSAhPSBTVEVQX1NUQVRFLmRpc2FibGVkXHJcbiAgICAgICAgJiYgc3RlcC5zdGF0ZSAhPSBTVEVQX1NUQVRFLmhpZGRlbjtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChmaWx0ZXJlZFN0ZXBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIGlmICghdGhpcy5jb25maWcuY3ljbGVTdGVwcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fc2hvd1N0ZXAodGhpcy5zdGVwcy5sZW5ndGggLSAxKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuX3Nob3dTdGVwKGZpbHRlcmVkU3RlcHMucG9wKCkuaW5kZXgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd1N0ZXAoc2VsZWN0ZWRTdGVwSW5kZXg6IG51bWJlcikge1xyXG4gICAgLy8gSWYgc3RlcCBub3QgZm91bmQsIHNraXBcclxuICAgIGlmIChzZWxlY3RlZFN0ZXBJbmRleCA+PSB0aGlzLnN0ZXBzLmxlbmd0aCB8fCBzZWxlY3RlZFN0ZXBJbmRleCA8IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGN1cnJlbnQgc3RlcCBpcyByZXF1ZXN0ZWQgYWdhaW4sIHNraXBcclxuICAgIGlmIChzZWxlY3RlZFN0ZXBJbmRleCA9PSB0aGlzLmN1cnJlbnRTdGVwSW5kZXgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzZWxlY3RlZFN0ZXAgPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKVtzZWxlY3RlZFN0ZXBJbmRleF07XHJcblxyXG4gICAgLy8gSWYgaXQgaXMgYSBkaXNhYmxlZCBvciBoaWRkZW4gc3RlcCwgc2tpcFxyXG4gICAgaWYgKHNlbGVjdGVkU3RlcC5zdGF0ZSA9PSBTVEVQX1NUQVRFLmRpc2FibGVkIHx8IHNlbGVjdGVkU3RlcC5zdGF0ZSA9PSBTVEVQX1NUQVRFLmhpZGRlbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2hvd0xvYWRlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9pc1N0ZXBDaGFuZ2VWYWxpZChzZWxlY3RlZFN0ZXAsIHRoaXMuY3VycmVudFN0ZXAgJiYgdGhpcy5jdXJyZW50U3RlcC5jYW5FeGl0KS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihpc1ZhbGlkID0+IHtcclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3RlcENoYW5nZVZhbGlkKHNlbGVjdGVkU3RlcCwgc2VsZWN0ZWRTdGVwLmNhbkVudGVyKS50b1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvZihpc1ZhbGlkKS50b1Byb21pc2UoKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgIC8vIExvYWQgc3RlcCBjb250ZW50XHJcbiAgICAgICAgICB0aGlzLl9sb2FkU3RlcENvbnRlbnQoc2VsZWN0ZWRTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMuX2hpZGVMb2FkZXIoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc1N0ZXBDaGFuZ2VWYWxpZChzZWxlY3RlZFN0ZXAsIGNvbmRpdGlvbjogYm9vbGVhbiB8ICgoYXJnczogU3RlcFZhbGlkYXRpb25BcmdzKSA9PiBib29sZWFuKSB8ICgoYXJnczogU3RlcFZhbGlkYXRpb25BcmdzKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+KSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09IHR5cGVvZiB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBvZig8Ym9vbGVhbj5jb25kaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGxldCBkaXJlY3Rpb24gPSB0aGlzLl9nZXRTdGVwRGlyZWN0aW9uKHNlbGVjdGVkU3RlcC5pbmRleCk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBjb25kaXRpb24oeyBkaXJlY3Rpb246IGRpcmVjdGlvbiwgZnJvbVN0ZXA6IHRoaXMuY3VycmVudFN0ZXAsIHRvU3RlcDogc2VsZWN0ZWRTdGVwIH0pO1xyXG5cclxuICAgICAgaWYgKGlzT2JzZXJ2YWJsZTxib29sZWFuPihyZXN1bHQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0ID09PSB0eXBlb2YgdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBvZig8Ym9vbGVhbj5yZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvZihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBfbG9hZFN0ZXBDb250ZW50KHNlbGVjdGVkU3RlcDogTmdXaXphcmRTdGVwKSB7XHJcbiAgICAvLyBVcGRhdGUgY29udHJvbHNcclxuICAgIHRoaXMuX3NldEFuY2hvcihzZWxlY3RlZFN0ZXApO1xyXG4gICAgLy8gU2V0IHRoZSBidXR0b25zIGJhc2VkIG9uIHRoZSBzdGVwXHJcbiAgICB0aGlzLl9zZXRCdXR0b25zKHNlbGVjdGVkU3RlcC5pbmRleCk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBcInN0ZXBDaGFuZ2VkXCIgZXZlbnRcclxuICAgIGNvbnN0IGFyZ3MgPSA8U3RlcENoYW5nZWRBcmdzPntcclxuICAgICAgc3RlcDogc2VsZWN0ZWRTdGVwLFxyXG4gICAgICBwcmV2aW91c1N0ZXA6IHRoaXMuY3VycmVudFN0ZXAsXHJcbiAgICAgIGRpcmVjdGlvbjogdGhpcy5fZ2V0U3RlcERpcmVjdGlvbihzZWxlY3RlZFN0ZXAuaW5kZXgpLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5fZ2V0U3RlcFBvc2l0aW9uKHNlbGVjdGVkU3RlcC5pbmRleClcclxuICAgIH07XHJcbiAgICB0aGlzLnN0ZXBDaGFuZ2VkLmVtaXQoYXJncyk7XHJcbiAgICB0aGlzLm5nV2l6YXJkRGF0YVNlcnZpY2Uuc3RlcENoYW5nZWQoYXJncyk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBjdXJyZW50IGluZGV4XHJcbiAgICB0aGlzLmN1cnJlbnRTdGVwSW5kZXggPSBzZWxlY3RlZFN0ZXAuaW5kZXg7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gc2VsZWN0ZWRTdGVwO1xyXG4gIH1cclxuXHJcbiAgX3NldEFuY2hvcihzZWxlY3RlZFN0ZXA6IE5nV2l6YXJkU3RlcCkge1xyXG4gICAgLy8gQ3VycmVudCBzdGVwIGFuY2hvciA+IFJlbW92ZSBvdGhlciBjbGFzc2VzIGFuZCBhZGQgZG9uZSBjbGFzc1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHtcclxuICAgICAgdGhpcy5jdXJyZW50U3RlcC5zdGF0dXMgPSBTVEVQX1NUQVRVUy51bnRvdWNoZWQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb25maWcuYW5jaG9yU2V0dGluZ3MubWFya0RvbmVTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcC5zdGF0dXMgPSBTVEVQX1NUQVRVUy5kb25lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYW5jaG9yU2V0dGluZ3MucmVtb3ZlRG9uZVN0ZXBPbk5hdmlnYXRlQmFjaykge1xyXG4gICAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5pbmRleCA+IHNlbGVjdGVkU3RlcC5pbmRleCkge1xyXG4gICAgICAgICAgICAgIHN0ZXAuc3RhdHVzID0gU1RFUF9TVEFUVVMudW50b3VjaGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBOZXh0IHN0ZXAgYW5jaG9yID4gUmVtb3ZlIG90aGVyIGNsYXNzZXMgYW5kIGFkZCBhY3RpdmUgY2xhc3NcclxuICAgIHNlbGVjdGVkU3RlcC5zdGF0dXMgPSBTVEVQX1NUQVRVUy5hY3RpdmU7XHJcbiAgfVxyXG5cclxuICBfc2V0QnV0dG9ucyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAvLyBQcmV2aW91cy9OZXh0IEJ1dHRvbiBlbmFibGUvZGlzYWJsZSBiYXNlZCBvbiBzdGVwXHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLmN5Y2xlU3RlcHMpIHtcclxuICAgICAgaWYgKDAgPj0gaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0eWxlcy5wcmV2aW91c0J1dHRvbiA9ICdidG4gYnRuLXNlY29uZGFyeSBuZy13aXphcmQtYnRuLXByZXYgZGlzYWJsZWQnO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnByZXZpb3VzQnV0dG9uID0gJ2J0biBidG4tc2Vjb25kYXJ5IG5nLXdpemFyZC1idG4tcHJldic7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnN0ZXBzLmxlbmd0aCAtIDEgPD0gaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0eWxlcy5uZXh0QnV0dG9uID0gJ2J0biBidG4tc2Vjb25kYXJ5IG5nLXdpemFyZC1idG4tbmV4dCBkaXNhYmxlZCc7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMubmV4dEJ1dHRvbiA9ICdidG4gYnRuLXNlY29uZGFyeSBuZy13aXphcmQtYnRuLW5leHQnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZXh0cmFCdXR0b25DbGlja2VkKGJ1dHRvbjogVG9vbGJhckJ1dHRvbikge1xyXG4gICAgaWYgKGJ1dHRvbi5ldmVudCkge1xyXG4gICAgICBidXR0b24uZXZlbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEhFTFBFUiBGVU5DVElPTlNcclxuICBfa2V5TmF2KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAvLyBLZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgLy8gbGVmdFxyXG4gICAgICAgIHRoaXMuX3Nob3dQcmV2aW91c1N0ZXAoZXZlbnQpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgLy8gcmlnaHRcclxuICAgICAgICB0aGlzLl9zaG93TmV4dFN0ZXAoZXZlbnQpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuOyAvLyBleGl0IHRoaXMgaGFuZGxlciBmb3Igb3RoZXIga2V5c1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dMb2FkZXIoKSB7XHJcbiAgICB0aGlzLnN0eWxlcy5tYWluID0gJ25nLXdpemFyZC1tYWluIG5nLXdpemFyZC10aGVtZS0nICsgdGhpcy5jb25maWcudGhlbWUgKyAnIG5nLXdpemFyZC1sb2FkaW5nJztcclxuICB9XHJcblxyXG4gIF9oaWRlTG9hZGVyKCkge1xyXG4gICAgdGhpcy5zdHlsZXMubWFpbiA9ICduZy13aXphcmQtbWFpbiBuZy13aXphcmQtdGhlbWUtJyArIHRoaXMuY29uZmlnLnRoZW1lO1xyXG4gIH1cclxuXHJcbiAgX2dldFN0ZXBEaXJlY3Rpb24oc2VsZWN0ZWRTdGVwSW5kZXg6IG51bWJlcik6IFNURVBfRElSRUNUSU4ge1xyXG4gICAgcmV0dXJuICh0aGlzLmN1cnJlbnRTdGVwSW5kZXggIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRTdGVwSW5kZXggIT0gc2VsZWN0ZWRTdGVwSW5kZXgpID9cclxuICAgICAgKHRoaXMuY3VycmVudFN0ZXBJbmRleCA8IHNlbGVjdGVkU3RlcEluZGV4ID8gU1RFUF9ESVJFQ1RJTi5mb3J3YXJkIDogU1RFUF9ESVJFQ1RJTi5iYWNrd2FyZCkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgX2dldFN0ZXBQb3NpdGlvbihzZWxlY3RlZFN0ZXBJbmRleDogbnVtYmVyKTogU1RFUF9QT1NJVElPTiB7XHJcbiAgICByZXR1cm4gKHNlbGVjdGVkU3RlcEluZGV4ID09IDApID8gU1RFUF9QT1NJVElPTi5maXJzdCA6IChzZWxlY3RlZFN0ZXBJbmRleCA9PSB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEgPyBTVEVQX1BPU0lUSU9OLmZpbmFsIDogU1RFUF9QT1NJVElPTi5taWRkbGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gUFVCTElDIEZVTkNUSU9OU1xyXG4gIF9zZXRUaGVtZSh0aGVtZTogVEhFTUUpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy50aGVtZSA9PSB0aGVtZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb25maWcudGhlbWUgPSB0aGVtZTtcclxuICAgIHRoaXMuc3R5bGVzLm1haW4gPSAnbmctd2l6YXJkLW1haW4gbmctd2l6YXJkLXRoZW1lLScgKyB0aGlzLmNvbmZpZy50aGVtZTtcclxuXHJcbiAgICAvLyBUcmlnZ2VyIFwidGhlbWVDaGFuZ2VkXCIgZXZlbnRcclxuICAgIHRoaXMudGhlbWVDaGFuZ2VkLmVtaXQodGhpcy5jb25maWcudGhlbWUpO1xyXG4gIH1cclxuXHJcbiAgX3Jlc2V0KCkge1xyXG4gICAgLy8gUmVzZXQgYWxsIGVsZW1lbnRzIGFuZCBjbGFzc2VzXHJcbiAgICB0aGlzLmN1cnJlbnRTdGVwSW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IG51bGw7XHJcbiAgICB0aGlzLl9yZXN0b3JlU3RlcFN0YXRlcygpO1xyXG4gICAgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgXCJyZXNldGVkXCIgZXZlbnRcclxuICAgIHRoaXMucmVzZXRlZC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2V0V2l6YXJkV2F0Y2hlcikge1xyXG4gICAgICB0aGlzLnJlc2V0V2l6YXJkV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNob3dOZXh0U3RlcFdhdGNoZXIpIHtcclxuICAgICAgdGhpcy5zaG93TmV4dFN0ZXBXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd1ByZXZpb3VzU3RlcFdhdGNoZXIpIHtcclxuICAgICAgdGhpcy5zaG93UHJldmlvdXNTdGVwV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNob3dTdGVwV2F0Y2hlcikge1xyXG4gICAgICB0aGlzLnNob3dTdGVwV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNldFRoZW1lV2F0Y2hlcikge1xyXG4gICAgICB0aGlzLnNldFRoZW1lV2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGlkPVwibmd3aXphcmRcIiBbbmdDbGFzc109XCJzdHlsZXMubWFpblwiPlxyXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzIHN0ZXAtYW5jaG9yXCI+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBzdGVwIG9mIHN0ZXBzOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiX2dldFN0ZXBDc3NDbGFzcyhzdGVwKVwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI3N0ZXAte3sgaSB9fVwiIChjbGljayk9XCJfc2hvd1NlbGVjdGVkU3RlcCgkZXZlbnQsIHN0ZXApXCIgKm5nSWY9XCIhc3RlcC5oaWRkZW5cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtbGlua1wiPnt7IHN0ZXAudGl0bGUgfX08YnIgLz48c21hbGw+e3sgc3RlcC5kZXNjcmlwdGlvbiB9fTwvc21hbGw+PC9hPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJzaG93VG9vbGJhclRvcFwiIFtuZ0NsYXNzXT1cInN0eWxlcy50b29sYmFyVG9wXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBtci0yIG5nLXdpemFyZC1idG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dQcmV2aW91c0J1dHRvblwiIFtuZ0NsYXNzXT1cInN0eWxlcy5wcmV2aW91c0J1dHRvblwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIl9zaG93UHJldmlvdXNTdGVwKCRldmVudClcIj57eyBjb25maWchLmxhbmchLnByZXZpb3VzIH19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93TmV4dEJ1dHRvblwiIFtuZ0NsYXNzXT1cInN0eWxlcy5uZXh0QnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiX3Nob3dOZXh0U3RlcCgkZXZlbnQpXCI+e3sgY29uZmlnIS5sYW5nIS5uZXh0IH19PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93RXh0cmFCdXR0b25zXCIgY2xhc3M9XCJidG4tZ3JvdXAgbXItMiBuZy13aXphcmQtYnRuLWdyb3VwLWV4dHJhXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBjb25maWchLnRvb2xiYXJTZXR0aW5ncyEudG9vbGJhckV4dHJhQnV0dG9uczsgbGV0IGogPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJidXR0b24uY2xhc3NcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIl9leHRyYUJ1dHRvbkNsaWNrZWQoYnV0dG9uKVwiPnt7IGJ1dHRvbi50ZXh0IH19PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmctd2l6YXJkLWNvbnRhaW5lciB0YWItY29udGVudFwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJzaG93VG9vbGJhckJvdHRvbVwiIFtuZ0NsYXNzXT1cInN0eWxlcy50b29sYmFyQm90dG9tXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBtci0yIG5nLXdpemFyZC1idG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dQcmV2aW91c0J1dHRvblwiIFtuZ0NsYXNzXT1cInN0eWxlcy5wcmV2aW91c0J1dHRvblwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIl9zaG93UHJldmlvdXNTdGVwKCRldmVudClcIj57eyBjb25maWchLmxhbmchLnByZXZpb3VzIH19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93TmV4dEJ1dHRvblwiIFtuZ0NsYXNzXT1cInN0eWxlcy5uZXh0QnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiX3Nob3dOZXh0U3RlcCgkZXZlbnQpXCI+e3sgY29uZmlnIS5sYW5nIS5uZXh0IH19PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93RXh0cmFCdXR0b25zXCIgY2xhc3M9XCJidG4tZ3JvdXAgbXItMiBuZy13aXphcmQtYnRuLWdyb3VwLWV4dHJhXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBjb25maWchLnRvb2xiYXJTZXR0aW5ncyEudG9vbGJhckV4dHJhQnV0dG9uczsgbGV0IGogPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJidXR0b24uY2xhc3NcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIl9leHRyYUJ1dHRvbkNsaWNrZWQoYnV0dG9uKVwiPnt7IGJ1dHRvbi50ZXh0IH19PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+Il19