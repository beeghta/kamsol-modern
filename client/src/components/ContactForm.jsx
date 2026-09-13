import { useState } from "react";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.name.trim()) {
            setStatus("Name is required.");
            return;
        }

        if (!formData.email.trim()) {
            setStatus("Email is required.");
            return;
        }

        if (!formData.message.trim()) {
            setStatus("Message is required.");
            return;
        }

        setStatus("Sending...");

        try {
            const response = await fetch(
                "http://localhost:3001/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setStatus("Message sent successfully!");

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });

        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="col-lg-6 mt-1">
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mt-1">
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-12 mt-1">
                <input
                    type="text"
                    placeholder="Phone"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-12 mt-1">
                <textarea
                    className="form-control"
                    placeholder="Message"
                    rows="10"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <div className="float-right text-right mx-20 m-y-2">
                <button
                    className="btn-kamsol py-2 m-y-2"
                    type="submit"
                >
                    send <i className="fa fa-angle-right"></i>
                </button>
            </div>

            {status && (
                <div className="col-lg-12">
                    <p>{status}</p>
                </div>
            )}

        </form>
    );
}

export default ContactForm;