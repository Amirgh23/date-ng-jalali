<template>
  <jalali-date-picker
    ref="pickerElement"
    :class="class"
    :style="style"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, useAttrs, watch, onMounted, onBeforeUnmount } from 'vue';
import type {
  JalaliDatePickerVueProps,
  JalaliDatePickerVueEmits,
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  JalaliDatePickerEvent,
} from './types';

/**
 * JalaliDatePickerVue - Vue 3 wrapper for Jalali Date Picker Web Component
 *
 * This component wraps the native web component and provides:
 * - Vue 3 Composition API support
 * - v-model support for single, range, and multiple selections
 * - Event handling with proper TypeScript types
 * - Ref forwarding for direct element access
 *
 * @example
 * ```vue
 * <template>
 *   <JalaliDatePickerVue
 *     v-model="date"
 *     locale="fa"
 *     theme="glassmorphism"
 *     @dateSelect="onDateSelect"
 *   />
 * </template>
 *
 * <script setup lang="ts">
 * import { ref } from 'vue';
 * import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
 *
 * const date = ref<Date | null>(null);
 *
 * const onDateSelect = (detail) => {
 *   console.log('Selected date:', detail.date);
 * };
 * </script>
 * ```
 */

defineProps<JalaliDatePickerVueProps>();

const emit = defineEmits<JalaliDatePickerVueEmits>();

const attrs = useAttrs();
const pickerElement = ref<HTMLElement | null>(null);

// Ensure the web component is registered
onMounted(() => {
  if (!customElements.get('jalali-date-picker')) {
    console.warn(
      'jalali-date-picker web component is not registered. ' +
        'Make sure to import and register it before using JalaliDatePickerVue.'
    );
  }
});

// Watch for modelValue changes and update the web component
watch(
  () => attrs.modelValue,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).selectedDate = newValue;
    }
  }
);

// Watch for modelRange changes and update the web component
watch(
  () => attrs.modelRange,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).selectedRange = newValue;
    }
  }
);

// Watch for modelDates changes and update the web component
watch(
  () => attrs.modelDates,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).selectedDates = newValue;
    }
  }
);

// Watch for calendarType changes
watch(
  () => attrs.calendarType,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).calendarType = newValue;
    }
  }
);

// Watch for locale changes
watch(
  () => attrs.locale,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).locale = newValue;
    }
  }
);

// Watch for theme changes
watch(
  () => attrs.theme,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).theme = newValue;
    }
  }
);

// Watch for selectionMode changes
watch(
  () => attrs.selectionMode,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).selectionMode = newValue;
    }
  }
);

// Watch for disabled changes
watch(
  () => attrs.disabled,
  (newValue) => {
    if (pickerElement.value && newValue !== undefined) {
      (pickerElement.value as any).disabled = newValue;
    }
  }
);

// Handle dateSelect event
const handleDateSelect = (event: Event) => {
  const customEvent = event as JalaliDatePickerEvent<DateSelectDetail>;
  emit('dateSelect', customEvent.detail);
  emit('update:modelValue', customEvent.detail.date);
};

// Handle rangeSelect event
const handleRangeSelect = (event: Event) => {
  const customEvent = event as JalaliDatePickerEvent<RangeSelectDetail>;
  emit('rangeSelect', customEvent.detail);
  emit('update:modelRange', customEvent.detail.range);
};

// Handle multipleSelect event
const handleMultipleSelect = (event: Event) => {
  const customEvent = event as JalaliDatePickerEvent<MultipleSelectDetail>;
  emit('multipleSelect', customEvent.detail);
  emit('update:modelDates', customEvent.detail.dates);
};

// Handle localeChange event
const handleLocaleChange = (event: Event) => {
  const customEvent = event as JalaliDatePickerEvent<LocaleChangeDetail>;
  emit('localeChange', customEvent.detail);
};

// Handle themeChange event
const handleThemeChange = (event: Event) => {
  const customEvent = event as JalaliDatePickerEvent<ThemeChangeDetail>;
  emit('themeChange', customEvent.detail);
};

// Handle error event
const handleError = (event: Event) => {
  const customEvent = event as CustomEvent<{ message: string }>;
  const error = new Error(customEvent.detail?.message || 'Unknown error');
  emit('error', error);
};

// Setup event listeners
onMounted(() => {
  const element = pickerElement.value;
  if (!element) return;

  element.addEventListener('dateSelect', handleDateSelect);
  element.addEventListener('rangeSelect', handleRangeSelect);
  element.addEventListener('multipleSelect', handleMultipleSelect);
  element.addEventListener('localeChange', handleLocaleChange);
  element.addEventListener('themeChange', handleThemeChange);
  element.addEventListener('error', handleError);
});

// Cleanup event listeners
onBeforeUnmount(() => {
  const element = pickerElement.value;
  if (!element) return;

  element.removeEventListener('dateSelect', handleDateSelect);
  element.removeEventListener('rangeSelect', handleRangeSelect);
  element.removeEventListener('multipleSelect', handleMultipleSelect);
  element.removeEventListener('localeChange', handleLocaleChange);
  element.removeEventListener('themeChange', handleThemeChange);
  element.removeEventListener('error', handleError);
});

// Expose methods for direct element access
defineExpose({
  /**
   * Get the underlying web component element
   */
  element: pickerElement,

  /**
   * Get the selected date value
   */
  getValue: () => {
    return pickerElement.value ? (pickerElement.value as any).value : null;
  },

  /**
   * Reset the picker
   */
  reset: () => {
    if (pickerElement.value) {
      (pickerElement.value as any).reset?.();
    }
  },

  /**
   * Open the picker
   */
  open: () => {
    if (pickerElement.value) {
      (pickerElement.value as any).open?.();
    }
  },

  /**
   * Close the picker
   */
  close: () => {
    if (pickerElement.value) {
      (pickerElement.value as any).close?.();
    }
  },

  /**
   * Set a date
   */
  setDate: (date: Date) => {
    if (pickerElement.value) {
      (pickerElement.value as any).setDate?.(date);
    }
  },

  /**
   * Set a date range
   */
  setRange: (start: Date, end: Date) => {
    if (pickerElement.value) {
      (pickerElement.value as any).setRange?.(start, end);
    }
  },

  /**
   * Add a date (for multiple selection)
   */
  addDate: (date: Date) => {
    if (pickerElement.value) {
      (pickerElement.value as any).addDate?.(date);
    }
  },

  /**
   * Remove a date (for multiple selection)
   */
  removeDate: (date: Date) => {
    if (pickerElement.value) {
      (pickerElement.value as any).removeDate?.(date);
    }
  },
});
</script>

<style scoped>
/* Component styles can be added here if needed */
</style>
