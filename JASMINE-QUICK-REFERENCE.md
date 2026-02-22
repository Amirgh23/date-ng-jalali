# Jasmine Quick Reference Guide

## Test Structure

### Basic Test
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [Service]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Spying and Mocking

### Create a Spy Object
```typescript
// Vitest
const spy = vi.fn().mockReturnValue(value);

// Jasmine
const spy = jasmine.createSpyObj('ServiceName', ['method1', 'method2']);
spy.method1.and.returnValue(value);
```

### Spy on a Method
```typescript
// Vitest
vi.spyOn(service, 'method').mockReturnValue(value);

// Jasmine
spyOn(service, 'method').and.returnValue(value);
```

### Spy on an EventEmitter
```typescript
// Vitest
vi.spyOn(component.eventName, 'emit');

// Jasmine
spyOn(component.eventName, 'emit');
```

### Mock Implementation
```typescript
// Vitest
vi.fn().mockImplementation((arg) => arg * 2);

// Jasmine
jasmine.createSpy('name').and.callFake((arg) => arg * 2);
```

### Check if Called
```typescript
// Both
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(arg);
expect(spy).toHaveBeenCalledTimes(2);
```

## Common Assertions

```typescript
// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Equality
expect(value).toBe(expected);
expect(value).toEqual(expected);

// Strings
expect(value).toContain('substring');
expect(value).toMatch(/regex/);

// Arrays
expect(array).toContain(item);
expect(array).toEqual([1, 2, 3]);

// Objects
expect(obj).toEqual({ key: 'value' });

// Exceptions
expect(() => fn()).toThrowError();
```

## Test Lifecycle

```typescript
beforeEach(() => {
  // Runs before each test
});

afterEach(() => {
  // Runs after each test
});

beforeAll(() => {
  // Runs once before all tests
});

afterAll(() => {
  // Runs once after all tests
});
```

## Async Testing

```typescript
// Using async/await
it('should test async operation', async () => {
  const result = await service.asyncMethod();
  expect(result).toBe(expected);
});

// Using done callback
it('should test async operation', (done) => {
  service.asyncMethod().then(result => {
    expect(result).toBe(expected);
    done();
  });
});

// Using fakeAsync and tick
it('should test async operation', fakeAsync(() => {
  service.asyncMethod();
  tick(1000);
  expect(component.value).toBe(expected);
}));
```

## Component Testing

```typescript
// Create component
const fixture = TestBed.createComponent(MyComponent);
const component = fixture.componentInstance;

// Detect changes
fixture.detectChanges();

// Wait for async operations
await fixture.whenStable();

// Get native element
const element = fixture.nativeElement;
const compiled = fixture.nativeElement as HTMLElement;

// Query elements
const button = fixture.debugElement.query(By.css('button'));
const buttons = fixture.debugElement.queryAll(By.css('button'));
```

## Service Testing

```typescript
it('should call service method', () => {
  const service = TestBed.inject(MyService);
  spyOn(service, 'method').and.returnValue('result');
  
  const result = service.method();
  
  expect(result).toBe('result');
  expect(service.method).toHaveBeenCalled();
});
```

## Dependency Injection

```typescript
// Provide mock service
TestBed.configureTestingModule({
  providers: [
    { provide: RealService, useValue: mockService }
  ]
});

// Inject service
const service = TestBed.inject(RealService);
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests once (no watch)
npm test -- --watch=false

# Run specific test file
npm test -- --include='**/my-component.spec.ts'

# Run with coverage
npm test -- --code-coverage

# Run in headless mode
npm test -- --browsers=ChromeHeadless
```

## Files Modified

1. **package.json** - Updated dependencies
2. **karma.conf.js** - New Karma configuration
3. **test-setup.ts** - Updated test environment setup
4. **tsconfig.spec.json** - Updated TypeScript types
5. **vitest.config.ts** - Deleted
6. **All .spec.ts files** - Updated to Jasmine syntax

## Migration Checklist

- [x] Update package.json dependencies
- [x] Create karma.conf.js
- [x] Update test-setup.ts
- [x] Update tsconfig.spec.json files
- [x] Delete vitest.config.ts
- [x] Convert all spec files to Jasmine syntax
- [x] Replace vi.fn() with jasmine.createSpyObj()
- [x] Replace .mockReturnValue() with .and.returnValue()
- [x] Replace vi.spyOn() with spyOn()
- [x] Run npm install to install new dependencies
- [ ] Run npm test to verify all tests pass
