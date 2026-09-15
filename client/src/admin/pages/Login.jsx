import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        try {
            const response = await fetch(
                "http://localhost:3001/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "adminUser",
                JSON.stringify(data.user)
            );

            navigate("/admin");

            navigate("/admin");

        } catch (error) {
            console.error(error);

            setError(error.message);
        }
    }

    return (
        <div className="admin-login">

            <div className="admin-login-card">

                <div className="admin-login-logo">
                    <h1>KAMSOL</h1>
                    <span>ELITE CONSULTANTS</span>
                </div>

                <div className="admin-login-heading">
                    <h2>Welcome Back</h2>
                    <p>Sign in to manage your website.</p>
                </div>

                {error && (
                    <div className="admin-alert error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="admin-form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        LOGIN
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;