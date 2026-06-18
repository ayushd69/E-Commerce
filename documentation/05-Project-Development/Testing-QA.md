# Testing & QA Documentation

## Testing Strategy

### Testing Pyramid

```
        ▲
       ╱ ╲
      ╱ E2E╲
     ╱──────╲
    ╱Integration╲
   ╱────────────╲
  ╱   Unit Tests  ╲
 ╱────────────────╲
```

## Unit Testing

### Backend Unit Tests

#### Test Framework: Jest

**Installation**:
```bash
npm install --save-dev jest supertest
```

**Example: User Service Tests**
```javascript
// test/userService.test.js
describe('UserService', () => {
  describe('createUser', () => {
    test('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      
      const user = await UserService.createUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.email).toBe('john@example.com');
      expect(user.password).not.toBe('password123'); // Should be hashed
    });

    test('should throw error for duplicate email', async () => {
      // Setup: Create first user
      await UserService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      // Test: Try to create duplicate
      expect(async () => {
        await UserService.createUser({
          name: 'Jane Doe',
          email: 'john@example.com',
          password: 'password123'
        });
      }).rejects.toThrow('Email already exists');
    });
  });

  describe('getUserById', () => {
    test('should retrieve user by ID', async () => {
      const user = await UserService.getUserById('validUserId');
      expect(user).toBeDefined();
    });

    test('should return null for non-existent user', async () => {
      const user = await UserService.getUserById('invalidUserId');
      expect(user).toBeNull();
    });
  });
});
```

### Frontend Unit Tests

#### Test Framework: Vitest

**Example: Component Tests**
```javascript
// test/ProductCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard Component', () => {
  test('should render product information', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    };

    render(<ProductCard product={product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('should call onAddToCart when button clicked', () => {
    const mockOnAddToCart = jest.fn();
    const product = { id: '1', name: 'Test' };

    render(<ProductCard product={product} onAddToCart={mockOnAddToCart} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 1);
  });
});
```

## Integration Testing

### API Integration Tests

```javascript
// test/api.integration.test.js
describe('Auth API Integration', () => {
  test('should register and login user', async () => {
    // Register
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });

    expect(registerRes.status).toBe(201);

    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.data.token).toBeDefined();
  });

  test('should create order with authenticated user', async () => {
    // Login first
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });

    const token = loginRes.body.data.token;

    // Create order
    const orderRes = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: '1', quantity: 2 }],
        shippingAddress: { /* ... */ }
      });

    expect(orderRes.status).toBe(201);
    expect(orderRes.body.data.orderId).toBeDefined();
  });
});
```

## End-to-End (E2E) Testing

### E2E Framework: Cypress

**Installation**:
```bash
npm install --save-dev cypress
npx cypress open
```

**Example: Complete Purchase Flow**
```javascript
// cypress/integration/purchase.spec.js
describe('Complete Purchase Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should complete a purchase successfully', () => {
    // Navigate to products
    cy.contains('Products').click();
    
    // Select a product
    cy.get('[data-testid="product-card"]').first().click();
    
    // Add to cart
    cy.get('button:contains("Add to Cart")').click();
    cy.get('[data-testid="cart-count"]').should('have.text', '1');
    
    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    
    // Proceed to checkout
    cy.get('button:contains("Checkout")').click();
    
    // Fill shipping details
    cy.get('input[name="street"]').type('123 Main St');
    cy.get('input[name="city"]').type('New York');
    cy.get('input[name="state"]').type('NY');
    cy.get('input[name="zipCode"]').type('10001');
    
    // Select shipping method
    cy.get('input[value="standard"]').click();
    
    // Enter payment details
    cy.get('input[name="cardNumber"]').type('4242424242424242');
    cy.get('input[name="expiry"]').type('1225');
    cy.get('input[name="cvc"]').type('123');
    
    // Complete purchase
    cy.get('button:contains("Place Order")').click();
    
    // Verify success
    cy.contains('Order placed successfully').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });

  it('should show error for invalid payment', () => {
    // Navigate to checkout...
    
    // Enter invalid card
    cy.get('input[name="cardNumber"]').type('4000000000000002');
    cy.get('button:contains("Place Order")').click();
    
    // Verify error
    cy.contains('Payment failed').should('be.visible');
  });
});
```

## Performance Testing

### Load Testing with k6

```javascript
// load-test.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  // Get all products
  const res = http.get('http://api.example.com/api/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## Test Coverage

### Coverage Goals
- **Unit Tests**: 80% minimum
- **Integration Tests**: 60% minimum
- **E2E Tests**: Critical paths covered

### Run Coverage Report
```bash
# Jest coverage
npm test -- --coverage

# Vitest coverage
npm run test:coverage
```

### Coverage Example
```
Statements   : 82.5% ( 165/200 )
Branches     : 78.3% ( 108/138 )
Functions    : 85.0% ( 51/60 )
Lines        : 83.1% ( 159/191 )
```

## Test Data & Fixtures

### Test Data Seeding
```javascript
// test/fixtures/seedTestData.js
const seedTestData = async () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123'
  };

  const testProducts = [
    { name: 'Product 1', price: 99.99 },
    { name: 'Product 2', price: 199.99 }
  ];

  // Insert test data
  await User.create(testUser);
  await Product.insertMany(testProducts);
};

export { seedTestData };
```

## Regression Testing

### Regression Test Suite
- Test all critical features after changes
- Test API endpoints thoroughly
- Test user workflows
- Test admin functions
- Test payment processing

## Bug Tracking

### Issue Template
```markdown
**Bug Description**:
Brief description of the issue

**Steps to Reproduce**:
1. Step 1
2. Step 2

**Expected Behavior**:
What should happen

**Actual Behavior**:
What actually happens

**Screenshots**:
Attach screenshots if applicable

**Environment**:
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox
- Version: v1.0
```

## QA Checklist

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] E2E tests pass
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Accessibility compliant
- [ ] Security vulnerabilities checked
- [ ] Documentation updated
- [ ] All bugs fixed

## Testing Best Practices

1. **Write tests early**: TDD approach
2. **Test behavior, not implementation**: Focus on what, not how
3. **Keep tests isolated**: No dependencies between tests
4. **Use meaningful names**: Test names describe what they test
5. **Mock external dependencies**: Don't hit real APIs
6. **Run tests frequently**: Before commits, in CI/CD
7. **Maintain test data**: Keep fixtures up to date
8. **Review test coverage**: Aim for high coverage
