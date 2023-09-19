import { Component, forwardRef, ViewChild } from '@angular/core';
import { STEP_STATE } from '../../utils/enums';
import { NgWizardStep } from '../../utils/interfaces';
import { NgWizardStepContentDirective } from '../ng-wizard-step-content.directive';
import * as i0 from "@angular/core";
import * as i1 from "../ng-wizard-step-content.directive";
export class NgWizardStepComponent extends NgWizardStep {
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
        ], viewQueries: [{ propertyName: "stepContent", first: true, predicate: NgWizardStepContentDirective, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"tab-pane step-content\" style=\"display: block\">\r\n    <ng-content></ng-content>\r\n    <ng-template ngWizardStepContent></ng-template>\r\n</div>", styles: [""], dependencies: [{ kind: "directive", type: i1.NgWizardStepContentDirective, selector: "[ngWizardStepContent]" }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctd2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25nLXdpemFyZC9saWIvY29yZS93aXphcmQtc3RlcC9uZy13aXphcmQtc3RlcC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvbmctd2l6YXJkL2xpYi9jb3JlL3dpemFyZC1zdGVwL25nLXdpemFyZC1zdGVwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBVW5GLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZO0lBSTNDO0lBSGlELFdBQVcsQ0FBK0I7SUFFckcsWUFDVSx3QkFBa0Q7UUFFMUQsS0FBSyxFQUFFLENBQUM7UUFGQSw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBRzVELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdGLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO3VHQTFCVSxxQkFBcUI7MkZBQXJCLHFCQUFxQix5Q0FKckI7WUFDVCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1NBQ2hGLHVFQUdVLDRCQUE0QixxRkNkekMsa0tBR007OzJGRFVPLHFCQUFxQjtrQkFSakMsU0FBUzsrQkFDRSxnQkFBZ0IsYUFHZjt3QkFDVCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsRUFBRTtxQkFDaEY7K0dBRzBELFdBQVc7c0JBQXJFLFNBQVM7dUJBQUMsNEJBQTRCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGZvcndhcmRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNURVBfU1RBVEUgfSBmcm9tICcuLi8uLi91dGlscy9lbnVtcyc7XHJcbmltcG9ydCB7IE5nV2l6YXJkU3RlcCB9IGZyb20gJy4uLy4uL3V0aWxzL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBOZ1dpemFyZFN0ZXBDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi4vbmctd2l6YXJkLXN0ZXAtY29udGVudC5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy13aXphcmQtc3RlcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXdpemFyZC1zdGVwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy13aXphcmQtc3RlcC5jb21wb25lbnQuY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IE5nV2l6YXJkU3RlcCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdXaXphcmRTdGVwQ29tcG9uZW50KSB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdXaXphcmRTdGVwQ29tcG9uZW50IGV4dGVuZHMgTmdXaXphcmRTdGVwIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKE5nV2l6YXJkU3RlcENvbnRlbnREaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIHN0ZXBDb250ZW50OiBOZ1dpemFyZFN0ZXBDb250ZW50RGlyZWN0aXZlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmxvYWRDb21wb25lbnQoKTtcclxuICB9XHJcblxyXG4gIGxvYWRDb21wb25lbnQoKSB7XHJcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50KTtcclxuXHJcbiAgICB0aGlzLnN0ZXBDb250ZW50LnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5zdGVwQ29udGVudC52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICB9XHJcblxyXG4gIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlID09IFNURVBfU1RBVEUuaGlkZGVuO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwidGFiLXBhbmUgc3RlcC1jb250ZW50XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPG5nLXRlbXBsYXRlIG5nV2l6YXJkU3RlcENvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cclxuPC9kaXY+Il19