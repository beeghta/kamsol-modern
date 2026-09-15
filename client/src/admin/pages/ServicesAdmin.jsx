import { useEffect, useState } from "react";
import adminFetch from "../api/adminApi";

function ServicesAdmin() {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({
        category: "",
        title: "",
        description: ""
    });

    async function loadServices() {
        try {
            setLoading(true);
            setError("");

            const data = await adminFetch("/services");

            setServices(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load services.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    function openAddForm() {
        setEditingService(null);

        setForm({
            category: "",
            title: "",
            description: ""
        });

        setShowForm(true);
        setError("");
    }

    function openEditForm(service) {
        setEditingService(service);

        setForm({
            category: service.category || "",
            title: service.title || "",
            description: service.description || ""
        });

        setShowForm(true);
        setError("");
    }

    function closeForm() {
        if (saving) return;

        setShowForm(false);
        setEditingService(null);
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

        if (!form.category || !form.title || !form.description) {
            setError("Please complete all fields.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            if (editingService) {
                await adminFetch(`/services/${editingService.id}`, {
                    method: "PUT",
                    body: JSON.stringify(form)
                });
            } else {
                await adminFetch("/services", {
                    method: "POST",
                    body: JSON.stringify(form)
                });
            }

            await loadServices();

            setShowForm(false);
            setEditingService(null);
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to save service.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(service) {
        const confirmed = window.confirm(
            `Delete "${service.title}"?`
        );

        if (!confirmed) return;

        try {
            setError("");

            await adminFetch(`/services/${service.id}`, {
                method: "DELETE"
            });

            setServices((previous) =>
                previous.filter(
                    (item) => item.id !== service.id
                )
            );
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to delete service.");
        }
    }

    const filteredServices = services.filter((service) => {
        const searchText = search.toLowerCase();

        return (
            service.title?.toLowerCase().includes(searchText) ||
            service.category?.toLowerCase().includes(searchText) ||
            service.description?.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="admin-page">

            <div className="admin-page-header">
                <div>
                    <h1>Services</h1>
                    <p>
                        Manage the services displayed on the KAMSOL website.
                    </p>
                </div>

                <button
                    className="admin-primary-button"
                    onClick={openAddForm}
                >
                    + Add Service
                </button>
            </div>

            {error && (
                <div className="admin-alert">
                    {error}
                </div>
            )}

            <div className="admin-toolbar">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="admin-search"
                />

                <span className="admin-result-count">
                    {filteredServices.length} service
                    {filteredServices.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="admin-card">

                {loading ? (
                    <div className="admin-loading">
                        Loading services...
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="admin-empty">
                        No services found.
                    </div>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredServices.map((service) => (
                                    <tr key={service.id}>

                                        <td>
                                            #{service.id}
                                        </td>

                                        <td>
                                            <span className="admin-badge">
                                                {service.category}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>
                                                {service.title}
                                            </strong>
                                        </td>

                                        <td className="service-description-cell">
                                            {service.description}
                                        </td>

                                        <td>
                                            <div className="admin-actions">

                                                <button
                                                    className="admin-edit-button"
                                                    onClick={() =>
                                                        openEditForm(service)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="admin-delete-button"
                                                    onClick={() =>
                                                        handleDelete(service)
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

            {showForm && (
                <div className="admin-modal-overlay">

                    <div className="admin-modal">

                        <div className="admin-modal-header">

                            <div>
                                <h2>
                                    {editingService
                                        ? "Edit Service"
                                        : "Add Service"}
                                </h2>

                                <p>
                                    {editingService
                                        ? "Update the service information."
                                        : "Create a new service."}
                                </p>
                            </div>

                            <button
                                className="admin-modal-close"
                                onClick={closeForm}
                            >
                                ×
                            </button>

                        </div>

                        <form
                            className="admin-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="admin-form-group">
                                <label>
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Building Condition Assessments"
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
                                    placeholder="Service title"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Service description"
                                    rows="7"
                                />
                            </div>

                            {error && (
                                <div className="admin-form-error">
                                    {error}
                                </div>
                            )}

                            <div className="admin-form-actions">

                                <button
                                    type="button"
                                    className="admin-secondary-button"
                                    onClick={closeForm}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-primary-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingService
                                            ? "Update Service"
                                            : "Create Service"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}

export default ServicesAdmin;