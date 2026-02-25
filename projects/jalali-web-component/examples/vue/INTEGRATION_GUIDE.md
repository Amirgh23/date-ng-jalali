# Vue 3 Integration Guide for Jalali Date Picker Web Component

This guide provides detailed instructions for integrating the Jalali Date Picker Web Component into Vue 3 applications.

## Table of Contents

1. [Setup](#setup)
2. [Basic Integration](#basic-integration)
3. [v-model Patterns](#v-model-patterns)
4. [Event Handling](#event-handling)
5. [State Management](#state-management)
6. [Advanced Patterns](#advanced-patterns)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Setup

### Step 1: Install Dependencies

```bash
npm install @jalali-web-component/core
```

### Step 2: Register the Web Component

In your main application file (`main.ts` or `main.js`):

```typescript
import { createApp } from 'vue';
import { JalaliDatePickerElement } from '@jalali-web-component/core';
import App from './App.vue';

// Register the web component
customElements.define('jalali-date-picker', JalaliDatePickerElement);

const app = createApp(App);
app.mount('#app');
```

### Step 3: Configure TypeScript (Optional)

Add the following to your `tsconfig.json` to enable proper TypeScript support for custom elements:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "types": ["vue/ref-macros"]
  }
}
```

## Basic Integration

### Using the Vue Wrapper Component

The recommended way to use the Jalali Date Picker in Vue is through the provided wrapper component:

```vue
<template>
  <JalaliDatePickerVue
    v-model="selectedDate"
    locale="fa"
    theme="light"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const selectedDate = ref<Date | null>(null);
</script>
```

### Using the Web Component Directly

You can also use the web component directly without the wrapper:

```vue
<template>
  <jalali-date-picker
    ref="picker"
    locale="fa"
    theme="light"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const picker = ref<HTMLElement | null>(null);

onMounted(() => {
  if (picker.value) {
    picker.value.addEventListener('dateSelect', (event: any) => {
      console.log('Selected date:', event.detail.date);
    });
  }
});
</script>
```

## v-model Patterns

### Single Date Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue v-model="date" />
    <p>Selected: {{ date }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### Date Range Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue v-model:modelRange="range" />
    <p>From: {{ range.start }} To: {{ range.end }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateRange } from './types';

const range = ref<DateRange>({
  start: null,
  end: null,
});
</script>
```

### Multiple Dates Selection

```vue
<template>
  <div>
    <JalaliDatePickerVue v-model:modelDates="dates" />
    <ul>
      <li v-for="date in dates" :key="date.getTime()">
        {{ date.toLocaleDateString('fa-IR') }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const dates = ref<Date[]>([]);
</script>
```

## Event Handling

### Listening to Events

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    @dateSelect="onDateSelect"
    @localeChange="onLocaleChange"
    @themeChange="onThemeChange"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateSelectDetail, LocaleChangeDetail, ThemeChangeDetail } from './types';

const date = ref<Date | null>(null);

const onDateSelect = (detail: DateSelectDetail) => {
  console.log('Date selected:', detail.date);
  console.log('Jalali date:', detail.jalaliDate);
};

const onLocaleChange = (detail: LocaleChangeDetail) => {
  console.log('Locale changed to:', detail.locale);
};

const onThemeChange = (detail: ThemeChangeDetail) => {
  console.log('Theme changed to:', detail.theme);
};

const onError = (error: Error) => {
  console.error('Error:', error.message);
};
</script>
```

## State Management

### Using Composition API

```vue
<template>
  <div>
    <JalaliDatePickerVue v-model="date" />
    <p>{{ formattedDate }}</p>
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

### Using Pinia Store

```typescript
// stores/dateStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDateStore = defineStore('date', () => {
  const selectedDate = ref<Date | null>(null);
  const selectedRange = ref({ start: null, end: null });

  const setDate = (date: Date | null) => {
    selectedDate.value = date;
  };

  const setRange = (start: Date | null, end: Date | null) => {
    selectedRange.value = { start, end };
  };

  return {
    selectedDate,
    selectedRange,
    setDate,
    setRange,
  };
});
```

```vue
<template>
  <JalaliDatePickerVue
    :model-value="dateStore.selectedDate"
    @update:modelValue="dateStore.setDate"
  />
</template>

<script setup lang="ts">
import { useDateStore } from './stores/dateStore';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const dateStore = useDateStore();
</script>
```

## Advanced Patterns

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

### Dynamic Theme and Locale

```vue
<template>
  <div>
    <select v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="glassmorphism">Glassmorphism</option>
    </select>

    <select v-model="locale">
      <option value="fa">فارسی</option>
      <option value="en">English</option>
    </select>

    <JalaliDatePickerVue
      v-model="date"
      :theme="theme"
      :locale="locale"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
const theme = ref('light');
const locale = ref<'fa' | 'en'>('fa');
</script>
```

### Form Integration with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Birth Date:</label>
      <JalaliDatePickerVue
        v-model="formData.birthDate"
        @dateSelect="validateBirthDate"
      />
      <span v-if="errors.birthDate" class="error">
        {{ errors.birthDate }}
      </span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateSelectDetail } from './types';

const formData = ref({
  birthDate: null as Date | null,
});

const errors = ref({
  birthDate: '',
});

const validateBirthDate = (detail: DateSelectDetail) => {
  const today = new Date();
  const age = today.getFullYear() - detail.date.getFullYear();

  if (age < 18) {
    errors.value.birthDate = 'You must be at least 18 years old';
    formData.value.birthDate = null;
  } else {
    errors.value.birthDate = '';
  }
};

const handleSubmit = () => {
  if (!formData.value.birthDate) {
    alert('Please select a birth date');
    return;
  }
  console.log('Form submitted:', formData.value);
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
```

### Syncing Multiple Pickers

```vue
<template>
  <div>
    <h3>Picker 1</h3>
    <JalaliDatePickerVue v-model="date" />

    <h3>Picker 2 (Synced)</h3>
    <JalaliDatePickerVue v-model="date" />

    <h3>Picker 3 (Synced)</h3>
    <JalaliDatePickerVue v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

## Performance Optimization

### Lazy Loading

```vue
<template>
  <div>
    <button @click="loadPicker">Load Date Picker</button>
    <JalaliDatePickerVue v-if="pickerLoaded" v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const pickerLoaded = ref(false);
const date = ref<Date | null>(null);

const loadPicker = () => {
  pickerLoaded.value = true;
};
</script>
```

### Memoization with useCallback

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    @dateSelect="handleDateSelect"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type { DateSelectDetail } from './types';

const date = ref<Date | null>(null);

// Memoized handler
const handleDateSelect = computed(() => {
  return (detail: DateSelectDetail) => {
    console.log('Date selected:', detail.date);
  };
});
</script>
```

## Troubleshooting

### Issue: Web Component Not Recognized

**Problem**: "jalali-date-picker is not a known element"

**Solution**: Ensure the web component is registered before the Vue app is mounted:

```typescript
import { JalaliDatePickerElement } from '@jalali-web-component/core';

customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### Issue: v-model Not Working

**Problem**: Changes to the date picker are not reflected in the Vue component

**Solution**: Make sure you're using the correct v-model binding:

```vue
<!-- For single date -->
<JalaliDatePickerVue v-model="date" />

<!-- For range -->
<JalaliDatePickerVue v-model:modelRange="range" />

<!-- For multiple dates -->
<JalaliDatePickerVue v-model:modelDates="dates" />
```

### Issue: Events Not Firing

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

### Issue: TypeScript Errors

**Problem**: TypeScript errors when using the component

**Solution**: Import the types from the types file:

```typescript
import type {
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  DateRange,
} from './types';
```

### Issue: Styling Not Applied

**Problem**: Styles are not applied to the date picker

**Solution**: The component uses Shadow DOM for encapsulation. To style from outside:

```vue
<template>
  <JalaliDatePickerVue
    v-model="date"
    style="width: 100%; max-width: 400px;"
  />
</template>
```

## Best Practices

1. **Always register the web component** before using it in Vue
2. **Use the wrapper component** for better Vue integration
3. **Leverage v-model** for two-way binding
4. **Handle events** for complex interactions
5. **Use TypeScript** for better type safety
6. **Validate user input** in form scenarios
7. **Optimize performance** with lazy loading when needed
8. **Test thoroughly** with different locales and themes

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Web Components Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Jalali Date Picker Documentation](../../README.md)
