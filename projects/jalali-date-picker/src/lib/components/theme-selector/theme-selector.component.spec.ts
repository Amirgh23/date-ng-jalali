import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSelectorComponent } from './theme-selector.component';
import { ThemeService } from '../../core/services/theme.service';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorComponent],
      providers: [ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have themes list', () => {
    expect(component.themes).toBeDefined();
    expect(component.themes.length).toBeGreaterThan(0);
  });

  it('should have current theme', () => {
    expect(component.currentTheme).toBeDefined();
    expect(component.currentTheme.name).toBeDefined();
  });

  it('should select theme', () => {
    const newTheme = component.themes[0];
    component.selectTheme(newTheme);
    
    expect(themeService.getCurrentTheme().name).toBe(newTheme.name);
  });

  it('should emit closed event', () => {
    spyOn(component.closed, 'emit');
    component.close();
    
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should show close button when showCloseButton is true', () => {
    component.showCloseButton = true;
    fixture.detectChanges();
    
    const closeButton = fixture.nativeElement.querySelector('.close-btn');
    expect(closeButton).toBeTruthy();
  });

  it('should not show close button when showCloseButton is false', () => {
    component.showCloseButton = false;
    fixture.detectChanges();
    
    const closeButton = fixture.nativeElement.querySelector('.close-btn');
    expect(closeButton).toBeFalsy();
  });

  it('should mark current theme as active', () => {
    fixture.detectChanges();
    
    const activeCard = fixture.nativeElement.querySelector('.theme-card.active');
    expect(activeCard).toBeTruthy();
  });

  it('should have theme preview for each theme', () => {
    fixture.detectChanges();
    
    const previews = fixture.nativeElement.querySelectorAll('.theme-preview');
    expect(previews.length).toBe(component.themes.length);
  });

  it('should display theme name', () => {
    fixture.detectChanges();
    
    const themeNames = fixture.nativeElement.querySelectorAll('.theme-name');
    expect(themeNames.length).toBeGreaterThan(0);
  });

  it('should display theme type (dark/light)', () => {
    fixture.detectChanges();
    
    const themeTypes = fixture.nativeElement.querySelectorAll('.theme-type');
    expect(themeTypes.length).toBeGreaterThan(0);
  });

  it('should handle keyboard navigation', () => {
    fixture.detectChanges();
    
    const themeCards = fixture.nativeElement.querySelectorAll('.theme-card');
    expect(themeCards.length).toBeGreaterThan(0);
    
    const firstCard = themeCards[0];
    expect(firstCard.getAttribute('tabindex')).toBe('0');
  });

  it('should apply dark class to dark theme previews', () => {
    fixture.detectChanges();
    
    const darkTheme = component.themes.find(t => t.isDark);
    if (darkTheme) {
      const darkPreviews = fixture.nativeElement.querySelectorAll('.theme-preview.dark');
      expect(darkPreviews.length).toBeGreaterThan(0);
    }
  });

  it('should have accessibility attributes', () => {
    fixture.detectChanges();
    
    const selector = fixture.nativeElement.querySelector('.theme-selector');
    expect(selector.getAttribute('role')).toBe('region');
    expect(selector.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have grid role for theme grid', () => {
    fixture.detectChanges();
    
    const grid = fixture.nativeElement.querySelector('.theme-grid');
    expect(grid.getAttribute('role')).toBe('grid');
  });

  it('should have gridcell role for theme cards', () => {
    fixture.detectChanges();
    
    const cards = fixture.nativeElement.querySelectorAll('.theme-card');
    cards.forEach((card: Element) => {
      expect(card.getAttribute('role')).toBe('gridcell');
    });
  });

  it('should update current theme on theme service change', () => {
    const newTheme = component.themes[1];
    themeService.setTheme(newTheme.name);
    fixture.detectChanges();
    
    expect(component.currentTheme.name).toBe(newTheme.name);
  });
});
