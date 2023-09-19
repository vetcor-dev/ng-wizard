import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_WIZARD_CONFIG_TOKEN } from './ng-wizard-config.token';
import { NgWizardStepComponent } from './wizard-step/ng-wizard-step.component';
import { NgWizardComponent } from './wizard/ng-wizard.component';
import { NgWizardStepContentDirective } from './ng-wizard-step-content.directive';
import * as i0 from "@angular/core";
export class NgWizardModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctd2l6YXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZy13aXphcmQvbGliL2NvcmUvbmctd2l6YXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBT2xGLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBOEI7UUFDM0MsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsY0FBYztpQkFDekI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO3VHQWZVLGNBQWM7d0dBQWQsY0FBYyxpQkFIVixpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSw0QkFBNEIsYUFEM0UsWUFBWSxhQUVaLGlCQUFpQixFQUFFLHFCQUFxQjt3R0FFdkMsY0FBYyxZQUpmLFlBQVk7OzJGQUlYLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSw0QkFBNEIsQ0FBQztvQkFDdEYsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7aUJBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE5nV2l6YXJkQ29uZmlnIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IE5HX1dJWkFSRF9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25nLXdpemFyZC1jb25maWcudG9rZW4nO1xyXG5pbXBvcnQgeyBOZ1dpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL3dpemFyZC1zdGVwL25nLXdpemFyZC1zdGVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nV2l6YXJkQ29tcG9uZW50IH0gZnJvbSAnLi93aXphcmQvbmctd2l6YXJkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nV2l6YXJkU3RlcENvbnRlbnREaXJlY3RpdmUgfSBmcm9tICcuL25nLXdpemFyZC1zdGVwLWNvbnRlbnQuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmdXaXphcmRDb21wb25lbnQsIE5nV2l6YXJkU3RlcENvbXBvbmVudCwgTmdXaXphcmRTdGVwQ29udGVudERpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW05nV2l6YXJkQ29tcG9uZW50LCBOZ1dpemFyZFN0ZXBDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1dpemFyZE1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogZm9yUm9vdFxyXG4gICAqIEByZXR1cm5zIEEgbW9kdWxlIHdpdGggaXRzIHByb3ZpZGVyIGRlcGVuZGVuY2llc1xyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KG5nV2l6YXJkQ29uZmlnOiBOZ1dpemFyZENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmdXaXphcmRNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ1dpemFyZE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogTkdfV0laQVJEX0NPTkZJR19UT0tFTixcclxuICAgICAgICAgIHVzZVZhbHVlOiBuZ1dpemFyZENvbmZpZ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19