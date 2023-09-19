import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ng-wizard-data.service";
export class NgWizardService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, deps: [{ token: i1.NgWizardDataService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.5", ngImport: i0, type: NgWizardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgWizardDataService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctd2l6YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbmctd2l6YXJkL2xpYi9jb3JlL25nLXdpemFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVUzQyxNQUFNLE9BQU8sZUFBZTtJQUVoQjtJQURWLFlBQ1UsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFFbEQsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO0lBQ25ELENBQUM7dUdBNUJVLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmdXaXphcmREYXRhU2VydmljZSB9IGZyb20gJy4vbmctd2l6YXJkLWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IFRIRU1FIH0gZnJvbSAnLi4vdXRpbHMvZW51bXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0ZXBDaGFuZ2VkQXJncyB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdXaXphcmRTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdXaXphcmREYXRhU2VydmljZTogTmdXaXphcmREYXRhU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLm5nV2l6YXJkRGF0YVNlcnZpY2UucmVzZXRXaXphcmQoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLm5nV2l6YXJkRGF0YVNlcnZpY2Uuc2hvd05leHRTdGVwKCk7XHJcbiAgfVxyXG5cclxuICBwcmV2aW91cygpIHtcclxuICAgIHRoaXMubmdXaXphcmREYXRhU2VydmljZS5zaG93UHJldmlvdXNTdGVwKCk7XHJcbiAgfVxyXG5cclxuICBzaG93KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMubmdXaXphcmREYXRhU2VydmljZS5zaG93U3RlcChpbmRleCk7XHJcbiAgfVxyXG5cclxuICB0aGVtZSh0aGVtZTogVEhFTUUpIHtcclxuICAgIHRoaXMubmdXaXphcmREYXRhU2VydmljZS5zZXRUaGVtZSh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICBzdGVwQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPFN0ZXBDaGFuZ2VkQXJncz4ge1xyXG4gICAgcmV0dXJuIHRoaXMubmdXaXphcmREYXRhU2VydmljZS5zdGVwQ2hhbmdlZEFyZ3MkO1xyXG4gIH1cclxufVxyXG4iXX0=