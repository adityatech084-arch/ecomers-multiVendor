
// // import dotenv from "dotenv";
// // dotenv.config()
// // import jwt from "jsonwebtoken";
// // // console.log(process.env.JWT_EXPIRES_IN)


// // export const generateToken = (userId, res) => {
// //   const token = jwt.sign(
// //     { id: userId },
// //     process.env.JWT_SECRET,
// //     { expiresIn: process.env.JWT_EXPIRES_IN }
// //   );

// //   // Get values from .env and convert to numbers
// //   const hours = Number(process.env.COOKIE_EXPIRE_HOURS) || 0;
// //   const minutes = Number(process.env.COOKIE_EXPIRE_MINUTES) || 0;

// //   // Calculation: (Hours * 3600 + Minutes * 60) * 1000ms
// //   const maxAgeInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

// //   res.cookie("token", token, {
// //     maxAge: maxAgeInMs || 24 * 60 * 60 * 1000, // Fallback to 24h if 0
// //     httpOnly: true,
// //     sameSite: "strict",
// //     secure: process.env.NODE_ENV === "production",
// //   });

// //   return token;
// // };

// import dotenv from "dotenv";
// dotenv.config();
// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   // Create JWT
//   const token = jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || "24h" } // Ensure >= cookie
//   );

//   // Cookie duration
//   const hours = Number(process.env.COOKIE_EXPIRE_HOURS) || 24;
//   const minutes = Number(process.env.COOKIE_EXPIRE_MINUTES) || 0;
//   const maxAgeInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

//   // Set cookie
//   res.cookie("token", token, {
//     maxAge: maxAgeInMs, // in milliseconds
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production", // false for localhost
//     path: "/", // ensure it’s valid for all routes
//   });

//   return token;
// };




import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   // JWT expiration: 1 day
//   const expiresIn = "24h"; // 24 hours

//   const token = jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn }
//   );

//   // Cookie duration in ms: 1 day
//   const maxAgeInMs = 24 * 60 * 60 * 1000; // 24 hours

//   res.cookie("token", token, {
//     maxAge: maxAgeInMs,
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//     path: "/", // valid for all routes
//   });

//   return token;
// };

export const generateToken = (userId, res) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });

  const maxAgeInMs = 
    (Number(process.env.COOKIE_EXPIRE_HOURS) || 24) * 60 * 60 * 1000 +
    (Number(process.env.COOKIE_EXPIRE_MINUTES) || 0) * 60 * 1000;

  res.cookie("token", token, {
    maxAge: maxAgeInMs,
    httpOnly: true, // allow redirects
      sameSite: "none",
    secure:true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
};

// export const generateToken = (userId, res) => {
//   // JWT expires in 30 days
//   const token = jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn: "30d" } // 30 days
//   );

//   // Cookie expires in 30 days (milliseconds)
//   const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

//   res.cookie("token", token, {
//     maxAge,
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//     path: "/", // valid for all routes
//   });

//   return token;
// };
