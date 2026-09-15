import { useEffect, useState } from "react";
import adminFetch from "../api/adminApi";

function HomeSectionsAdmin() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingSection, setEditingSection] = useState(null);

    const [form, setForm] = useState({
        section_key: "",
        eyebrow: "",
        title: "",
        title_highlight: "",
        description: "",
        button_text: "",
        button_link: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        loadSections();
    }, []);

    async function loadSections() {
        try {
            setLoading(true);

            const data = await adminFetch("/home-sections");

            setSections(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function openEditModal(section) {
        setEditingSection(section);

        setForm({
            section_key: section.section_key || "",
            eyebrow: section.eyebrow || "",
            title: section.title || "",
            title_highlight: section.title_highlight || "",
            description: section.description || "",
            button_text: section.button_text || "",
            button_link: section.button_link || ""
        });

        setError("");
        setShowModal(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");

            if (editingSection) {
                await adminFetch(
                    `/home-sections/${editingSection.section_key}`,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            eyebrow: form.eyebrow,
                            title: form.title,
                            title_highlight: form.title_highlight,
                            description: form.description,
                            button_text: form.button_text,
                            button_link: form.button_link
                        })
                    }
                );
            } else {
                await adminFetch("/home-sections", {
                    method: "POST",
                    body: JSON.stringify(form)
                });
            }

            setShowModal(false);

            await loadSections();

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    async function handleDelete(section) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${section.section_key}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await adminFetch(
                `/home-sections/${section.section_key}`,
                {
                    method: "DELETE"
                }
            );

            await loadSections();

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="admin-page">

            <div className="admin-page-header">

                <div>
                    <h1>Home</h1>

                    <p>
                        Manage homepage sections and content.
                    </p>
                </div>

            </div>


            {error && (
                <div className="admin-alert admin-alert-error">
                    {error}
                </div>
            )}


            <div className="admin-card">

                {loading ? (
                    <p>Loading...</p>
                ) : sections.length === 0 ? (
                    <div className="admin-empty">
                        <p>No home sections found.</p>

                        
                    </div>
                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Section</th>
                                    <th>Eyebrow</th>
                                    <th>Title</th>
                                    <th>Highlight</th>
                                    <th>Button</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {sections.map((section) => (
                                    <tr key={section.id}>

                                        <td>
                                            <strong>
                                                {section.section_key}
                                            </strong>
                                        </td>

                                        <td>
                                            {section.eyebrow || "—"}
                                        </td>

                                        <td>
                                            {section.title || "—"}
                                        </td>

                                        <td>
                                            {section.title_highlight || "—"}
                                        </td>

                                        <td>
                                            {section.button_text || "—"}
                                        </td>

                                        <td>

                                            <div className="admin-table-actions">

                                                <button
                                                    className="admin-btn admin-btn-small"
                                                    onClick={() =>
                                                        openEditModal(section)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="admin-btn admin-btn-small admin-btn-danger"
                                                    onClick={() =>
                                                        handleDelete(section)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {showModal && (

                <div className="admin-modal-overlay">

                    <div className="admin-modal">

                        <div className="admin-modal-header">

                            <h2>
                                {editingSection
                                    ? "Edit Home Section"
                                    : "Add Home Section"}
                            </h2>

                            <button
                                className="admin-modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="admin-modal-body">

                                {!editingSection && (
                                    <div className="admin-form-group">

                                        <label>
                                            Section Key
                                        </label>

                                        <input
                                            type="text"
                                            name="section_key"
                                            value={form.section_key}
                                            onChange={handleChange}
                                            placeholder="example-section"
                                            required
                                        />

                                        <small>
                                            Unique identifier used by the
                                            homepage.
                                        </small>

                                    </div>
                                )}


                                {editingSection && (
                                    <div className="admin-form-group">

                                        <label>
                                            Section Key
                                        </label>

                                        <input
                                            type="text"
                                            value={form.section_key}
                                            disabled
                                        />

                                    </div>
                                )}


                                <div className="admin-form-group">

                                    <label>
                                        Eyebrow
                                    </label>

                                    <input
                                        type="text"
                                        name="eyebrow"
                                        value={form.eyebrow}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Highlighted Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title_highlight"
                                        value={form.title_highlight}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="admin-form-group">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        rows="6"
                                        value={form.description}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="admin-form-grid">

                                    <div className="admin-form-group">

                                        <label>
                                            Button Text
                                        </label>

                                        <input
                                            type="text"
                                            name="button_text"
                                            value={form.button_text}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="admin-form-group">

                                        <label>
                                            Button Link
                                        </label>

                                        <input
                                            type="text"
                                            name="button_link"
                                            value={form.button_link}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="admin-modal-footer">

                                <button
                                    type="button"
                                    className="admin-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-btn admin-btn-primary"
                                >
                                    {editingSection
                                        ? "Save Changes"
                                        : "Create Section"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default HomeSectionsAdmin;