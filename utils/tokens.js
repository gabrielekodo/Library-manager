const jwt = require("jsonwebtoken");
const registerToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// create cookie
const createCookie = (res, token) => {
  cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 26 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
};

module.exports = { registerToken, createCookie };

// const addUsers = async () => {
//   await Users.insertMany([
//     {
//       firstname: "Gabriel ",
//       lastname: "Ekodo",
//       email: "ekodogabriel@gmail.com",
//       role: "admin",
//       active: true,
//       photo: "user-1.jpg",
//       password: "$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS",
//     },
//     {
//       firstname: "Lourdes",
//       lastname: "Browning",
//       email: "loulou@example.com",
//       role: "user",
//       active: true,
//       photo: "user-2.jpg",
//       password: "$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..",
//     },
//     {
//       firstname: "Sophie",
//       lastname: "Louise Hart",
//       email: "sophie@example.com",
//       role: "user",
//       active: true,
//       photo: "user-3.jpg",
//       password: "$2a$12$9nFqToiTmjgfFVJiQvjmreLt4k8X4gGYCETGapSZOb2hHa55t0dDq",
//     },
//     {
//       firstname: "Ayla",
//       lastname: "Cornell",
//       email: "ayls@example.com",
//       role: "user",
//       active: true,
//       photo: "user-4.jpg",
//       password: "$2a$12$tm33.M/4pfEbZF64WbFuHuVFv85v4qEhi.ik8njbud7yaoqCZpjiy",
//     },
//     {
//       firstname: "Leo",
//       lastname: "Gillespie",
//       email: "leo@example.com",
//       role: "user",
//       active: true,
//       photo: "user-5.jpg",
//       password: "$2a$12$OOPr90tBEBF1Iho3ox0Jde0O/WXUR0VLA5xdh6tWcu7qb.qOCvSg2",
//     },
//     {
//       firstname: "Jennifer",
//       lastname: "Hardy",
//       email: "jennifer@example.com",
//       role: "user",
//       active: true,
//       photo: "user-6.jpg",
//       password: "$2a$12$XCXvvlhRBJ8CydKH09v1v.jpg0hB9gVVfMVEoz4MsxqL9zb5PrF42",
//     },
//     {
//       firstname: "Kate",
//       lastname: "Morrison",
//       email: "kate@example.com",
//       role: "user",
//       active: true,
//       photo: "user-7.jpg",
//       password: "$2a$12$II1F3aBSFDF3Xz7iB4rk/.a2dogwkClMN5gGCWrRlILrG1xtJG7q6",
//     },
//     {
//       firstname: "Eliana",
//       lastname: "Stout",
//       email: "eliana@example.com",
//       role: "user",
//       active: true,
//       photo: "user-8.jpg",
//       password: "$2a$12$Jb/ILhdDV.ZpnPMu19xfe.NRh5ntE2LzNMNcsty05QWwRbmFFVMKO",
//     },
//     {
//       firstname: "Cristian",
//       lastname: "Vega",
//       email: "chris@example.com",
//       role: "user",
//       active: true,
//       photo: "user-9.jpg",
//       password: "$2a$12$r7/jtdWtzNfrfC7zw3uS.eDJ3Bs.8qrO31ZdbMljL.lUY0TAsaAL6",
//     },
//     {
//       firstname: "Steve",
//       lastname: "T. Scaife",
//       email: "steve@example.com",
//       role: "lib-assistant",
//       active: true,
//       photo: "user-10.jpg",
//       password: "$2a$12$q7v9dm.S4DvqhAeBc4KwduedEDEkDe2GGFGzteW6xnHt120oRpkqm",
//     },
//     {
//       firstname: "Aarav",
//       lastname: "Lynn",
//       email: "aarav@example.com",
//       role: "lib-assistant",
//       active: true,
//       photo: "user-11.jpg",
//       password: "$2a$12$lKWhzujFvQwG4m/X3mnTneOB3ib9IYETsOqQ8aN5QEWDjX6X2wJJm",
//     },
//     {
//       firstname: "Miyah",
//       lastname: "Myles",
//       email: "miyah@example.com",
//       role: "lib-assistant",
//       active: true,
//       photo: "user-12.jpg",
//       password: "$2a$12$.XIvvmznHQSa9UOI639yhe4vzHKCYO1vpTUZc4d45oiT4GOZQe1kS",
//     },
//     {
//       firstname: "Ben",
//       lastname: "Hadley",
//       email: "ben@example.com",
//       role: "user",
//       active: true,
//       photo: "user-13.jpg",
//       password: "$2a$12$D3fyuS9ETdBBw5lOwceTMuZcDTyVq28ieeGUAanIuLMcSDz6bpfIe",
//     },
//     {
//       firstname: "Laura",
//       lastname: "Wilson",
//       email: "laura@example.com",
//       role: "user",
//       active: true,
//       photo: "user-14.jpg",
//       password: "$2a$12$VPYaAAOsI44uhq11WbZ5R.cHT4.fGdlI9gKJd95jmYw3.sAsmbvBq",
//     },
//     {
//       firstname: "Max",
//       lastfirstname: "Smith",
//       email: "max@example.com",
//       role: "user",
//       active: true,
//       photo: "user-15.jpg",
//       password: "$2a$12$l5qamwqcqC2NlgN6o5A5..9Fxzr6X.bjx/8j3a9jYUHWGOL99oXlm",
//     },
//     {
//       firstname: "Isabel",
//       lastname: "Kirkland",
//       email: "isabel@example.com",
//       role: "user",
//       active: true,
//       photo: "user-16.jpg",
//       password: "$2a$12$IUnwPH0MGFeMuz7g4gtfvOll.9wgLyxG.9C3TKlttfLtCQWEE6GIu",
//     },
//     {
//       firstname: "Alexander",
//       lastname: "Jones",
//       email: "alex@example.com",
//       role: "user",
//       active: true,
//       photo: "user-17.jpg",
//       password: "$2a$12$NnclhoYFNcSApoQ3ML8kk.b4B3gbpOmZJLfqska07miAnXukOgK6y",
//     },
//     {
//       firstname: "Eduardo",
//       lastname: "Hernandez",
//       email: "edu@example.com",
//       role: "user",
//       active: true,
//       photo: "user-18.jpg",
//       password: "$2a$12$uB5H1OxLMOqDYTuTlptAoewlovENJvjrLwzsL1wUZ6OkAIByPPBGq",
//     },
//     {
//       firstname: "John",
//       lastname: "Riley",
//       email: "john@example.com",
//       role: "user",
//       active: true,
//       photo: "user-19.jpg",
//       password: "$2a$12$11JElTatQlAFo1Obw/dwd..vuVmQyYS7MT14pkl3lRvVPjGA00G8O",
//     },
//     {
//       firstname: "Lisa",
//       lastname: "Brown",
//       email: "lisa@example.com",
//       role: "user",
//       active: true,
//       photo: "user-20.jpg",
//       password: "$2a$12$uA9FsDw63v6dkJKGlLQ/8ufYBs8euB7kqIQewyYlZXU5azEKeLEky",
//     },
//   ]);
// };
// addUsers();
