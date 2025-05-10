import { Request, Response, NextFunction } from "express";
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

// Middleware to verify the token
function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }

  try {
    verifyToken(token); // Verify the token using the verifyToken service
    next(); // Proceed to the protected route if token is valid
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }
}

export default router;
