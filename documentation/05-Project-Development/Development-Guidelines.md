# Development Guidelines

## Code Standards

### JavaScript/Node.js Standards

#### Naming Conventions
```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserData() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_TIMEOUT = 5000;

// Classes: PascalCase
class UserManager {}

// Private variables: prefix with underscore
const _privateVar = 'private';
```

#### Function Best Practices
```javascript
// Always use arrow functions in modern code
const getUserById = (id) => {
  return User.findById(id);
};

// Use async/await over promises
const fetchUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`User not found: ${error.message}`);
  }
};
```

#### Error Handling
```javascript
// Always handle errors
try {
  const data = await fetchData();
} catch (error) {
  logger.error('Error fetching data:', error);
  throw new CustomError('Failed to fetch data', 500);
}
```

### React Standards

#### Component Structure
```javascript
// Functional components with hooks
const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="product-card">
      {/* Component JSX */}
    </div>
  );
};

export default ProductCard;
```

#### Props and State Management
```javascript
// Use PropTypes for validation
import PropTypes from 'prop-types';

Component.propTypes = {
  userId: PropTypes.string.isRequired,
  items: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
};

// Default props
Component.defaultProps = {
  items: [],
};
```

## Code Organization

### Backend Folder Structure
```
backend/
├── models/           # Database schemas
├── routes/           # API endpoints
├── middleware/       # Express middleware
├── controllers/      # Business logic
├── utils/           # Utility functions
├── config/          # Configuration files
├── index.js         # Entry point
└── .env             # Environment variables
```

### Frontend Folder Structure
```
frontend/src/
├── components/      # Reusable components
├── pages/          # Page components
├── context/        # Context API
├── hooks/          # Custom hooks
├── utils/          # Utility functions
├── styles/         # CSS/Tailwind
└── App.jsx         # Main component
```

## Version Control

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/add-user-authentication

# Make changes and commit
git add .
git commit -m "Add JWT authentication"

# Push to remote
git push origin feature/add-user-authentication

# Create Pull Request
# Merge after review
```

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Example**: `feat(auth): implement JWT token refresh`

## Testing

### Unit Testing
```javascript
// Backend: Use Jest and Supertest
describe('UserService', () => {
  test('should retrieve user by ID', async () => {
    const user = await UserService.getUserById('123');
    expect(user).toBeDefined();
  });
});
```

### API Testing
```bash
# Use Postman or similar tools
# Document test cases
# Create API test collections
```

## Documentation

### Inline Code Comments
```javascript
// Good: Explains why, not what
// We use shallow copy instead of deep copy for performance reasons
const copy = { ...original };

// Bad: Obvious from code
// Get the user
const user = await User.findById(userId);
```

### Function Documentation
```javascript
/**
 * Retrieves user by ID
 * @param {string} userId - The user ID
 * @returns {Promise<User>} User object
 * @throws {Error} If user not found
 */
const getUserById = async (userId) => {
  // implementation
};
```

## Performance Optimization

### Database
- Add indexes on frequently queried fields
- Use pagination for large datasets
- Avoid N+1 queries

### Frontend
- Code splitting and lazy loading
- Image optimization
- Minimize bundle size
- Use React.memo for expensive components

### API
- Implement caching
- Compress responses (gzip)
- Rate limiting
- Query optimization

## Security Best Practices

### Authentication & Authorization
- Hash passwords with bcrypt
- Use JWT for stateless auth
- Implement refresh tokens
- Validate all inputs

### Data Protection
- Use HTTPS/TLS
- Encrypt sensitive data
- Implement CORS properly
- SQL injection prevention (MongoDB injection)

### Dependencies
- Regular security updates
- Audit packages (`npm audit`)
- Avoid vulnerable packages
- Update Node.js version

## Code Review Checklist

- [ ] Code follows style guidelines
- [ ] No console.log statements
- [ ] Error handling present
- [ ] Input validation implemented
- [ ] No hardcoded secrets
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No merge conflicts

## Development Tools

### Recommended Extensions (VS Code)
- ESLint
- Prettier
- MongoDB for VS Code
- REST Client
- Postman

### Debugging
```javascript
// Use debugger statements
debugger;

// Or use VS Code debugger with .vscode/launch.json
```

### Performance Monitoring
```bash
# Check bundle size
npm run build -- --analyze

# Check dependencies
npm list

# Audit security
npm audit
```
