/**
 * نمونه کامل استفاده از Pass Through
 * این فایل شامل تمام حالات ممکن استفاده از PT است
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  JalaliCalendarComponent, 
  CalendarPassThroughOptions,
  DatePickerPassThroughOptions 
} from 'jalali-date-picker';

@Component({
  selector: 'app-pt-demo',
  standalone: true,
  imports: [CommonModule, JalaliCalendarComponent],
  template: `
    <div class="demo-container">
      <h1>نمونه‌های Pass Through</h1>
      
      <!-- مثال 1: استفاده پایه -->
      <section>
        <h2>1. استفاده پایه (بدون PT)</h2>
        <jalali-calendar [(selectedDate)]="date1"></jalali-calendar>
      </section>
      
      <!-- مثال 2: PT استاتیک -->
      <section>
        <h2>2. Pass Through استاتیک</h2>
        <jalali-calendar 
          [pt]="staticPT"
          [(selectedDate)]="date2">
        </jalali-calendar>
      </section>
      
      <!-- مثال 3: PT پویا -->
      <section>
        <h2>3. Pass Through پویا</h2>
        <jalali-calendar 
          [pt]="dynamicPT"
          [(selectedDate)]="date3">
        </jalali-calendar>
      </section>
      
      <!-- مثال 4: Unstyled با Tailwind -->
      <section>
        <h2>4. Unstyled Mode + Tailwind</h2>
        <jalali-calendar 
          [unstyled]="true"
          [pt]="tailwindPT"
          [(selectedDate)]="date4">
        </jalali-calendar>
      </section>
      
      <!-- مثال 5: Bootstrap -->
      <section>
        <h2>5. Bootstrap Classes</h2>
        <jalali-calendar 
          [unstyled]="true"
          [pt]="bootstrapPT"
          [(selectedDate)]="date5">
        </jalali-calendar>
      </section>
      
      <!-- مثال 6: Custom Styling -->
      <section>
        <h2>6. Custom Styling</h2>
        <jalali-calendar 
          [pt]="customPT"
          [styleClass]="'my-special-calendar'"
          [style]="{ maxWidth: '500px', margin: '0 auto' }"
          [(selectedDate)]="date6">
        </jalali-calendar>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    section {
      margin-bottom: 3rem;
      padding: 2rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 2rem;
      color: #1f2937;
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #374151;
    }
    
    .my-special-calendar {
      border: 3px solid #8b5cf6;
      box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.3);
    }
  `]
})
export class PTDemoComponent {
  // تاریخ‌های مختلف برای هر مثال
  date1 = new Date();
  date2 = new Date();
  date3 = new Date();
  date4 = new Date();
  date5 = new Date();
  date6 = new Date();
  
  // ============================================
  // مثال 2: PT استاتیک
  // ============================================
  staticPT: CalendarPassThroughOptions = {
    root: {
      class: 'custom-calendar',
      style: {
        border: '2px solid #3b82f6',
        borderRadius: '16px'
      }
    },
    header: {
      class: 'custom-header',
      style: {
        backgroundColor: '#eff6ff'
      }
    },
    dayCell: {
      class: 'custom-day',
      style: {
        fontWeight: '500'
      }
    }
  };
  
  // ============================================
  // مثال 3: PT پویا
  // ============================================
  dynamicPT: CalendarPassThroughOptions = {
    root: {
      class: 'dynamic-calendar'
    },
    
    // تابع پویا برای day cell
    dayCell: (options) => {
      const date = options.context?.date;
      if (!date) return {};
      
      const dayOfWeek = date.getDay();
      const dayOfMonth = date.getDate();
      const isWeekend = dayOfWeek === 5; // جمعه
      const isFirstOfMonth = dayOfMonth === 1;
      const isPast = date < new Date();
      
      return {
        class: {
          'friday-special': isWeekend,
          'first-day': isFirstOfMonth,
          'past-date': isPast
        },
        style: {
          backgroundColor: isWeekend 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : isFirstOfMonth 
            ? '#fef3c7' 
            : undefined,
          color: isWeekend ? 'white' : undefined,
          opacity: isPast ? '0.6' : '1'
        },
        data: {
          weekend: isWeekend,
          firstDay: isFirstOfMonth,
          timestamp: date.getTime()
        }
      };
    },
    
    // تابع پویا برای holiday dot
    holidayDot: (options) => {
      const date = options.context?.date;
      const isWeekend = date?.getDay() === 5;
      
      return {
        style: {
          backgroundColor: isWeekend ? '#ef4444' : '#f59e0b',
          width: isWeekend ? '8px' : '4px',
          height: isWeekend ? '8px' : '4px'
        }
      };
    }
  };
  
  // ============================================
  // مثال 4: Tailwind CSS
  // ============================================
  tailwindPT: CalendarPassThroughOptions = {
    root: {
      class: [
        'bg-white dark:bg-gray-800',
        'rounded-xl shadow-2xl',
        'p-6',
        'max-w-md mx-auto',
        'border border-gray-200 dark:border-gray-700'
      ]
    },
    
    header: {
      class: [
        'flex justify-between items-center',
        'mb-6 pb-4',
        'border-b border-gray-200 dark:border-gray-700'
      ]
    },
    
    headerLeft: {
      class: 'flex items-center gap-3'
    },
    
    title: {
      class: 'flex items-center gap-2'
    },
    
    monthName: {
      class: [
        'text-2xl font-bold',
        'text-gray-900 dark:text-white'
      ]
    },
    
    yearName: {
      class: [
        'text-2xl',
        'text-gray-600 dark:text-gray-400'
      ]
    },
    
    previousButton: {
      class: [
        'p-2 rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      ]
    },
    
    nextButton: {
      class: [
        'p-2 rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      ]
    },
    
    todayButton: {
      class: [
        'px-4 py-2',
        'bg-blue-500 hover:bg-blue-600',
        'text-white font-medium',
        'rounded-lg',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      ]
    },
    
    grid: {
      class: 'grid grid-cols-7 gap-2'
    },
    
    dayHeader: {
      class: [
        'text-center text-sm font-semibold',
        'text-gray-600 dark:text-gray-400',
        'py-2'
      ]
    },
    
    dayCell: {
      class: [
        'aspect-square',
        'flex items-center justify-center',
        'rounded-lg cursor-pointer',
        'transition-all duration-200',
        'hover:bg-blue-50 dark:hover:bg-blue-900/20',
        'hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      ]
    }
  };
  
  // ============================================
  // مثال 5: Bootstrap
  // ============================================
  bootstrapPT: CalendarPassThroughOptions = {
    root: {
      class: 'card shadow-lg'
    },
    
    header: {
      class: 'card-header d-flex justify-content-between align-items-center'
    },
    
    headerLeft: {
      class: 'd-flex align-items-center gap-2'
    },
    
    title: {
      class: 'd-flex align-items-center gap-2'
    },
    
    monthName: {
      class: 'h4 mb-0 fw-bold'
    },
    
    yearName: {
      class: 'h4 mb-0 text-muted'
    },
    
    previousButton: {
      class: 'btn btn-outline-primary btn-sm'
    },
    
    nextButton: {
      class: 'btn btn-outline-primary btn-sm'
    },
    
    todayButton: {
      class: 'btn btn-primary btn-sm'
    },
    
    grid: {
      class: 'card-body'
    },
    
    dayHeader: {
      class: 'text-center fw-semibold text-secondary py-2'
    },
    
    dayCell: {
      class: 'btn btn-outline-secondary btn-sm m-1'
    }
  };
  
  // ============================================
  // مثال 6: Custom Styling
  // ============================================
  customPT: CalendarPassThroughOptions = {
    root: {
      class: 'gradient-calendar',
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem'
      }
    },
    
    header: {
      style: {
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
      }
    },
    
    monthName: {
      style: {
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }
    },
    
    yearName: {
      style: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    
    previousButton: {
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: 'none'
      }
    },
    
    nextButton: {
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: 'none'
      }
    },
    
    todayButton: {
      style: {
        backgroundColor: 'white',
        color: '#667eea',
        fontWeight: 'bold'
      }
    },
    
    dayHeader: {
      style: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600'
      }
    },
    
    dayCell: (options) => {
      const date = options.context?.date;
      const isToday = date?.toDateString() === new Date().toDateString();
      
      return {
        style: {
          backgroundColor: isToday 
            ? 'white' 
            : 'rgba(255, 255, 255, 0.1)',
          color: isToday ? '#667eea' : 'white',
          border: isToday ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
          fontWeight: isToday ? 'bold' : 'normal'
        }
      };
    }
  };
}
