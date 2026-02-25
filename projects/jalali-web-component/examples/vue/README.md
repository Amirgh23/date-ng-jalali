# Jalali Date Picker - Vue 3 Integration Guide

Complete guide for using the Jalali Date Picker Web Component in Vue 3 applications with full TypeScript support.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Basic Usage](#basic-usage)
4. [v-model Support](#v-model-support)
5. [Props and Events](#props-and-events)
6. [State Management Patterns](#state-management-patterns)
7. [Form Integration](#form-integration)
8. [Accessibility](#accessibility)
9. [Common Patterns](#common-patterns)
10. [Troubleshooting](#troubleshooting)
11. [API Reference](#api-reference)

## Installation

### 1. Install the Web Component Package

```bash
npm install @jalali-web-component/core
```

### 2. Import and Register the Web Component

In your main application file (e.g., `main.ts`):

```typescript
import { JalaliDatePickerElement } from '@jalali-web-component/core';

// Register the web component
customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### 3. Import the Vue Component

```vue
<script setup lang="ts">
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
</script>
```

## Quick Start

### Basic Example

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    locale="fa"
    theme="light"
  />
  <p v-if="date">Selected: {{ date.toLocaleDateString('fa-IR') }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

## Basic Usage

### Single Date Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue
      v-model="selectedDate"
      locale="fa"
      theme="light"
      selection-mode="single"
      @dateSelect="onDateSelect"
    />
    <p v-if="selectedDate">
      Selected: {{ selectedDate.toLocaleDateString('fa-IR') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateSelectDetail } from './types';

const selectedDate = ref<Date | null>(null);

const onDateSelect = (detail: DateSelectDetail) => {
  console.log('Selected date:', detail.date);
  console.log('Jalali date:', detail.jalaliDate);
  console.log('Gregorian date:', detail.gregorianDate);
};
</script>
```

### Date Range Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue
      v-model:modelRange="range"
      locale="fa"
      theme="light"
      selection-mode="range"
      @rangeSelect="onRangeSelect"
    />
    <p v-if="range.start && range.end">
      From: {{ range.start.toLocaleDateString('fa-IR') }}
      <br />
      To: {{ range.end.toLocaleDateString('fa-IR') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { RangeSelectDetail, DateRange } from './types';

const range = ref<DateRange>({
  start: null,
  end: null,
});

const onRangeSelect = (detail: RangeSelectDetail) => {
  console.log('Range selected:', detail.range);
};
</script>
```

### Multiple Dates Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue
      v-model:modelDates="dates"
      locale="fa"
      theme="light"
      selection-mode="multiple"
      @multipleSelect="onMultipleSelect"
    />
    <ul v-if="dates.length > 0">
      <li v-for="(date, index) in dates" :key="index">
        {{ date.toLocaleDateString('fa-IR') }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { MultipleSelectDetail } from './types';

const dates = ref<Date[]>([]);

const onMultipleSelect = (detail: MultipleSelectDetail) => {
  console.log('Selected dates:', detail.dates);
};
</script>
```

## v-model Support

The component supports Vue 3's v-model directive for all selection modes:

### Single Date v-model

```vue
<template>
  <JalaliDatePickerVue v-model="date" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref<Date | null>(null);
</script>
```

### Range v-model

```vue
<template>
  <JalaliDatePickerVue v-model:modelRange="range" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DateRange } from './types';

const range = ref<DateRange>({
  start: null,
  end: null,
});
</script>
```

### Multiple Dates v-model

```vue
<template>
  <JalaliDatePickerVue v-model:modelDates="dates" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dates = ref<Date[]>([]);
</script>
```

## Props and Events

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Date \| null` | `null` | Selected date (v-model support) |
| `modelRange` | `DateRange` | `{ start: null, end: null }` | Selected date range (v-model support) |
| `modelDates` | `Date[]` | `[]` | Selected dates array (v-model support) |
| `calendarType` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | Calendar system to use |
| `locale` | `'fa' \| 'en'` | `'fa'` | Language and locale |
| `theme` | `string` | `'light'` | Theme name |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `disabled` | `boolean` | `false` | Disable the picker |
| `class` | `string` | - | CSS class name |
| `style` | `Record<string, any>` | - | Inline styles |

### Events

#### update:modelValue

Emitted when the selected date changes (v-model support).

```vue
<JalaliDatePickerVue
  v-model="date"
  @update:modelValue="(newDate) => console.log(newDate)"
/>
```

#### update:modelRange

Emitted when the selected range changes (v-model support).

```vue
<JalaliDatePickerVue
  v-model:modelRange="range"
  @update:modelRange="(newRange) => console.log(newRange)"
/>
```

#### update:modelDates

Emitted when the selected dates change (v-model support).

```vue
<JalaliDatePickerVue
  v-model:modelDates="dates"
  @update:modelDates="(newDates) => console.log(newDates)"
/>
```

#### dateSelect

Emitted when a single date is selected.

```vue
<JalaliDatePickerVue
  @dateSelect="(detail) => {
    console.log('Date:', detail.date);
    console.log('Jalali:', detail.jalaliDate);
    console.log('Gregorian:', detail.gregorianDate);
    console.log('Hijri:', detail.hijriDate);
  }"
/>
```

#### rangeSelect

Emitted when a date range is selected.

```vue
<JalaliDatePickerVue
  @rangeSelect="(detail) => {
    console.log('Start:', detail.range.start);
    console.log('End:', detail.range.end);
  }"
/>
```

#### multipleSelect

Emitted when multiple dates are selected.

```vue
<JalaliDatePickerVue
  @multipleSelect="(detail) => {
    console.log('Dates:', detail.dates);
  }"
/>
```

#### localeChange

Emitted when the locale changes.

```vue
<JalaliDatePickerVue
  @localeChange="(detail) => {
    console.log('New locale:', detail.locale);
  }"
/>
```

#### themeChange

Emitted when the theme changes.

```vue
<JalaliDatePickerVue
  @themeChange="(detail) => {
    console.log('New theme:', detail.theme);
  }"
/>
```

#### error

Emitted when an error occurs.

```vue
<JalaliDatePickerVue
  @error="(error) => {
    console.error('Error:', error.message);
  }"
/>
```

## State Management Patterns

### Reactive State with Composition API

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    locale="fa"
    theme="light"
  />
  <p>{{ date }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### Computed Properties

```vue
<template>
  <div>
    <JalaliDatePickerVue v-model="date" />
    <p>Formatted: {{ formattedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);

const formattedDate = computed(() => {
  return date.value
    ? date.value.toLocaleDateString('fa-IR')
    : 'No date selected';
});
</script>
```

### Watch for Changes

```vue
<template>
  <JalaliDatePickerVue v-model="date" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);

watch(date, (newDate) => {
  console.log('Date changed:', newDate);
});
</script>
```

## Form Integration

### Basic Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="formData.name" type="text" />
    </div>

    <div>
      <label>Birth Date:</label>
      <JalaliDatePickerVue v-model="formData.birthDate" />
    </div>

    <div>
      <label>Event Date:</label>
      <JalaliDatePickerVue v-model="formData.eventDate" />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const formData = ref({
  name: '',
  birthDate: null as Date | null,
  eventDate: null as Date | null,
});

const handleSubmit = () => {
  if (!formData.value.birthDate || !formData.value.eventDate) {
    alert('Please select both dates');
    return;
  }
  console.log('Form submitted:', formData.value);
};
</script>
```

### Form Validation

```vue
<template>
  <div>
    <JalaliDatePickerVue
      v-model="date"
      @dateSelect="validateDate"
    />
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateSelectDetail } from './types';

const date = ref<Date | null>(null);
const error = ref('');

const validateDate = (detail: DateSelectDetail) => {
  const today = new Date();
  if (detail.date > today) {
    error.value = 'Date cannot be in the future';
    date.value = null;
    return;
  }
  error.value = '';
};
</script>
```

## Accessibility

### ARIA Labels

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    aria-label="Select a date"
    aria-describedby="date-help"
  />
  <p id="date-help">Please select your preferred date</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### Keyboard Navigation

The component supports full keyboard navigation:

- **Arrow Keys**: Navigate between dates
- **Enter**: Select a date
- **Escape**: Close the picker
- **Tab**: Move to next element

### Screen Reader Support

The component includes proper ARIA labels and semantic HTML for screen reader compatibility.

## Common Patterns

### Syncing Multiple Pickers

```vue
<template>
  <div>
    <h3>Picker 1</h3>
    <JalaliDatePickerVue v-model="date" />

    <h3>Picker 2 (Synced)</h3>
    <JalaliDatePickerVue v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### Conditional Rendering

```vue
<template>
  <div>
    <button @click="showPicker = !showPicker">
      {{ showPicker ? 'Hide' : 'Show' }} Picker
    </button>

    <JalaliDatePickerVue v-if="showPicker" v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const showPicker = ref(false);
const date = ref<Date | null>(null);
</script>
```

### Dynamic Theme Switching

```vue
<template>
  <div>
    <select v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="glassmorphism">Glassmorphism</option>
    </select>

    <JalaliDatePickerVue v-model="date" :theme="theme" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const theme = ref('light');
const date = ref<Date | null>(null);
</script>
```

### Locale Switching

```vue
<template>
  <div>
    <button @click="locale = locale === 'fa' ? 'en' : 'fa'">
      Switch to {{ locale === 'fa' ? 'English' : 'Persian' }}
    </button>

    <JalaliDatePickerVue v-model="date" :locale="locale" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const locale = ref<'fa' | 'en'>('fa');
const date = ref<Date | null>(null);
</script>
```

## Troubleshooting

### Web Component Not Registered

**Problem**: "jalali-date-picker is not a known element"

**Solution**: Make sure to register the web component before using it:

```typescript
import { JalaliDatePickerElement } from '@jalali-web-component/core';

customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### Events Not Firing

**Problem**: Event callbacks are not being called

**Solution**: Ensure the event listener is properly attached:

```vue
<JalaliDatePickerVue
  v-model="date"
  @dateSelect="(detail) => {
    console.log('Event fired:', detail);
  }"
/>
```

### v-model Not Working

**Problem**: v-model is not updating the component

**Solution**: Make sure you're using the correct v-model binding:

```vue
<!-- For single date -->
<JalaliDatePickerVue v-model="date" />

<!-- For range -->
<JalaliDatePickerVue v-model:modelRange="range" />

<!-- For multiple dates -->
<JalaliDatePickerVue v-model:modelDates="dates" />
```

### Ref Not Working

**Problem**: Ref is undefined or not accessible

**Solution**: Use the ref correctly:

```vue
<template>
  <JalaliDatePickerVue ref="picker" />
  <button @click="getValue">Get Value</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const picker = ref<any>(null);

const getValue = () => {
  if (picker.value) {
    console.log('Value:', picker.value.getValue());
  }
};
</script>
```

### Styling Issues

**Problem**: Styles are not applied correctly

**Solution**: The component uses Shadow DOM for encapsulation. To style the component from outside:

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    style="width: 100%; max-width: 400px;"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

## API Reference

### JalaliDatePickerVue Component

#### Props

See [Props and Events](#props-and-events) section above.

#### Emits

See [Props and Events](#props-and-events) section above.

#### Methods (via ref)

```typescript
const picker = ref<any>(null);

// Get the selected date
const value = picker.value.getValue();

// Reset the picker
picker.value.reset();

// Open the picker
picker.value.open();

// Close the picker
picker.value.close();

// Set a date
picker.value.setDate(new Date());

// Set a range
picker.value.setRange(new Date(), new Date());

// Add a date (for multiple selection)
picker.value.addDate(new Date());

// Remove a date (for multiple selection)
picker.value.removeDate(new Date());
```

### Types

All TypeScript types are exported from `./types.ts`:

```typescript
import {
  JalaliDatePickerVueProps,
  JalaliDatePickerVueEmits,
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  DateValue,
  DateRange,
} from './types';
```

## Examples

See the `App.vue` file for comprehensive examples including:

1. Single date selection
2. Date range selection
3. Multiple dates selection
4. Form integration
5. Controlled vs uncontrolled components
6. Dynamic theme switching
7. Locale switching
8. Event handling

## License

MIT
