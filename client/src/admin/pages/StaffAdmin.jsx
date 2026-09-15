import { useEffect, useState } from "react";
import adminFetch from "../api/adminApi";

function StaffAdmin() {
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const [form, setForm] = useState({
        name: "",
        position: "",
        image: "",
        bio: "",
        email: "",
        phone: "",
        display_order: 0
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadStaff() {
        try {
            setLoading(true);

            const data = await adminFetch("/staff");

            setStaff(data || []);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStaff();
    }, []);

    function openAddForm() {
        setEditingMember(null);

        setForm({
            name: "",
            position: "",
            image: "",
            bio: "",
            email: "",
            phone: "",
            display_order: staff.length + 1
        });

        setShowForm(true);
        setError("");
    }

    function openEditForm(member) {
        setEditingMember(member);

        setForm({
            name: member.name || "",
            position: member.position || "",
            image: member.image || "",
            bio: member.bio || "",
            email: member.email || "",
            phone: member.phone || "",
            display_order: member.display_order ?? 0
        });

        setShowForm(true);
        setError("");
    }

    function closeForm() {
        setShowForm(false);
        setEditingMember(null);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (editingMember) {
                await adminFetch(
                    `/staff/${editingMember.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(form)
                    }
                );
            } else {
                await adminFetch(
                    "/staff",
                    {
                        method: "POST",
                        body: JSON.stringify(form)
                    }
                );
            }

            closeForm();

            await loadStaff();

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(member) {
        const confirmed = window.confirm(
            `Delete ${member.name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await adminFetch(
                `/staff/${member.id}`,
                {
                    method: "DELETE"
                }
            );

            await loadStaff();

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const filteredStaff = staff.filter((member) => {
        const query = search.toLowerCase();

        return (
            member.name?.toLowerCase().includes(query) ||
            member.position?.toLowerCase().includes(query) ||
            member.email?.toLowerCase().includes(query)
        );
    });

    return (
        <div>

            <div className="admin-page-header-row">

                <div>
                    <h2>Professional Staff</h2>

                    <p>
                        Manage professional staff members.
                    </p>
                </div>

                <button
                    className="admin-primary-button"
                    onClick={openAddForm}
                >
                    <i className="fa fa-plus"></i>
                    Add New
                </button>

            </div>

            {error && (
                <div className="admin-alert error">
                    {error}
                </div>
            )}

            <div className="admin-panel">

                <div className="admin-toolbar">

                    <input
                        type="search"
                        placeholder="Search staff..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>

                {loading ? (

                    <div className="admin-loading">
                        Loading staff...
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Email</th>
                                    <th>Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredStaff.map((member) => (

                                    <tr key={member.id}>

                                        <td>
                                            <div className="admin-table-avatar">

                                                {member.image ? (
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                    />
                                                ) : (
                                                    <i className="fa fa-user"></i>
                                                )}

                                            </div>
                                        </td>

                                        <td>
                                            <strong>
                                                {member.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {member.position || "—"}
                                        </td>

                                        <td>
                                            {member.email || "—"}
                                        </td>

                                        <td>
                                            {member.display_order}
                                        </td>

                                        <td>

                                            <div className="admin-actions">

                                                <button
                                                    className="admin-action edit"
                                                    onClick={() =>
                                                        openEditForm(member)
                                                    }
                                                    title="Edit"
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                </button>

                                                <button
                                                    className="admin-action delete"
                                                    onClick={() =>
                                                        handleDelete(member)
                                                    }
                                                    title="Delete"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {filteredStaff.length === 0 && (
                            <div className="admin-empty">
                                No staff members found.
                            </div>
                        )}

                    </div>

                )}

            </div>

            {showForm && (

                <div className="admin-modal-overlay">

                    <div className="admin-modal">

                        <div className="admin-modal-header">

                            <div>
                                <h3>
                                    {editingMember
                                        ? "Edit Staff Member"
                                        : "Add Staff Member"}
                                </h3>

                                <p>
                                    Manage professional staff information.
                                </p>
                            </div>

                            <button
                                className="admin-modal-close"
                                onClick={closeForm}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="admin-form-grid">

                                <div className="admin-form-group">

                                    <label>
                                        Name
                                    </label>

                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="admin-form-group">

                                    <label>
                                        Position
                                    </label>

                                    <input
                                        name="position"
                                        value={form.position}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="admin-form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="admin-form-group">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="admin-form-group">

                                    <label>
                                        Image
                                    </label>

                                    <input
                                        name="image"
                                        value={form.image}
                                        onChange={handleChange}
                                        placeholder="/src/img/Team/team-1.png"
                                    />

                                </div>

                                <div className="admin-form-group">

                                    <label>
                                        Display Order
                                    </label>

                                    <input
                                        type="number"
                                        name="display_order"
                                        value={form.display_order}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="admin-form-group full">

                                    <label>
                                        Biography
                                    </label>

                                    <textarea
                                        name="bio"
                                        rows="7"
                                        value={form.bio}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="admin-modal-footer">

                                <button
                                    type="button"
                                    className="admin-secondary-button"
                                    onClick={closeForm}
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
                                        : editingMember
                                            ? "Update Staff"
                                            : "Create Staff"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default StaffAdmin;