import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayInfoModalComponent } from './day-info-modal.component';
import { ThemeService } from '../../core/services/theme.service';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';
import { DayInfoModalPassThroughOptions } from '../../core/models/pass-through.model';
import { DayInfo } from '../../core/models/jalali-date.model';

describe('DayInfoModalComponent PT', () => {
  let component: DayInfoModalComponent;
  let fixture: ComponentFixture<DayInfoModalComponent>;
  let themeService: any;
  let styleClassService: any;
  let globalPTConfig: any;

  const mockDayInfo: DayInfo = {
    jalali: {
      year: 1402,
      month: 1,
      day: 1,
      dayName: 'شنبه',
      monthName: 'فروردین',
      formatted: '۱۴۰۲/۰۱/۰۱'
    },
    gregorian: {
      year: 2023,
      month: 3,
      day: 21,
      dayName: 'Tuesday',
      monthName: 'March',
      formatted: '2023/03/21'
    },
    hijri: {
      year: 1444,
      month: 9,
      day: 29,
      dayName: 'Tuesday',
      monthName: 'Rabi al-Thani',
      formatted: '1444/09/29'
    },
    isHoliday: false,
    holidayType: 'official',
    events: [],
    season: 'بهار',
    weekNumber: 1,
    notes: ''
  };

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
      imports: [DayInfoModalComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: StyleClassService, useValue: styleClassServiceSpy },
        { provide: GlobalPTConfigService, useValue: globalPTConfigSpy }
      ]
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    styleClassService = TestBed.inject(StyleClassService);
    globalPTConfig = TestBed.inject(GlobalPTConfigService);

    fixture = TestBed.createComponent(DayInfoModalComponent);
    component = fixture.componentInstance;
    component.dayInfo = mockDayInfo;
    fixture.detectChanges();
  });

  describe('PT Application', () => {
    it('should apply component PT', () => {
      const componentPT: DayInfoModalPassThroughOptions = {
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

      expect(globalPTConfig.getComponentConfig).toHaveBeenCalledWith('dayInfoModal');
    });

    it('should prioritize component PT over theme PT', () => {
      const componentPT: DayInfoModalPassThroughOptions = {
        root: { class: 'component-root' }
      };
      component.pt = componentPT;

      themeService.getCurrentThemePT.and.returnValue({
        dayInfoModal: {
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
        dayInfoModal: {
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
        return args.filter((arg: any) => arg && arg !== 'modal-overlay').join(' ');
      });

      component.getOverlayClasses();

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
      const functionPT: DayInfoModalPassThroughOptions = {
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

    it('should pass date context to function-based PT', () => {
      const functionPT: DayInfoModalPassThroughOptions = {
        modal: (options) => ({
          class: options.context?.date ? 'modal-with-date' : 'modal-no-date'
        })
      };
      component.pt = functionPT;

      styleClassService.resolvePassThrough.and.returnValue({
        class: 'modal-with-date'
      });

      component.getModalClasses();

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Modal Visibility', () => {
    it('should open modal', () => {
      component.isOpen = false;
      component.open(mockDayInfo);

      expect(component.isOpen).toBe(true);
      expect(component.dayInfo).toBe(mockDayInfo);
    });

    it('should close modal', () => {
      spyOn(component.closed, 'emit');
      component.isOpen = true;

      component.close();

      expect(component.isOpen).toBe(false);
      expect(component.closed.emit).toHaveBeenCalled();
    });

    it('should close modal on Escape key', () => {
      spyOn(component, 'close');
      component.isOpen = true;

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleKeyboardEvent(event);

      expect(component.close).toHaveBeenCalled();
    });
  });

  describe('Element Classes', () => {
    it('should return overlay classes', () => {
      component.getOverlayClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return modal classes', () => {
      component.getModalClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return header classes', () => {
      component.getHeaderClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return title classes', () => {
      component.getTitleClasses();
      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });

    it('should return close button classes', () => {
      component.getCloseButtonClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return content classes', () => {
      component.getContentClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return date info classes', () => {
      component.getDateInfoClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return holiday info classes', () => {
      component.dayInfo.isHoliday = true;
      component.getHolidayInfoClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return footer classes', () => {
      component.getFooterClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return action button classes', () => {
      component.getActionButtonClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });
  });

  describe('Element Styles', () => {
    it('should return overlay styles', () => {
      const styles = component.getOverlayStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return modal styles', () => {
      const styles = component.getModalStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return header styles', () => {
      const styles = component.getHeaderStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return title styles', () => {
      const styles = component.getTitleStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return close button styles', () => {
      const styles = component.getCloseButtonStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return content styles', () => {
      const styles = component.getContentStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return date info styles', () => {
      const styles = component.getDateInfoStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return holiday info styles', () => {
      component.dayInfo.isHoliday = true;
      const styles = component.getHolidayInfoStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return footer styles', () => {
      const styles = component.getFooterStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return action button styles', () => {
      const styles = component.getActionButtonStyles();
      expect(typeof styles).toBe('object');
    });
  });

  describe('Note Management', () => {
    it('should save note', () => {
      spyOn(component.noteSaved, 'emit');
      const noteText = 'Test note';

      component.saveNote(noteText);

      expect(component.noteSaved.emit).toHaveBeenCalledWith(noteText);
      expect(component.dayInfo.notes).toBe(noteText);
    });

    it('should delete note', () => {
      spyOn(component.noteSaved, 'emit');
      component.noteText = 'Test note';
      component.dayInfo.notes = 'Test note';

      component.deleteNote();

      expect(component.noteText).toBe('');
      expect(component.dayInfo.notes).toBe('');
      expect(component.noteSaved.emit).toHaveBeenCalledWith('');
    });

    it('should load note on open', () => {
      const dayInfoWithNote = { ...mockDayInfo, notes: 'Existing note' };
      component.open(dayInfoWithNote);

      expect(component.noteText).toBe('Existing note');
    });
  });

  describe('Holiday Information', () => {
    it('should display holiday info when day is holiday', () => {
      component.dayInfo.isHoliday = true;
      component.dayInfo.holidayType = 'official';

      const classes = component.getHolidayInfoClasses();

      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should not display holiday info when day is not holiday', () => {
      component.dayInfo.isHoliday = false;

      const classes = component.getHolidayInfoClasses();

      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });
  });

  describe('PT Merge Precedence', () => {
    it('should merge PT in correct order: global < theme < component', () => {
      globalPTConfig.getComponentConfig.and.returnValue({
        root: { class: 'global-class' }
      });

      themeService.getCurrentThemePT.and.returnValue({
        dayInfoModal: {
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

  describe('Different Date Types', () => {
    it('should display jalali date', () => {
      expect(component.dayInfo.jalali.formatted).toBe('۱۴۰۲/۰۱/۰۱');
    });

    it('should display gregorian date', () => {
      expect(component.dayInfo.gregorian.formatted).toBe('2023/03/21');
    });

    it('should display hijri date', () => {
      expect(component.dayInfo.hijri.formatted).toBe('1444/09/29');
    });
  });
});
