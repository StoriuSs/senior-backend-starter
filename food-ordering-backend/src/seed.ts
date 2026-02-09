
import mongoose from "mongoose";
import User from "./models/user";
import Restaurant from "./models/restaurant";
import Order from "./models/order";
import "dotenv/config";

const MONGODB_URI =
  process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
  console.error("MONGODB_URI or MONGODB_CONNECTION_STRING is missing in .env");
  process.exit(1);
}

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database for seeding...");

    const email = "test@gmail.com";
    const password = "123456";
    const name = "Test User";

    // 1. Create or Find User
    let user = await User.findOne({ email });

    if (!user) {
      console.log(`User ${email} not found. Creating...`);
      user = new User({
        email,
        password, // Pre-save hook will hash this
        name,
        addressLine1: "123 Test St",
        city: "London",
        country: "UK",
      });
      await user.save();
      console.log("User created successfully.");
    } else {
      console.log(`User ${email} already exists.`);
      // Update password just in case (optional, but requested password is specific)
      user.password = password; 
      await user.save(); // Will re-hash
      console.log("User password ensured.");
    }

    // 2. Create Restaurant for this User
    let restaurant = await Restaurant.findOne({ user: user._id });

    if (!restaurant) {
      console.log("Creating restaurant for user...");
      restaurant = new Restaurant({
        user: user._id,
        restaurantName: "Big Hungers Test Kitchen",
        city: "London",
        country: "UK",
        deliveryPrice: 500, // 5.00 GBP
        estimatedDeliveryTime: 30,
        cuisines: ["Burgers", "American", "Fries"],
        menuItems: [
          { name: "Classic Cheese Burger", price: 1200 }, // 12.00
          { name: "Bacon Deluxe", price: 1450 }, // 14.50
          { name: "Large Fries", price: 450 }, // 4.50
          { name: "Vanilla Shake", price: 500 }, // 5.00
        ],
        imageUrl:
          "https://res.cloudinary.com/dklo6r2qg/image/upload/v1706027376/food-ordering/k8j8k8j8k8j8.jpg", // Placeholder or valid URL
        lastUpdated: new Date(),
      });
      await restaurant.save();
      console.log("Restaurant created.");
    } else {
      console.log("Restaurant already exists for this user.");
    }

    // 3. Create Orders (Historical Data for Dashboard)
    const existingOrders = await Order.countDocuments({ user: user._id });

    if (existingOrders < 5) { // Only seed if few orders exist
      console.log("Seeding sample orders...");

      const statuses = [
        "delivered",
        "delivered",
        "delivered",
        "inProgress",
        "paid",
      ];
      
      const orders = statuses.map((status, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (index * 2)); // Spread over days

        return {
          restaurant: restaurant?._id,
          user: user?._id,
          deliveryDetails: {
            email: user?.email,
            name: user?.name,
            addressLine1: user?.addressLine1,
            city: user?.city,
          },
          cartItems: [
            {
              menuItemId: "fake-id-1",
              name: "Classic Cheese Burger",
              quantity: "2",
            },
            {
              menuItemId: "fake-id-2",
              name: "Large Fries",
              quantity: "1",
            },
          ],
          totalAmount: "2850", // 2*1200 + 450 = 2850
          status: status,
          createdAt: date,
        };
      });

      await Order.insertMany(orders);
      console.log(`${orders.length} sample orders created.`);
    } else {
      console.log("Sufficient orders already exist.");
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seed();
