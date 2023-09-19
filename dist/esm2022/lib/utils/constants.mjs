import { TOOLBAR_POSITION, TOOLBAR_BUTTON_POSITION /*, TRANSITION_EFFECT*/, THEME } from './enums';
export const DEFAULT_CONFIG = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25nLXdpemFyZC9saWIvdXRpbHMvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbEcsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtQjtJQUMxQyxRQUFRLEVBQUUsQ0FBQztJQUNYLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLFVBQVU7S0FDdkI7SUFDRCxlQUFlLEVBQUU7UUFDYixlQUFlLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtRQUN4QyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHO1FBQ2xELGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsbUJBQW1CLEVBQUUsRUFBRTtLQUMxQjtJQUNELGNBQWMsRUFBRTtRQUNaLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsWUFBWSxFQUFFLElBQUk7UUFDbEIsMEJBQTBCLEVBQUUsSUFBSTtRQUNoQyw0QkFBNEIsRUFBRSxLQUFLO1FBQ25DLHNCQUFzQixFQUFFLElBQUk7S0FDL0I7SUFDRCxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU87Q0FDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nV2l6YXJkQ29uZmlnIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgVE9PTEJBUl9QT1NJVElPTiwgVE9PTEJBUl9CVVRUT05fUE9TSVRJT04vKiwgVFJBTlNJVElPTl9FRkZFQ1QqLywgVEhFTUUgfSBmcm9tICcuL2VudW1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRzogTmdXaXphcmRDb25maWcgPSB7XHJcbiAgICBzZWxlY3RlZDogMCxcclxuICAgIGtleU5hdmlnYXRpb246IHRydWUsXHJcbiAgICBjeWNsZVN0ZXBzOiBmYWxzZSxcclxuICAgIGxhbmc6IHtcclxuICAgICAgICBuZXh0OiAnTmV4dCcsXHJcbiAgICAgICAgcHJldmlvdXM6ICdQcmV2aW91cydcclxuICAgIH0sXHJcbiAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICB0b29sYmFyUG9zaXRpb246IFRPT0xCQVJfUE9TSVRJT04uYm90dG9tLFxyXG4gICAgICAgIHRvb2xiYXJCdXR0b25Qb3NpdGlvbjogVE9PTEJBUl9CVVRUT05fUE9TSVRJT04uZW5kLFxyXG4gICAgICAgIHNob3dOZXh0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIHNob3dQcmV2aW91c0J1dHRvbjogdHJ1ZSxcclxuICAgICAgICB0b29sYmFyRXh0cmFCdXR0b25zOiBbXVxyXG4gICAgfSxcclxuICAgIGFuY2hvclNldHRpbmdzOiB7XHJcbiAgICAgICAgYW5jaG9yQ2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZUFsbEFuY2hvcnM6IGZhbHNlLFxyXG4gICAgICAgIG1hcmtEb25lU3RlcDogdHJ1ZSxcclxuICAgICAgICBtYXJrQWxsUHJldmlvdXNTdGVwc0FzRG9uZTogdHJ1ZSxcclxuICAgICAgICByZW1vdmVEb25lU3RlcE9uTmF2aWdhdGVCYWNrOiBmYWxzZSxcclxuICAgICAgICBlbmFibGVBbmNob3JPbkRvbmVTdGVwOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgdGhlbWU6IFRIRU1FLmRlZmF1bHQsXHJcbn07Il19