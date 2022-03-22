const toggleNav = document.querySelector(".nav-toggle");
const navBar = document.querySelector("nav");
const open = document.querySelector(".open");
const close = document.querySelector(".close");

const navToggle = (e) => {
  //   e.preventDefault();
  //   alert("clicked...");
  //   console.log(open);
  document.querySelector(".nav").classList.toggle("toggle");
  open.classList.toggle("menu");
  navBar.classList.toggle("navHeight");
  document.querySelector(".nav").style.transform = "translateY(0px)";
};

toggleNav.addEventListener("click", navToggle);

// uploading Images to S3
// const form = document.getElementById("form");
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const file = document.getElementById("image").files[0];

//   // 1)get secure url from server
//   const { url } = await fetch("http://localhost:8080/S3url").then((res) =>
//     res.json()
//   );
//   console.log(file);
//   console.log(url);
//   // 2)post image to S3 bucketS
//   await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: file,
//   });
//   const imageUrl = url.split("?")[0];

//   // 3) post any extra data to database
//   await fetch("http://localhost:8080/api/v1/users/622ae0760044ec43c975e04a", {
//     method: "PATCH",

//     body: JSON.parse(imageUrl),
//   });

//   console.log(imageUrl);

//   const img = document.createElement("img");
//   img.src = imageUrl;
//   document.body.appendChild(img);
// });
