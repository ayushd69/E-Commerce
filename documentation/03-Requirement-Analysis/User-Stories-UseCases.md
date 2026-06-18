# User Stories & Use Cases

## User Stories

### User Story 1: Customer Registration
**As a** new customer  
**I want to** create an account with my email  
**So that** I can browse and purchase products  

**Acceptance Criteria:**
- ✓ Can enter email and password
- ✓ Email validation enforced
- ✓ Password strength validated
- ✓ Confirmation email sent
- ✓ Account activated after email verification

---

### User Story 2: Product Browsing
**As a** customer  
**I want to** browse products by category  
**So that** I can find products I'm interested in  

**Acceptance Criteria:**
- ✓ Can view all categories
- ✓ Can filter by category
- ✓ Can view product list with images
- ✓ Can search products
- ✓ Can sort by price/popularity

---

### User Story 3: Add to Cart
**As a** customer  
**I want to** add products to my shopping cart  
**So that** I can purchase multiple items  

**Acceptance Criteria:**
- ✓ Can select product quantity
- ✓ Can add product to cart
- ✓ Cart displays updated count
- ✓ Can continue shopping
- ✓ Cart persists on login

---

### User Story 4: Checkout Process
**As a** customer  
**I want to** checkout and pay for my order  
**So that** I can complete my purchase  

**Acceptance Criteria:**
- ✓ Can review order items
- ✓ Can enter shipping address
- ✓ Can select shipping method
- ✓ Can enter payment details
- ✓ Receive order confirmation

---

### User Story 5: Track Order
**As a** customer  
**I want to** track my order status  
**So that** I know when my items will arrive  

**Acceptance Criteria:**
- ✓ Can view order history
- ✓ Can see current order status
- ✓ Can view estimated delivery date
- ✓ Can download invoice

---

### User Story 6: Admin Product Management
**As an** admin  
**I want to** add and manage products  
**So that** I can keep inventory updated  

**Acceptance Criteria:**
- ✓ Can add new product with details
- ✓ Can upload product images
- ✓ Can set product price and stock
- ✓ Can edit existing products
- ✓ Can delete products
- ✓ Can manage categories

---

### User Story 7: Admin Order Management
**As an** admin  
**I want to** view and manage customer orders  
**So that** I can process and track shipments  

**Acceptance Criteria:**
- ✓ Can view all orders
- ✓ Can filter orders by status
- ✓ Can update order status
- ✓ Can view order details
- ✓ Can generate shipping labels

---

## Use Cases

### Use Case 1: Complete Purchase
**Actor:** Customer  
**Precondition:** Customer is logged in with items in cart  
**Main Flow:**
1. Customer navigates to checkout
2. System displays order review
3. Customer enters shipping address
4. Customer selects shipping method
5. Customer enters payment information
6. System processes payment
7. System generates order confirmation
8. Customer receives confirmation email

**Postcondition:** Order created, payment processed

---

### Use Case 2: Admin Dashboard Access
**Actor:** Admin  
**Precondition:** Admin is logged in  
**Main Flow:**
1. Admin navigates to dashboard
2. System displays sales analytics
3. Admin can view recent orders
4. Admin can see inventory status
5. Admin can access product management
6. Admin can access category management

**Postcondition:** Admin has full platform visibility

---

### Use Case 3: Return & Refund
**Actor:** Customer  
**Precondition:** Order delivered  
**Main Flow:**
1. Customer initiates return request
2. System generates return label
3. Customer ships product back
4. Admin receives and verifies return
5. Admin processes refund
6. Customer receives refund notification

**Postcondition:** Refund processed, product returned to inventory
