import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function validatedValues(email, password) {
    if (!email || !password) {
      alert("Enter the fields specified.");
      return false;
    }
    // Validation for email will come here.
    return true;
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      if (!validatedValues(email, "random")) {
        return;
      }
      const response = await axios.post(
        "http://localhost:3500/api/v1/user/password/forgot",
        {
          mailID: email,
        }
      );
      if (response.data.success) {
        alert("Checkout your mailbox to find URL to change the password.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid entry!");
    }
  };

  return (
    <div className="body-loginPage">
      <div class="center" style={{ padding: "0 0 30px 0" }}>
        <h1>Recovery Page</h1>
        <form method="post" id="login-form">
          <div class="txt_field">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span></span>
            <label>Email-ID</label>
          </div>
          <input
            type="submit"
            value="Send Recovery Link"
            onClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
