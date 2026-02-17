import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { ColorPalette } from '../../core/models/theme.model';

@Component({
  selector: 'jalali-color-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="color-picker">
      <div class="color-picker-header">
        <h4>پالت رنگی</h4>
      </div>
      
      <div class="color-items">
        <div class="color-item">
          <label>اصلی</label>
          <input 
            type="color" 
            [value]="currentPalette.primary"
            (input)="updateColor('primary', $event)">
        </div>
        
        <div class="color-item">
          <label>ثانویه</label>
          <input 
            type="color" 
            [value]="currentPalette.secondary"
            (input)="updateColor('secondary', $event)">
        </div>
        
        <div class="color-item">
          <label>تاکیدی</label>
          <input 
            type="color" 
            [value]="currentPalette.accent"
            (input)="updateColor('accent', $event)">
        </div>
      </div>
      
      <div class="preset-palettes">
        <h5>پالت‌های پیشفرض</h5>
        <div class="palette-grid">
          <button 
            *ngFor="let palette of presetPalettes"
            class="palette-btn"
            (click)="applyPalette(palette)">
            <span 
              *ngFor="let color of [palette.primary, palette.secondary, palette.accent]"
              class="palette-preview"
              [style.background]="color">
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .color-picker {
      background: var(--background);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .color-picker-header {
      margin-bottom: 16px;
    }
    
    .color-picker-header h4 {
      margin: 0;
      color: var(--text-color);
      font-size: 16px;
      font-weight: 600;
    }
    
    .color-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .color-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .color-item label {
      width: 60px;
      font-size: 14px;
      color: var(--text-color);
      font-weight: 500;
    }
    
    .color-item input[type="color"] {
      width: 50px;
      height: 40px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: none;
    }
    
    .preset-palettes {
      border-top: 1px solid var(--border-color);
      padding-top: 16px;
    }
    
    .preset-palettes h5 {
      margin: 0 0 12px 0;
      color: var(--text-color);
      font-size: 14px;
      font-weight: 600;
    }
    
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }
    
    .palette-btn {
      display: flex;
      gap: 2px;
      padding: 4px;
      border: 2px solid transparent;
      background: var(--background);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        border-color: var(--primary-color);
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
    
    .palette-preview {
      flex: 1;
      height: 20px;
      border-radius: 2px;
    }
  `]
})
export class ColorPickerComponent {
  @Output() paletteChange = new EventEmitter<ColorPalette>();

  currentPalette: ColorPalette;
  presetPalettes: ColorPalette[];

  constructor(private themeService: ThemeService) {
    this.currentPalette = this.themeService.getCurrentPalette();
    this.presetPalettes = this.themeService.getPresetPalettes(this.themeService.getCurrentTheme().isDark);

    this.themeService.currentTheme$.subscribe(theme => {
      this.presetPalettes = this.themeService.getPresetPalettes(theme.isDark);
    });

    this.themeService.colorPalette$.subscribe(palette => {
      this.currentPalette = palette;
    });
  }

  updateColor(key: keyof ColorPalette, event: any) {
    const newPalette: ColorPalette = {
      ...this.currentPalette,
      [key]: event.target.value
    };
    this.themeService.setPalette(newPalette);
    this.paletteChange.emit(newPalette);
  }

  applyPalette(palette: ColorPalette) {
    this.themeService.setPalette(palette);
    this.paletteChange.emit(palette);
  }
}
