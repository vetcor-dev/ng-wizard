import { Injectable, Optional, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_CONFIG } from '../utils/constants';
import { NG_WIZARD_CONFIG_TOKEN } from './ng-wizard-config.token';
import { merge } from '../utils/functions';
import * as i0 from "@angular/core";
export class NgWizardDataService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctd2l6YXJkLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZy13aXphcmQvbGliL2NvcmUvbmctd2l6YXJkLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUszQyxNQUFNLE9BQU8sbUJBQW1CO0lBZ0JrQztJQWZoRSxZQUFZLENBQWtCO0lBQzlCLGFBQWEsQ0FBa0I7SUFDL0IsaUJBQWlCLENBQWtCO0lBQ25DLFNBQVMsQ0FBcUI7SUFDOUIsU0FBUyxDQUFvQjtJQUM3QixnQkFBZ0IsQ0FBOEI7SUFFdEMsWUFBWSxDQUFlO0lBQzNCLGFBQWEsQ0FBZTtJQUM1QixpQkFBaUIsQ0FBZTtJQUNoQyxTQUFTLENBQWtCO0lBQzNCLFNBQVMsQ0FBaUI7SUFDMUIsZ0JBQWdCLENBQTJCO0lBQzNDLGNBQWMsQ0FBaUI7SUFFdkMsWUFBZ0UsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDcEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUV2RCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBcUI7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO3VHQWpFVSxtQkFBbUIsa0JBZ0JFLHNCQUFzQjsyR0FoQjNDLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFpQmMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IERFRkFVTFRfQ09ORklHIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTkdfV0laQVJEX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmctd2l6YXJkLWNvbmZpZy50b2tlbic7XHJcbmltcG9ydCB7IE5nV2l6YXJkQ29uZmlnLCBTdGVwQ2hhbmdlZEFyZ3MgfSBmcm9tICcuLi91dGlscy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tICcuLi91dGlscy9lbnVtcyc7XHJcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25zJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nV2l6YXJkRGF0YVNlcnZpY2Uge1xyXG4gIHJlc2V0V2l6YXJkJDogT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIHNob3dOZXh0U3RlcCQ6IE9ic2VydmFibGU8YW55PjtcclxuICBzaG93UHJldmlvdXNTdGVwJDogT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIHNob3dTdGVwJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gIHNldFRoZW1lJDogT2JzZXJ2YWJsZTxUSEVNRT47XHJcbiAgc3RlcENoYW5nZWRBcmdzJDogT2JzZXJ2YWJsZTxTdGVwQ2hhbmdlZEFyZ3M+O1xyXG5cclxuICBwcml2YXRlIF9yZXNldFdpemFyZDogU3ViamVjdDxhbnk+O1xyXG4gIHByaXZhdGUgX3Nob3dOZXh0U3RlcDogU3ViamVjdDxhbnk+O1xyXG4gIHByaXZhdGUgX3Nob3dQcmV2aW91c1N0ZXA6IFN1YmplY3Q8YW55PjtcclxuICBwcml2YXRlIF9zaG93U3RlcDogU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgX3NldFRoZW1lOiBTdWJqZWN0PFRIRU1FPjtcclxuICBwcml2YXRlIF9zdGVwQ2hhbmdlZEFyZ3M6IFN1YmplY3Q8U3RlcENoYW5nZWRBcmdzPjtcclxuICBwcml2YXRlIF9kZWZhdWx0Q29uZmlnOiBOZ1dpemFyZENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOR19XSVpBUkRfQ09ORklHX1RPS0VOKSBwcml2YXRlIGNvbmZpZzogTmdXaXphcmRDb25maWcpIHtcclxuICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XHJcbiAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgdGhpcy5fZGVmYXVsdENvbmZpZyA9IG1lcmdlKHRoaXMuX2RlZmF1bHRDb25maWcsIHRoaXMuY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPYnNlcnZhYmxlIHNvdXJjZXNcclxuICAgIHRoaXMuX3Jlc2V0V2l6YXJkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgdGhpcy5fc2hvd05leHRTdGVwID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgdGhpcy5fc2hvd1ByZXZpb3VzU3RlcCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHRoaXMuX3Nob3dTdGVwID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgdGhpcy5fc2V0VGhlbWUgPSBuZXcgU3ViamVjdDxUSEVNRT4oKTtcclxuICAgIHRoaXMuX3N0ZXBDaGFuZ2VkQXJncyA9IG5ldyBTdWJqZWN0PFN0ZXBDaGFuZ2VkQXJncz4oKTtcclxuXHJcbiAgICAvLyBPYnNlcnZhYmxlIHN0cmVhbXNcclxuICAgIHRoaXMucmVzZXRXaXphcmQkID0gdGhpcy5fcmVzZXRXaXphcmQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB0aGlzLnNob3dOZXh0U3RlcCQgPSB0aGlzLl9zaG93TmV4dFN0ZXAuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB0aGlzLnNob3dQcmV2aW91c1N0ZXAkID0gdGhpcy5fc2hvd1ByZXZpb3VzU3RlcC5hc09ic2VydmFibGUoKTtcclxuICAgIHRoaXMuc2hvd1N0ZXAkID0gdGhpcy5fc2hvd1N0ZXAuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB0aGlzLnNldFRoZW1lJCA9IHRoaXMuX3NldFRoZW1lLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgdGhpcy5zdGVwQ2hhbmdlZEFyZ3MkID0gdGhpcy5fc3RlcENoYW5nZWRBcmdzLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdENvbmZpZygpOiBOZ1dpemFyZENvbmZpZyB7XHJcbiAgICByZXR1cm4geyAuLi50aGlzLl9kZWZhdWx0Q29uZmlnIH07XHJcbiAgfVxyXG5cclxuICByZXNldFdpemFyZCgpIHtcclxuICAgIHRoaXMuX3Jlc2V0V2l6YXJkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHNob3dOZXh0U3RlcCgpIHtcclxuICAgIHRoaXMuX3Nob3dOZXh0U3RlcC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBzaG93UHJldmlvdXNTdGVwKCkge1xyXG4gICAgdGhpcy5fc2hvd1ByZXZpb3VzU3RlcC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBzaG93U3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9zaG93U3RlcC5uZXh0KGluZGV4KTtcclxuICB9XHJcblxyXG4gIHNldFRoZW1lKHRoZW1lOiBUSEVNRSkge1xyXG4gICAgdGhpcy5fc2V0VGhlbWUubmV4dCh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICBzdGVwQ2hhbmdlZChhcmdzOiBTdGVwQ2hhbmdlZEFyZ3MpIHtcclxuICAgIHRoaXMuX3N0ZXBDaGFuZ2VkQXJncy5uZXh0KGFyZ3MpO1xyXG4gIH1cclxufVxyXG4iXX0=