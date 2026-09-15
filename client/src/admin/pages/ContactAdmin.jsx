import { useEffect, useState } from "react";
import adminFetch from "../api/adminApi";

function ContactAdmin() {

    const [messages, setMessages] = useState([]);

    const [selectedMessage, setSelectedMessage] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadMessages() {

        try {

            setLoading(true);
            setError("");

            const data = await adminFetch(
                "/contact"
            );

            setMessages(data);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to load contact messages."
            );

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        loadMessages();
    }, []);


    async function openMessage(message) {

        try {

            const data = await adminFetch(
                `/contact/${message.id}`
            );

            setSelectedMessage(data);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to load message."
            );
        }
    }


    async function handleDelete(message) {

        const confirmed = window.confirm(
            "Delete this message?"
        );

        if (!confirmed) return;

        try {

            await adminFetch(
                `/contact/${message.id}`,
                {
                    method: "DELETE"
                }
            );

            setMessages((previous) =>
                previous.filter(
                    (item) =>
                        item.id !== message.id
                )
            );

            if (
                selectedMessage &&
                selectedMessage.id === message.id
            ) {
                setSelectedMessage(null);
            }

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to delete message."
            );
        }
    }


    return (
        <div className="admin-page">

            <div className="admin-page-header">

                <div>
                    <h1>Contact Messages</h1>

                    <p>
                        Messages submitted through the website contact form.
                    </p>
                </div>

            </div>


            {error && (
                <div className="admin-alert">
                    {error}
                </div>
            )}


            <div className="admin-card">

                {loading ? (

                    <div className="admin-loading">
                        Loading messages...
                    </div>

                ) : messages.length === 0 ? (

                    <div className="admin-empty">
                        No contact messages yet.
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {messages.map(
                                    (message) => (

                                        <tr
                                            key={message.id}
                                            className="contact-message-row"
                                        >

                                            <td>
                                                <strong>
                                                    {message.name}
                                                </strong>
                                            </td>

                                            <td>
                                                {message.email}
                                            </td>

                                            <td>
                                                {message.phone || "—"}
                                            </td>

                                            <td className="contact-preview">
                                                {message.message}
                                            </td>

                                            <td>
                                                {message.created_at
                                                    ? new Date(
                                                        message.created_at
                                                    ).toLocaleString()
                                                    : "—"}
                                            </td>

                                            <td>

                                                <div className="admin-actions">

                                                    <button
                                                        className="admin-edit-button"
                                                        onClick={() =>
                                                            openMessage(message)
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="admin-delete-button"
                                                        onClick={() =>
                                                            handleDelete(message)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>


            {selectedMessage && (

                <div className="admin-modal-overlay">

                    <div className="admin-modal contact-message-modal">

                        <div className="admin-modal-header">

                            <div>

                                <h2>
                                    Message from{" "}
                                    {selectedMessage.name}
                                </h2>

                                <p>
                                    {selectedMessage.email}
                                </p>

                            </div>

                            <button
                                className="admin-modal-close"
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="contact-message-content">

                            <div className="contact-detail">

                                <span>Name</span>
                                <strong>
                                    {selectedMessage.name}
                                </strong>

                            </div>


                            <div className="contact-detail">

                                <span>Email</span>
                                <strong>
                                    {selectedMessage.email}
                                </strong>

                            </div>


                            <div className="contact-detail">

                                <span>Phone</span>
                                <strong>
                                    {selectedMessage.phone || "—"}
                                </strong>

                            </div>


                            <div className="contact-detail">

                                <span>Date</span>
                                <strong>
                                    {selectedMessage.created_at
                                        ? new Date(
                                            selectedMessage.created_at
                                        ).toLocaleString()
                                        : "—"}
                                </strong>

                            </div>


                            <div className="contact-full-message">

                                <span>Message</span>

                                <p>
                                    {selectedMessage.message}
                                </p>

                            </div>

                        </div>


                        <div className="admin-form-actions">

                            <button
                                className="admin-secondary-button"
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                className="admin-delete-button contact-delete-large"
                                onClick={() =>
                                    handleDelete(selectedMessage)
                                }
                            >
                                Delete Message
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default ContactAdmin;