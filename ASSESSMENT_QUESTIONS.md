# Restaurant Food Ordering System - Debug Assessment

Find and fix the bugs in the following files.

---

## 1. Backend Bugs

### Bug 1.1: Authentication Middleware
**File:** `food-ordering-backend/src/middleware/auth.ts`
**Lines:** 27, 33-34

```typescript
if (authHeader || authHeader.startsWith("Bearer ")) {
  token = authHeader.substring(7);
}
// ...
if (token) {
  return res.status(401).json({ message: "unauthorized" });
}
```

**Fix the logic errors in this authentication code.**

---

### Bug 1.2: Restaurant Creation Check
**File:** `food-ordering-backend/src/controllers/MyRestaurantController.ts`
**Lines:** 24-28

```typescript
const existingRestaurant = await Restaurant.findOne({ user: req.userId });

if (!existingRestaurant) {
  return res
    .status(409)
    .json({ message: "User restaurant already exists" });
}
```

**Fix the condition to properly check if a restaurant already exists.**

---

### Bug 1.3: Price Conversion
**File:** `food-ordering-backend/src/controllers/MyRestaurantController.ts`
**Lines:** 32-34, 38

```typescript
const deliveryPrice = req.body.deliveryPrice
  ? Math.round(parseFloat(req.body.deliveryPrice) / 100)
  : 0;

price: item.price ? Math.round(parseFloat(item.price) / 100) : 0,
```

**Fix the price conversion to store prices in pence correctly.**

---

### Bug 1.4: MongoDB Query Operator
**File:** `food-ordering-backend/src/controllers/RestaurantController.ts`
**Line:** 46

```typescript
query["cuisines"] = { $any: cuisinesArray };
```

**Fix the invalid MongoDB operator.**

---

### Bug 1.5: Search Query Logic
**File:** `food-ordering-backend/src/controllers/RestaurantController.ts`
**Lines:** 51-54

```typescript
query["$and"] = [
  { restaurantName: searchRegex },
  { cuisines: { $in: [searchRegex] } },
];
```

**Fix the query to search by restaurant name OR cuisine (not AND).**

---

### Bug 1.6: Pagination Skip
**File:** `food-ordering-backend/src/controllers/RestaurantController.ts`
**Line:** 58

```typescript
const skip = page * pageSize;
```

**Fix the skip calculation for 1-indexed pages.**

---

### Bug 1.7: Total Pages Calculation
**File:** `food-ordering-backend/src/controllers/RestaurantController.ts`
**Line:** 73

```typescript
pages: Math.floor(total / pageSize),
```

**Fix the total pages calculation to include partial pages.**

---

### Bug 1.8: Order Schema Type
**File:** `food-ordering-backend/src/models/order.ts`
**Line:** 16

```typescript
name: { type: Number, required: false },
```

**Fix the data type for cart item name.**

---

### Bug 1.9: Missing Order Status
**File:** `food-ordering-backend/src/models/order.ts`
**Line:** 22

```typescript
enum: ["placed", "paid", "inProgress", "outForDelivery"],
```

**Add the missing order status used by the frontend.**

---

### Bug 1.10: Create User Function
**File:** `food-ordering-backend/src/controllers/MyUserController.ts`
**Lines:** 18-28

```typescript
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findById(req.userId);
    if (existingUser) {
      return res.status(200).send();
    }
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};
```

**Fix the function to actually create a new user when one doesn't exist.**

---

## 2. Code Quality Issues

### Bug 2.1: Debug Logs in Production
**File:** `food-ordering-frontend/src/components/EnhancedOrdersTab.tsx`
**Lines:** 200-216

```typescript
console.log("Filtered orders:", filteredOrders);
console.log("Grouped orders:", groupedOrders);
console.log("Sorted grouped orders:", sortedGroupedOrders);
```

**Remove debug console.log statements.**

---

### Bug 2.2: Hardcoded Statistics
**File:** `food-ordering-frontend/src/components/EnhancedOrdersTab.tsx`
**Lines:** 229-230, 244

```typescript
<p className="text-xs text-muted-foreground">
  +12% from last month
</p>
```

**Remove or replace hardcoded fake statistics.**

---

## Scoring

| Section | Bugs | Points Each | Total |
|---------|------|-------------|-------|
| Backend | 10 | 10 | 100 |
| Frontend | 11 | 10 | 110 |
| Code Quality | 2 | 5 | 10 |
| **Total** | **23** | - | **220** |

---

*All bugs are intentional for assessment purposes.*
