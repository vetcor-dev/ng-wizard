import { STEP_STATUS } from './enums';
import { Input, HostBinding, Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class NgWizardStep {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9uZy13aXphcmQvbGliL3V0aWxzL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1RixXQUFXLEVBQWdDLE1BQU0sU0FBUyxDQUFDO0FBQ3pKLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBc0IsTUFBTSxlQUFlLENBQUM7O0FBMENsRixNQUFNLE9BQWdCLFlBQVk7SUFDOUIsS0FBSyxDQUFTO0lBR2QsS0FBSyxDQUFTO0lBR2QsV0FBVyxDQUFTO0lBR3BCLEtBQUssQ0FBYztJQUNuQixZQUFZLENBQWM7SUFHMUIsU0FBUyxDQUFZO0lBQ3JCLFlBQVksQ0FBb0I7SUFHaEMsUUFBUSxDQUEwRztJQUdsSCxPQUFPLENBQTBHO0lBRWpILE1BQU0sQ0FBZTtJQUNyQixhQUFhLENBQWU7SUFFNUIsSUFDVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDN0MsQ0FBQzt1R0E3QmlCLFlBQVk7MkZBQVosWUFBWTs7MkZBQVosWUFBWTtrQkFEakMsU0FBUzs4QkFLTixLQUFLO3NCQURKLEtBQUs7Z0JBSU4sV0FBVztzQkFEVixLQUFLO2dCQUlOLEtBQUs7c0JBREosS0FBSztnQkFLTixTQUFTO3NCQURSLEtBQUs7Z0JBS04sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFPSyxNQUFNO3NCQURoQixXQUFXO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUT09MQkFSX1BPU0lUSU9OLCBUT09MQkFSX0JVVFRPTl9QT1NJVElPTiwvKiBUUkFOU0lUSU9OX0VGRkVDVCwqLyBUSEVNRSwgU1RFUF9TVEFURSwgU1RFUF9TVEFUVVMsIFNURVBfRElSRUNUSU4sIFNURVBfUE9TSVRJT04gfSBmcm9tICcuL2VudW1zJztcclxuaW1wb3J0IHsgSW5wdXQsIEhvc3RCaW5kaW5nLCBEaXJlY3RpdmUsIFR5cGUsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExhbmd1YWdlIHtcclxuICAgIG5leHQ/OiBzdHJpbmc7XHJcbiAgICBwcmV2aW91cz86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyU2V0dGluZ3Mge1xyXG4gICAgdG9vbGJhclBvc2l0aW9uPzogVE9PTEJBUl9QT1NJVElPTjsgLy8gbm9uZSwgdG9wLCBib3R0b20sIGJvdGhcclxuICAgIHRvb2xiYXJCdXR0b25Qb3NpdGlvbj86IFRPT0xCQVJfQlVUVE9OX1BPU0lUSU9OOyAvLyBzdGFydCwgZW5kXHJcbiAgICBzaG93TmV4dEJ1dHRvbj86IGJvb2xlYW47IC8vIHNob3cvaGlkZSBhIE5leHQgYnV0dG9uXHJcbiAgICBzaG93UHJldmlvdXNCdXR0b24/OiBib29sZWFuOyAvLyBzaG93L2hpZGUgYSBQcmV2aW91cyBidXR0b25cclxuICAgIHRvb2xiYXJFeHRyYUJ1dHRvbnM/OiBUb29sYmFyQnV0dG9uW107IC8vIEV4dHJhIGJ1dHRvbnMgdG8gc2hvdyBvbiB0b29sYmFyLCBhcnJheSBvZiBpbnB1dC9idXR0b25zIGVsZW1lbnRzXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhckJ1dHRvbiB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBjbGFzczogc3RyaW5nO1xyXG4gICAgZXZlbnQ/OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFuY2hvclNldHRpbmdzIHtcclxuICAgIGFuY2hvckNsaWNrYWJsZT86IGJvb2xlYW47IC8vIEVuYWJsZS9EaXNhYmxlIGFuY2hvciBuYXZpZ2F0aW9uXHJcbiAgICBlbmFibGVBbGxBbmNob3JzPzogYm9vbGVhbjsgLy8gQWN0aXZhdGVzIGFsbCBhbmNob3JzIGNsaWNrYWJsZSBhbGwgdGltZXNcclxuICAgIG1hcmtEb25lU3RlcD86IGJvb2xlYW47IC8vIEFkZCBkb25lIGNzc1xyXG4gICAgbWFya0FsbFByZXZpb3VzU3RlcHNBc0RvbmU/OiBib29sZWFuOyAvLyBXaGVuIGEgc3RlcCBzZWxlY3RlZCwgYWxsIHByZXZpb3VzIHN0ZXBzIGFyZSBtYXJrZWQgZG9uZVxyXG4gICAgcmVtb3ZlRG9uZVN0ZXBPbk5hdmlnYXRlQmFjaz86IGJvb2xlYW47IC8vIFdoaWxlIG5hdmlnYXRlIGJhY2sgZG9uZSBzdGVwIGFmdGVyIGFjdGl2ZSBzdGVwIHdpbGwgYmUgY2xlYXJlZFxyXG4gICAgZW5hYmxlQW5jaG9yT25Eb25lU3RlcD86IGJvb2xlYW47IC8vIEVuYWJsZS9EaXNhYmxlIHRoZSBkb25lIHN0ZXBzIG5hdmlnYXRpb25cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ1dpemFyZENvbmZpZyB7XHJcbiAgICBzZWxlY3RlZD86IG51bWJlcjsgLy8gSW5pdGlhbCBzZWxlY3RlZCBzdGVwLCAwID0gZmlyc3Qgc3RlcFxyXG4gICAga2V5TmF2aWdhdGlvbj86IGJvb2xlYW47IC8vIEVuYWJsZS9EaXNhYmxlIGtleWJvYXJkIG5hdmlnYXRpb24obGVmdCBhbmQgcmlnaHQga2V5cyBhcmUgdXNlZCBpZiBlbmFibGVkKVxyXG4gICAgY3ljbGVTdGVwcz86IGJvb2xlYW47IC8vIEFsbG93cyB0byBjeWNsZSB0aGUgbmF2aWdhdGlvbiBvZiBzdGVwc1xyXG4gICAgbGFuZz86IExhbmd1YWdlOyAvLyBMYW5ndWFnZSB2YXJpYWJsZXMgZm9yIGJ1dHRvblxyXG4gICAgdG9vbGJhclNldHRpbmdzPzogVG9vbGJhclNldHRpbmdzO1xyXG4gICAgYW5jaG9yU2V0dGluZ3M/OiBBbmNob3JTZXR0aW5ncztcclxuICAgIHRoZW1lPzogVEhFTUU7IC8vIHRoZW1lIGZvciB0aGUgd2l6YXJkLCByZWxhdGVkIGNzcyBuZWVkIHRvIGluY2x1ZGUgZm9yIG90aGVyIHRoYW4gZGVmYXVsdCB0aGVtZVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nV2l6YXJkU3RlcCB7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzdGF0ZT86IFNURVBfU1RBVEU7XHJcbiAgICBpbml0aWFsU3RhdGU/OiBTVEVQX1NUQVRFO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBjb21wb25lbnQ6IFR5cGU8YW55PjtcclxuICAgIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGNhbkVudGVyOiBib29sZWFuIHwgKChhcmdzOiBTdGVwVmFsaWRhdGlvbkFyZ3MpID0+IGJvb2xlYW4pIHwgKChhcmdzOiBTdGVwVmFsaWRhdGlvbkFyZ3MpID0+IE9ic2VydmFibGU8Ym9vbGVhbj4pO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBjYW5FeGl0OiBib29sZWFuIHwgKChhcmdzOiBTdGVwVmFsaWRhdGlvbkFyZ3MpID0+IGJvb2xlYW4pIHwgKChhcmdzOiBTdGVwVmFsaWRhdGlvbkFyZ3MpID0+IE9ic2VydmFibGU8Ym9vbGVhbj4pO1xyXG5cclxuICAgIHN0YXR1cz86IFNURVBfU1RBVFVTO1xyXG4gICAgaW5pdGlhbFN0YXR1cz86IFNURVBfU1RBVFVTO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnaGlkZGVuJylcclxuICAgIHB1YmxpYyBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cyAhPSBTVEVQX1NUQVRVUy5hY3RpdmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RlcFZhbGlkYXRpb25BcmdzIHtcclxuICAgIGRpcmVjdGlvbjogU1RFUF9ESVJFQ1RJTjtcclxuICAgIGZyb21TdGVwOiBOZ1dpemFyZFN0ZXA7XHJcbiAgICB0b1N0ZXA6IE5nV2l6YXJkU3RlcDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGVwQ2hhbmdlZEFyZ3Mge1xyXG4gICAgc3RlcDogTmdXaXphcmRTdGVwO1xyXG4gICAgcHJldmlvdXNTdGVwOiBOZ1dpemFyZFN0ZXA7XHJcbiAgICBkaXJlY3Rpb246IFNURVBfRElSRUNUSU47XHJcbiAgICBwb3NpdGlvbjogU1RFUF9QT1NJVElPTjtcclxufVxyXG4iXX0=