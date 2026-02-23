import { Component, DestroyRef, EventEmitter, Output, Input, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../core/services/theme.service';
import { LocaleService } from '../../core/services/locale.service';
import { ColorPalette } from '../../core/models/theme.model';
import { ColorPickerPassThroughOptions, PassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';
import { GlobalPTConfigService } from '../../core/services/global-pt-config.service';

@Component({
  selector: 'jalali-color-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="getRootClasses()" [ngStyle]="getRootStyles()" role="region" [attr.aria-label]="localeService.translate('color_palette')">
      <div [class]="getLabelClasses()" [ngStyle]="getLabelStyles()">
        <h4 id="color-picker-title">{{ localeService.translate('color_palette') }}</h4>
      </div>
      
      <div [class]="getColorGridClasses()" [ngStyle]="getColorGridStyles()" role="group" aria-labelledby="color-picker-title">
        <div [class]="getColorSwatchClasses('primary')" [ngStyle]="getColorSwatchStyles('primary')">
          <label for="primary-color">{{ localeService.translate('primary_color') }}</label>
          <input 
            id="primary-color"
            type="color" 
            [value]="currentPalette.primary"
            (input)="updateColor('primary', $event)"
            [attr.aria-label]="localeService.translate('primary_color')"
            [class]="getCustomInputClasses()"
            [ngStyle]="getCustomInputStyles()"
            (keydown.enter)="updateColor('primary', $event)"
            (keydown.space)="updateColor('primary', $event)">
        </div>
        
        <div [class]="getColorSwatchClasses('secondary')" [ngStyle]="getColorSwatchStyles('secondary')">
          <label for="secondary-color">{{ localeService.translate('secondary_color') }}</label>
          <input 
            id="secondary-color"
            type="color" 
            [value]="currentPalette.secondary"
            (input)="updateColor('secondary', $event)"
            [attr.aria-label]="localeService.translate('secondary_color')"
            [class]="getCustomInputClasses()"
            [ngStyle]="getCustomInputStyles()"
            (keydown.enter)="updateColor('secondary', $event)"
            (keydown.space)="updateColor('secondary', $event)">
        </div>
        
        <div [class]="getColorSwatchClasses('accent')" [ngStyle]="getColorSwatchStyles('accent')">
          <label for="accent-color">{{ localeService.translate('accent_color') }}</label>
          <input 
            id="accent-color"
            type="color" 
            [value]="currentPalette.accent"
            (input)="updateColor('accent', $event)"
            [attr.aria-label]="localeService.translate('accent_color')"
            [class]="getCustomInputClasses()"
            [ngStyle]="getCustomInputStyles()"
            (keydown.enter)="updateColor('accent', $event)"
            (keydown.space)="updateColor('accent', $event)">
        </div>
      </div>
      
      <div [class]="getPresetSectionClasses()" [ngStyle]="getPresetSectionStyles()">
        <h5 id="preset-palettes-title" [class]="getPresetLabelClasses()" [ngStyle]="getPresetLabelStyles()">{{ localeService.translate('preset_palettes') }}</h5>
        <div class="palette-grid" role="group" aria-labelledby="preset-palettes-title">
          @for (palette of presetPalettes; track $index; let idx = $index) {
            <button 
              class="palette-btn"
              [attr.aria-label]="localeService.translate('preset_palette') + ' ' + (idx + 1)"
              (click)="applyPalette(palette)"
              (keydown.enter)="applyPalette(palette)"
              (keydown.space)="applyPalette(palette)"
              tabindex="0">
              @for (color of [palette.primary, palette.secondary, palette.accent]; track color) {
                <span 
                  class="palette-preview"
                  [style.background]="color"
                  aria-hidden="true">
                </span>
              }
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .color-picker {
      background: var(--background, #ffffff);
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      color: var(--text-color, #1f2937);
    }
    
    .color-picker-header {
      margin-bottom: 12px;
    }
    
    .color-picker-header h4 {
      margin: 0;
      color: var(--text-color, #1f2937);
      font-size: 14px;
      font-weight: 600;
    }
    
    .color-items {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex: 1;
    }
    
    .color-item label {
      font-size: 12px;
      color: var(--text-color, #1f2937);
      font-weight: 500;
    }
    
    .color-item input[type="color"] {
      width: 100%;
      height: 35px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: none;
    }
    
    .preset-palettes {
      border-top: 1px solid var(--border-color, #e5e7eb);
      padding-top: 12px;
    }
    
    .preset-palettes h5 {
      margin: 0 0 8px 0;
      color: var(--text-color, #1f2937);
      font-size: 12px;
      font-weight: 600;
    }
    
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    
    .palette-btn {
      display: flex;
      gap: 2px;
      padding: 3px;
      border: 2px solid transparent;
      background: var(--background, #ffffff);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        border-color: var(--primary-color, #3b82f6);
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
    
    .palette-preview {
      flex: 1;
      height: 16px;
      border-radius: 2px;
    }
  `]
})
export class ColorPickerComponent {
  @Input() pt?: ColorPickerPassThroughOptions;
  @Input() unstyled = false;
  @Output() paletteChange = new EventEmitter<ColorPalette>();

  currentPalette: ColorPalette;
  presetPalettes: ColorPalette[];

  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly styleClassService = inject(StyleClassService);
  private readonly globalPTConfig = inject(GlobalPTConfigService);
  readonly localeService = inject(LocaleService);

  constructor() {
    this.currentPalette = this.themeService.getCurrentPalette();
    this.presetPalettes = this.themeService.getPresetPalettes(this.themeService.getCurrentTheme().isDark);

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.presetPalettes = this.themeService.getPresetPalettes(theme.isDark);
        this.cdr.markForCheck();
      });

    this.themeService.colorPalette$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(palette => {
        this.currentPalette = palette;
        this.cdr.markForCheck();
      });
  }

  updateColor(key: keyof ColorPalette, event: any) {
    const newPalette: ColorPalette = {
      ...this.currentPalette,
      [key]: event.target.value
    };
    this.themeService.setPalette(newPalette);
    this.paletteChange.emit(newPalette);
    this.cdr.markForCheck();
  }

  applyPalette(palette: ColorPalette) {
    this.themeService.setPalette(palette);
    this.paletteChange.emit(palette);
    this.cdr.markForCheck();
  }

  // Pass-Through helper methods
  private getPTOptions(): ColorPickerPassThroughOptions {
    const globalPT = this.globalPTConfig.getComponentConfig('colorPicker');
    const themePT = (this.themeService as any).themePT?.value?.colorPicker || {};
    
    // Merge: global < theme < component (component has highest priority)
    return {
      ...globalPT,
      ...themePT,
      ...this.pt
    };
  }

  private getPTContext(additionalContext?: any): PassThroughMethodOptions {
    return {
      instance: this,
      props: {
        unstyled: this.unstyled
      },
      state: {
        currentPalette: this.currentPalette
      },
      context: additionalContext || {}
    };
  }

  getRootClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
    return this.styleClassService.mergeClasses('color-picker', resolved?.class);
  }

  getRootStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.root, this.getPTContext());
    return resolved?.style || {};
  }

  getLabelClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
    return this.styleClassService.mergeClasses('color-picker-header', resolved?.class);
  }

  getLabelStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.label, this.getPTContext());
    return resolved?.style || {};
  }

  getColorGridClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.colorGrid, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.colorGrid, this.getPTContext());
    return this.styleClassService.mergeClasses('color-items', resolved?.class);
  }

  getColorGridStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.colorGrid, this.getPTContext());
    return resolved?.style || {};
  }

  getColorSwatchClasses(colorKey: string): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(
        ptOptions.colorSwatch, 
        this.getPTContext({ colorKey })
      );
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(
      ptOptions.colorSwatch, 
      this.getPTContext({ colorKey })
    );
    return this.styleClassService.mergeClasses('color-item', resolved?.class);
  }

  getColorSwatchStyles(colorKey: string): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(
      ptOptions.colorSwatch, 
      this.getPTContext({ colorKey })
    );
    return resolved?.style || {};
  }

  getSelectedIndicatorClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.selectedIndicator, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.selectedIndicator, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getSelectedIndicatorStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.selectedIndicator, this.getPTContext());
    return resolved?.style || {};
  }

  getCustomInputClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.customInput, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.customInput, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getCustomInputStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.customInput, this.getPTContext());
    return resolved?.style || {};
  }

  getPresetSectionClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetSection, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetSection, this.getPTContext());
    return this.styleClassService.mergeClasses('preset-palettes', resolved?.class);
  }

  getPresetSectionStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetSection, this.getPTContext());
    return resolved?.style || {};
  }

  getPresetLabelClasses(): string {
    if (this.unstyled) {
      const ptOptions = this.getPTOptions();
      const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetLabel, this.getPTContext());
      return this.styleClassService.mergeClasses(resolved?.class);
    }
    
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetLabel, this.getPTContext());
    return this.styleClassService.mergeClasses(resolved?.class);
  }

  getPresetLabelStyles(): any {
    const ptOptions = this.getPTOptions();
    const resolved = this.styleClassService.resolvePassThrough(ptOptions.presetLabel, this.getPTContext());
    return resolved?.style || {};
  }
}
