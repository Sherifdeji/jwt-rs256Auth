import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";
import { verifyToken } from "../services/jwt.service";

const router = Router();

// Signup and Signin routes
router.post("/signup", signup);
router.post("/signin", signin);

// Protected route (requires valid token)
router.get("/protected", verifyTokenMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

export default router;

// Middleware to verify the token
function verifyTokenMiddleware(req: any, res: any, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    verifyToken(token); // Verify the token using the verifyToken service
    next(); // Proceed to the protected route if token is valid
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
}
