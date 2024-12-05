import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to login. Please check your credentials.");
    }

    const data = await response.json();
    return data; // Typically includes the token and user information
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { login };
