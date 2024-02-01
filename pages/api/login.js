import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }
  
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordMatch); 
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
} catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default login;
