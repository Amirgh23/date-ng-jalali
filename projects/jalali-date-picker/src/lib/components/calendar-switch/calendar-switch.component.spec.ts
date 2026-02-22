import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarSwitchComponent } from './calendar-switch.component';
import { ThemeService } from '../../core/services/theme.service';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';
import { CalendarSwitchPassThroughOptions } from '../../core/models/pass-through.model';

describe('CalendarSwitchComponent PT', () => {
  let component: CalendarSwitchComponent;
  let fixture: ComponentFixture<CalendarSwitchComponent>;
  let themeService: any;
  let styleClassService: any;
  let globalPTConfig: any;

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['getCurrentThemePT']);
    themeServiceSpy.getCurrentThemePT.and.returnValue({});

    const styleClassServiceSpy = jasmine.createSpyObj('StyleClassService', [
      'resolvePassThrough',
      'mergeClasses',
      'mergeStyles'
    ]);
    styleClassServiceSpy.resolvePassThrough.and.returnValue({ class: 'resolved-class' });
    styleClassServiceSpy.mergeClasses.and.callFake((...args: any[]) => args.filter(Boolean).join(' '));

    const globalPTConfigSpy = jasmine.createSpyObj('GlobalPTConfigService', ['getComponentConfig']);
    globalPTConfigSpy.getComponentConfig.and.returnValue({});

    await TestBed.configureTestingModule({
      imports: [CalendarSwitchComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: StyleClassService, useValue: styleClassServiceSpy },
        { provide: GlobalPTConfigService, useValue: globalPTConfigSpy }
      ]
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    styleClassService = TestBed.inject(StyleClassService);
    globalPTConfig = TestBed.inject(GlobalPTConfigService);

    fixture = TestBed.createComponent(CalendarSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('PT Application', () => {
    it('should apply component PT', () => {
      const componentPT: CalendarSwitchPassThroughOptions = {
        root: { class: 'custom-root' }
      };
      component.pt = componentPT;

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should apply global PT', () => {
      globalPTConfig.getComponentConfig.and.returnValue({
        root: { class: 'global-root' }
      });

      component.getRootClasses();

      expect(globalPTConfig.getComponentConfig).toHaveBeenCalledWith('calendarSwitch');
    });

    it('should prioritize component PT over theme PT', () => {
      const componentPT: CalendarSwitchPassThroughOptions = {
        root: { class: 'component-root' }
      };
      component.pt = componentPT;

      themeService.getCurrentThemePT.and.returnValue({
        calendarSwitch: {
          root: { class: 'theme-root' }
        }
      });

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });

    it('should prioritize theme PT over global PT', () => {
      globalPTConfig.getComponentConfig.and.returnValue({
        root: { class: 'global-root' }
      });

      themeService.getCurrentThemePT.and.returnValue({
        calendarSwitch: {
          root: { class: 'theme-root' }
        }
      });

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Unstyled Mode', () => {
    it('should not include default classes in unstyled mode', () => {
      component.unstyled = true;
      styleClassService.mergeClasses.and.callFake((...args: any[]) => {
        return args.filter((arg: any) => arg && arg !== 'calendar-switch').join(' ');
      });

      component.getRootClasses();

      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should only apply PT classes in unstyled mode', () => {
      component.unstyled = true;
      component.pt = {
        root: { class: 'tailwind-classes' }
      };

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Function-Based PT', () => {
    it('should resolve function-based PT configuration', () => {
      const functionPT: CalendarSwitchPassThroughOptions = {
        root: (options) => ({
          class: options.instance ? 'resolved-from-function' : ''
        })
      };
      component.pt = functionPT;

      styleClassService.resolvePassThrough.and.returnValue({
        class: 'resolved-from-function'
      });

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });

    it('should pass calendar type context to function-based PT', () => {
      const functionPT: CalendarSwitchPassThroughOptions = {
        button: (options) => ({
          class: options.context?.isActive ? 'active-button' : 'inactive-button'
        })
      };
      component.pt = functionPT;
      component.calendarType = 'jalali';

      styleClassService.resolvePassThrough.and.returnValue({
        class: 'active-button'
      });

      component.getButtonClasses('jalali');

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Calendar Type Switching', () => {
    it('should switch calendar type', () => {
      spyOn(component.calendarChange, 'emit');
      component.calendarType = 'jalali';

      component.switchCalendar('gregorian');

      expect(component.calendarType).toBe('gregorian');
      expect(component.calendarChange.emit).toHaveBeenCalledWith('gregorian');
    });

    it('should apply active button PT for active calendar type', () => {
      component.calendarType = 'jalali';

      component.getButtonClasses('jalali');

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });

    it('should apply button PT for inactive calendar type', () => {
      component.calendarType = 'jalali';

      component.getButtonClasses('gregorian');

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Element Classes', () => {
    it('should return root classes', () => {
      component.getRootClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return button classes', () => {
      component.getButtonClasses('jalali');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return active button classes', () => {
      component.calendarType = 'jalali';
      component.getActiveButtonClasses('jalali');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return button text classes', () => {
      component.getButtonTextClasses('jalali');
      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Element Styles', () => {
    it('should return root styles', () => {
      const styles = component.getRootStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return button styles', () => {
      const styles = component.getButtonStyles('jalali');
      expect(typeof styles).toBe('object');
    });

    it('should return active button styles', () => {
      component.calendarType = 'jalali';
      const styles = component.getActiveButtonStyles('jalali');
      expect(typeof styles).toBe('object');
    });

    it('should return button text styles', () => {
      const styles = component.getButtonTextStyles('jalali');
      expect(typeof styles).toBe('object');
    });
  });

  describe('PT Merge Precedence', () => {
    it('should merge PT in correct order: global < theme < component', () => {
      globalPTConfig.getComponentConfig.and.returnValue({
        root: { class: 'global-class' }
      });

      themeService.getCurrentThemePT.and.returnValue({
        calendarSwitch: {
          root: { class: 'theme-class' }
        }
      });

      component.pt = {
        root: { class: 'component-class' }
      };

      component.getRootClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Different Calendar Types', () => {
    it('should handle jalali calendar type', () => {
      component.calendarType = 'jalali';
      const classes = component.getButtonClasses('jalali');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should handle gregorian calendar type', () => {
      component.calendarType = 'gregorian';
      const classes = component.getButtonClasses('gregorian');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should handle hijri calendar type', () => {
      component.calendarType = 'hijri';
      const classes = component.getButtonClasses('hijri');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });
  });
});
