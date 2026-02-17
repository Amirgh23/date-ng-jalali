import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeConfig } from '../../core/models/theme.model';

@Component({
  selector: 'jalali-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-selector">
      <div class="theme-selector-header">
        <h3>انتخاب تم</h3>
        <button class="close-btn" (click)="close()">×</button>
      </div>
      
      <div class="theme-grid">
        <div 
          class="theme-card"
          *ngFor="let theme of themes"
          [class.active]="currentTheme.name === theme.name"
          (click)="selectTheme(theme)">
          <div class="theme-preview" [class.dark]="theme.isDark">
            <div class="preview-header" [style.background]="theme.colors.primary"></div>
            <div class="preview-content">
              <div class="preview-item" [style.background]="theme.colors.secondary"></div>
              <div class="preview-item" [style.background]="theme.colors.accent"></div>
            </div>
          </div>
          <div class="theme-info">
            <span class="theme-name">{{ theme.displayName }}</span>
            <span class="theme-type">{{ theme.isDark ? 'تم تاریک' : 'تم روشن' }}</span>
          </div>
        </div>
      </div>
      
      <div class="theme-actions">
        <button class="action-btn secondary" (click)="toggleDarkMode()">
          {{ currentTheme.isDark ? 'تم روشن' : 'تم تاریک' }}
        </button>
        <button class="action-btn" (click)="resetTheme()">
          بازنشانی پیشفرض
        </button>
      </div>
    </div>
  `,
  styles: [`
    .theme-selector {
      background: var(--background);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      max-width: 400px;
      margin: auto;
    }
    
    .theme-selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .theme-selector-header h3 {
      margin: 0;
      color: var(--text-color);
      font-size: 18px;
      font-weight: 600;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-color);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
      
      &:hover {
        background: var(--secondary-color);
        color: white;
      }
    }
    
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
      padding: 20px;
    }
    
    .theme-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid transparent;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &.active {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
    
    .theme-preview {
      aspect-ratio: 16/9;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 8px;
      position: relative;
      
      &.dark {
        background: #1a1a1a;
      }
      
      &:not(.dark) {
        background: #f5f5f5;
      }
    }
    
    .preview-header {
      height: 40%;
      border-radius: 6px 6px 0 0;
    }
    
    .preview-content {
      height: 60%;
      padding: 8px;
      display: flex;
      gap: 6px;
    }
    
    .preview-item {
      flex: 1;
      border-radius: 4px;
    }
    
    .theme-info {
      padding: 0 8px 8px;
    }
    
    .theme-name {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 2px;
    }
    
    .theme-type {
      display: block;
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .theme-actions {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid var(--border-color);
    }
    
    .action-btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      
      &:not(.secondary) {
        background: var(--primary-color);
        color: white;
      }
      
      &.secondary {
        background: var(--secondary-color);
        color: white;
      }
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class ThemeSelectorComponent implements OnInit {
  themes: ThemeConfig[];
  currentTheme: ThemeConfig;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  selectTheme(theme: ThemeConfig) {
    this.themeService.setTheme(theme);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  resetTheme() {
    this.themeService.resetTheme();
  }

  close() {
    // يمكن إضافة منطق إغلاق المكون
  }
}
