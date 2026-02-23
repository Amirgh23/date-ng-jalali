import { Component, EventEmitter, Input, OnInit, Output, DestroyRef, inject, ViewChildren, QueryList, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../core/services/theme.service';
import { LocaleService } from '../../core/services/locale.service';
import { ThemeConfig } from '../../core/models/theme.model';

@Component({
  selector: 'jalali-theme-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="theme-selector" role="region" [attr.aria-label]="localeService.translate('select_theme')">
      <div class="theme-selector-header">
        <h3 id="theme-selector-title">{{ localeService.translate('select_theme') }}</h3>
        @if (showCloseButton) {
          <button 
            class="close-btn" 
            (click)="close()" 
            [attr.aria-label]="localeService.translate('close')"
            (keydown.enter)="close()"
            (keydown.space)="close()">×</button>
        }
      </div>
      
      <div class="theme-grid" role="grid" aria-labelledby="theme-selector-title" [attr.aria-label]="localeService.translate('select_theme')">
        @for (theme of themes; track theme.name; let idx = $index) {
          <div 
            class="theme-card"
            [class.active]="currentTheme.name === theme.name"
            (click)="selectTheme(theme)"
            [attr.aria-label]="localeService.translate('select_theme') + ' ' + theme.displayName + (currentTheme.name === theme.name ? ' (' + localeService.translate('selected') + ')' : '')"
            [attr.aria-selected]="currentTheme.name === theme.name"
            role="gridcell"
            tabindex="0"
            (keydown.enter)="selectTheme(theme)"
            (keydown.space)="selectTheme(theme)"
            (keydown.arrowright)="focusNextTheme(idx)"
            (keydown.arrowleft)="focusPreviousTheme(idx)"
            [attr.id]="'theme-' + idx"
            #themeCard>
            <div class="theme-preview" [class.dark]="theme.isDark" aria-hidden="true">
              <div class="preview-header" [style.background]="theme.colors.primary"></div>
              <div class="preview-content">
                <div class="preview-item" [style.background]="theme.colors.secondary"></div>
                <div class="preview-item" [style.background]="theme.colors.accent"></div>
              </div>
            </div>
            <div class="theme-info">
              <span class="theme-name">{{ theme.displayName }}</span>
              <span class="theme-type" [attr.aria-label]="localeService.translate('theme_type')">{{ theme.isDark ? localeService.translate('dark_theme') : localeService.translate('light_theme') }}</span>
            </div>
          </div>
        }
      </div>
      
      <div class="theme-actions">
        <button 
          class="action-btn secondary" 
          (click)="toggleDarkMode()" 
          [attr.aria-pressed]="currentTheme.isDark"
          [attr.aria-label]="localeService.translate('theme')"
          (keydown.enter)="toggleDarkMode()"
          (keydown.space)="toggleDarkMode()">
          {{ currentTheme.isDark ? '☀️ ' + localeService.translate('light_theme') : '🌙 ' + localeService.translate('dark_theme') }}
        </button>
        <button 
          class="action-btn" 
          (click)="resetTheme()"
          [attr.aria-label]="localeService.translate('reset_default')"
          (keydown.enter)="resetTheme()"
          (keydown.space)="resetTheme()">
          ↻ {{ localeService.translate('reset_default') }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .theme-selector {
      background: var(--color-background, #ffffff);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      max-width: 500px;
      margin: auto;
      color: var(--color-text, #1f2937);
    }
    
    .theme-selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      background: var(--color-surface, #f9fafb);
    }
    
    .theme-selector-header h3 {
      margin: 0;
      color: var(--color-text, #1f2937);
      font-size: 18px;
      font-weight: 600;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--color-text, #1f2937);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
      
      &:hover {
        background: var(--color-secondary, #6366f1);
        color: var(--color-background, white);
      }
      
      &:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }
    }
    
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding: 16px;
      max-height: 250px;
      overflow-y: auto;
      background: var(--color-surface, #f9fafb);
      
      /* Custom Scrollbar */
      scrollbar-width: thin;
      scrollbar-color: var(--color-primary, #3b82f6) var(--color-background, #ffffff);
      
      &::-webkit-scrollbar {
        width: 8px;
      }
      
      &::-webkit-scrollbar-track {
        background: var(--color-background, #ffffff);
        border-radius: 4px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: var(--color-primary, #3b82f6);
        border-radius: 4px;
        transition: background 0.2s;
      }
      
      &::-webkit-scrollbar-thumb:hover {
        background: var(--color-secondary, #6366f1);
      }
    }
    
    .theme-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid transparent;
      background: var(--color-background, #ffffff);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      &:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }
      
      &.active {
        border-color: var(--color-primary, #3b82f6);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
    
    .theme-preview {
      aspect-ratio: 3/2;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 6px;
      position: relative;
      
      &.dark {
        background: #1a1a1a;
      }
      
      &:not(.dark) {
        background: #f5f5f5;
      }
    }
    
    .preview-header {
      height: 35%;
      border-radius: 4px 4px 0 0;
    }
    
    .preview-content {
      height: 65%;
      padding: 4px;
      display: flex;
      gap: 4px;
    }
    
    .preview-item {
      flex: 1;
      border-radius: 4px;
    }
    
    .theme-info {
      padding: 0 6px 6px;
      background: var(--color-background, #ffffff);
    }
    
    .theme-name {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text, #1f2937);
      margin-bottom: 2px;
    }
    
    .theme-type {
      display: block;
      font-size: 10px;
      color: var(--color-textSecondary, #6b7280);
    }
    
    .theme-actions {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--color-border, #e5e7eb);
      background: var(--color-surface, #f9fafb);
    }
    
    .action-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
      
      &:not(.secondary) {
        background: var(--color-primary, #3b82f6);
        color: var(--color-background, white);
      }
      
      &.secondary {
        background: var(--color-secondary, #6366f1);
        color: var(--color-background, white);
      }
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      &:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class ThemeSelectorComponent implements OnInit {
  @Input() showCloseButton = false;
  @Output() closed = new EventEmitter<void>();
  @ViewChildren('themeCard') themeCards: QueryList<ElementRef>;

  themes: ThemeConfig[] = [];
  currentTheme: ThemeConfig;

  private readonly destroyRef = inject(DestroyRef);
  readonly localeService = inject(LocaleService);

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit() {
    this.themes = this.themeService.getThemes();
    console.log('🎨 ThemeSelector - Total themes loaded:', this.themes.length);
    console.log('🎨 ThemeSelector - Theme names:', this.themes.map(t => t.displayName));
    console.log('🎨 ThemeSelector - Full themes:', this.themes);
    this.currentTheme = this.themeService.getCurrentTheme();
    console.log('🎨 ThemeSelector - Current theme:', this.currentTheme);
    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.currentTheme = theme;
        // Force re-fetch themes to ensure colors are fresh
        this.themes = this.themeService.getThemes();
        this.cdr.markForCheck();
      });
  }

  selectTheme(theme: ThemeConfig) {
    this.themeService.setTheme(theme.name);
    this.cdr.markForCheck();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
    this.cdr.markForCheck();
  }

  resetTheme() {
    this.themeService.resetTheme();
    this.cdr.markForCheck();
  }

  close() {
    this.closed.emit();
  }

  focusNextTheme(currentIndex: number): void {
    const nextIndex = (currentIndex + 1) % this.themes.length;
    const nextCard = this.themeCards.toArray()[nextIndex];
    if (nextCard) {
      nextCard.nativeElement.focus();
    }
  }

  focusPreviousTheme(currentIndex: number): void {
    const previousIndex = currentIndex === 0 ? this.themes.length - 1 : currentIndex - 1;
    const previousCard = this.themeCards.toArray()[previousIndex];
    if (previousCard) {
      previousCard.nativeElement.focus();
    }
  }
}
