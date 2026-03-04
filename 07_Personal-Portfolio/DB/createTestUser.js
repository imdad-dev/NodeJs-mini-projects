// createTestUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Adjust the import path to your User model file

// Main function to create test user
async function createTestUser() {
  try {
    // 1. Connect to MongoDB (replace with your connection string)
    const mongoUri = 'mongodb://localhost:27017/portfolio' || process.env.MONGO_URI ;  // Or use process.env.MONGO_URI
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // 2. Check if test user already exists (to avoid duplicates)
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists → skipping creation');
      return;
    }

    // 3. Hash the password
    const plainPassword = 'test1234';  // Change for security in real tests
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // 4. Create and save the test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword
    });

    await testUser.save();
    console.log('Test user created successfully!');
    console.log('Username: testuser');
    console.log('Email: test@example.com');
    console.log('Password (plain): test1234');  // For testing only!
    console.log('User ID:', testUser._id);

  } catch (error) {
    console.error('Error creating test user:', error.message);
  } finally {
    // 5. Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
createTestUser();