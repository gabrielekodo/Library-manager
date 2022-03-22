const login = async (email, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/users/login",
      data: { email, password },
    });
    console.log(response.data);
    if (response.data.status === "success") {
      // window.location.reload();
      window.location.href = "/users/me";
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
