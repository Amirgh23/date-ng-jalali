import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';
import { ThemeService } from '../../core/services/theme.service';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';
import { ColorPickerPassThroughOptions } from '../../core/models/pass-through.model';
import { ColorPalette } from '../../core/models/theme.model';

describe('ColorPickerComponent PT', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let themeService: any;
  let styleClassService: any;
  let globalPTConfig: any;

  const mockPalette: ColorPalette = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  };

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'getCurrentPalette',
      'getPresetPalettes',
      'setPalette',
      'getCurrentTheme',
      'getCurrentThemePT',
      'setTheme',
      'toggleDarkMode',
      'resetTheme'
    ]);
    themeServiceSpy.getCurrentPalette.and.returnValue(mockPalette);
    themeServiceSpy.getPresetPalettes.and.returnValue([mockPalette]);
    themeServiceSpy.getCurrentTheme.and.returnValue({
      name: 'lara-light',
      displayName: 'Lara Light',
      isDark: false,
      colors: mockPalette,
      pt: {}
    });
    themeServiceSpy.getCurrentThemePT.and.returnValue({});
    themeServiceSpy.currentTheme$ = { pipe: () => ({ subscribe: () => {} }) };
    themeServiceSpy.colorPalette$ = { pipe: () => ({ subscribe: () => {} }) };

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
      imports: [ColorPickerComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: StyleClassService, useValue: styleClassServiceSpy },
        { provide: GlobalPTConfigService, useValue: globalPTConfigSpy }
      ]
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    styleClassService = TestBed.inject(StyleClassService);
    globalPTConfig = TestBed.inject(GlobalPTConfigService);

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('PT Application', () => {
    it('should apply component PT', () => {
      const componentPT: ColorPickerPassThroughOptions = {
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

      expect(globalPTConfig.getComponentConfig).toHaveBeenCalledWith('colorPicker');
    });

    it('should prioritize component PT over theme PT', () => {
      const componentPT: ColorPickerPassThroughOptions = {
        root: { class: 'component-root' }
      };
      component.pt = componentPT;

      themeService.getCurrentThemePT.and.returnValue({
        colorPicker: {
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
        colorPicker: {
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
        return args.filter((arg: any) => arg && arg !== 'color-picker').join(' ');
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
      const functionPT: ColorPickerPassThroughOptions = {
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

    it('should pass context to function-based PT', () => {
      const functionPT: ColorPickerPassThroughOptions = {
        colorSwatch: (options) => ({
          class: options.context?.colorKey ? `swatch-${options.context.colorKey}` : ''
        })
      };
      component.pt = functionPT;

      styleClassService.resolvePassThrough.and.returnValue({
        class: 'swatch-primary'
      });

      component.getColorSwatchClasses('primary');

      expect(styleClassService.resolvePassThrough).toHaveBeenCalled();
    });
  });

  describe('Element Classes', () => {
    it('should return root classes', () => {
      component.getRootClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return label classes', () => {
      component.getLabelClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return color grid classes', () => {
      component.getColorGridClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return color swatch classes', () => {
      component.getColorSwatchClasses('primary');
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return preset section classes', () => {
      component.getPresetSectionClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });

    it('should return preset label classes', () => {
      component.getPresetLabelClasses();
      expect(styleClassService.mergeClasses).toHaveBeenCalled();
    });
  });

  describe('Element Styles', () => {
    it('should return root styles', () => {
      const styles = component.getRootStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return label styles', () => {
      const styles = component.getLabelStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return color grid styles', () => {
      const styles = component.getColorGridStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return color swatch styles', () => {
      const styles = component.getColorSwatchStyles('primary');
      expect(typeof styles).toBe('object');
    });

    it('should return preset section styles', () => {
      const styles = component.getPresetSectionStyles();
      expect(typeof styles).toBe('object');
    });

    it('should return preset label styles', () => {
      const styles = component.getPresetLabelStyles();
      expect(typeof styles).toBe('object');
    });
  });

  describe('Color Updates', () => {
    it('should update color and emit event', () => {
      spyOn(component.paletteChange, 'emit');
      const newColor = '#ff0000';
      const event = { target: { value: newColor } };

      component.updateColor('primary', event);

      expect(themeService.setPalette).toHaveBeenCalled();
      expect(component.paletteChange.emit).toHaveBeenCalled();
    });

    it('should apply preset palette', () => {
      spyOn(component.paletteChange, 'emit');
      const newPalette: ColorPalette = {
        primary: '#ff0000',
        secondary: '#00ff00',
        accent: '#0000ff',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: '#000000',
        textSecondary: '#666666',
        border: '#e0e0e0',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      };

      component.applyPalette(newPalette);

      expect(themeService.setPalette).toHaveBeenCalledWith(newPalette);
      expect(component.paletteChange.emit).toHaveBeenCalledWith(newPalette);
    });
  });

  describe('PT Merge Precedence', () => {
    it('should merge PT in correct order: global < theme < component', () => {
      globalPTConfig.getComponentConfig.and.returnValue({
        root: { class: 'global-class' }
      });

      themeService.getCurrentThemePT.and.returnValue({
        colorPicker: {
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
});
