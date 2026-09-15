import { useEffect, useState } from "react";
import adminFetch from "../api/adminApi";

const emptyForm = {
    title: "",
    contact_name: "",
    posted_date: "",
    member_type: "",
    employment_type: "",
    travel: "",
    closing_date: "",
    website: "",
    contact_city: "",
    contact_province: "",
    contact_email: "",
    job_description: "",
    competencies: [],
    tasks: []
};

function CareersAdmin() {

    const [careers, setCareers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingCareer, setEditingCareer] = useState(null);

    const [form, setForm] = useState(emptyForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadCareers() {

        try {

            setLoading(true);
            setError("");

            const data = await adminFetch("/careers");

            setCareers(data);

        } catch (error) {

            console.error(error);
            setError("Unable to load career postings.");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCareers();
    }, []);


    function openAddForm() {

        setEditingCareer(null);

        setForm({
            ...emptyForm,
            competencies: [],
            tasks: []
        });

        setError("");
        setShowForm(true);
    }


    function openEditForm(career) {

        setEditingCareer(career);

        setForm({
            title: career.title || "",
            contact_name: career.contact_name || "",
            posted_date: career.posted_date
                ? career.posted_date.substring(0, 10)
                : "",
            member_type: career.member_type || "",
            employment_type: career.employment_type || "",
            travel: career.travel || "",
            closing_date: career.closing_date
                ? career.closing_date.substring(0, 10)
                : "",
            website: career.website || "",
            contact_city: career.contact_city || "",
            contact_province: career.contact_province || "",
            contact_email: career.contact_email || "",
            job_description: career.job_description || "",

            competencies: career.competencies?.map((item) => ({
                content: item.content
            })) || [],

            tasks: career.tasks?.map((item) => ({
                content: item.content
            })) || []
        });

        setError("");
        setShowForm(true);
    }


    function closeForm() {

        if (saving) return;

        setShowForm(false);
        setEditingCareer(null);
    }


    function handleChange(event) {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    }


    function addCompetency() {

        setForm((previous) => ({
            ...previous,
            competencies: [
                ...previous.competencies,
                { content: "" }
            ]
        }));
    }


    function removeCompetency(index) {

        setForm((previous) => ({
            ...previous,
            competencies: previous.competencies.filter(
                (_, itemIndex) => itemIndex !== index
            )
        }));
    }


    function updateCompetency(index, value) {

        setForm((previous) => ({
            ...previous,
            competencies: previous.competencies.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? { ...item, content: value }
                        : item
            )
        }));
    }


    function addTask() {

        setForm((previous) => ({
            ...previous,
            tasks: [
                ...previous.tasks,
                { content: "" }
            ]
        }));
    }


    function removeTask(index) {

        setForm((previous) => ({
            ...previous,
            tasks: previous.tasks.filter(
                (_, itemIndex) => itemIndex !== index
            )
        }));
    }


    function updateTask(index, value) {

        setForm((previous) => ({
            ...previous,
            tasks: previous.tasks.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? { ...item, content: value }
                        : item
            )
        }));
    }


    async function handleSubmit(event) {

        event.preventDefault();

        if (!form.title.trim()) {
            setError("Job title is required.");
            return;
        }

        try {

            setSaving(true);
            setError("");

            const payload = {
                ...form,
                competencies: form.competencies.filter(
                    (item) => item.content.trim()
                ),
                tasks: form.tasks.filter(
                    (item) => item.content.trim()
                )
            };

            if (editingCareer) {

                await adminFetch(
                    `/careers/${editingCareer.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(payload)
                    }
                );

            } else {

                await adminFetch(
                    "/careers",
                    {
                        method: "POST",
                        body: JSON.stringify(payload)
                    }
                );
            }

            await loadCareers();

            setShowForm(false);
            setEditingCareer(null);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to save career posting."
            );

        } finally {
            setSaving(false);
        }
    }


    async function handleDelete(career) {

        const confirmed = window.confirm(
            `Delete "${career.title}"?`
        );

        if (!confirmed) return;

        try {

            await adminFetch(
                `/careers/${career.id}`,
                {
                    method: "DELETE"
                }
            );

            setCareers((previous) =>
                previous.filter(
                    (item) => item.id !== career.id
                )
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to delete career posting."
            );
        }
    }


    return (
        <div className="admin-page">

            <div className="admin-page-header">

                <div>
                    <h1>Careers</h1>

                    <p>
                        Manage job postings, competencies and tasks.
                    </p>
                </div>

                <button
                    className="admin-primary-button"
                    onClick={openAddForm}
                >
                    + Add Job
                </button>

            </div>


            {error && (
                <div className="admin-alert">
                    {error}
                </div>
            )}


            <div className="admin-card">

                {loading ? (

                    <div className="admin-loading">
                        Loading careers...
                    </div>

                ) : careers.length === 0 ? (

                    <div className="admin-empty">
                        No career postings found.
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Job Title</th>
                                    <th>Contact</th>
                                    <th>Employment</th>
                                    <th>Posted</th>
                                    <th>Closing</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {careers.map((career) => (

                                    <tr key={career.id}>

                                        <td>
                                            #{career.id}
                                        </td>

                                        <td>
                                            <strong>
                                                {career.title}
                                            </strong>
                                        </td>

                                        <td>
                                            {career.contact_name || "—"}
                                        </td>

                                        <td>
                                            {career.employment_type || "—"}
                                        </td>

                                        <td>
                                            {career.posted_date
                                                ? new Date(
                                                    career.posted_date
                                                ).toLocaleDateString()
                                                : "—"}
                                        </td>

                                        <td>
                                            {career.closing_date
                                                ? new Date(
                                                    career.closing_date
                                                ).toLocaleDateString()
                                                : "—"}
                                        </td>

                                        <td>

                                            <div className="admin-actions">

                                                <button
                                                    className="admin-edit-button"
                                                    onClick={() =>
                                                        openEditForm(career)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="admin-delete-button"
                                                    onClick={() =>
                                                        handleDelete(career)
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

                    <div className="admin-modal admin-career-modal">

                        <div className="admin-modal-header">

                            <div>

                                <h2>
                                    {editingCareer
                                        ? "Edit Career"
                                        : "Add Career"}
                                </h2>

                                <p>
                                    Manage the complete job posting.
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

                            <div className="admin-form-section">

                                <h3>Job Information</h3>

                                <div className="admin-form-grid">

                                    <div className="admin-form-group full">
                                        <label>Job Title</label>

                                        <input
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="Job title"
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Contact Name</label>

                                        <input
                                            name="contact_name"
                                            value={form.contact_name}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Member Type</label>

                                        <input
                                            name="member_type"
                                            value={form.member_type}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Employment Type</label>

                                        <input
                                            name="employment_type"
                                            value={form.employment_type}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Travel</label>

                                        <input
                                            name="travel"
                                            value={form.travel}
                                            onChange={handleChange}
                                            placeholder="Yes / No"
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Posted Date</label>

                                        <input
                                            type="date"
                                            name="posted_date"
                                            value={form.posted_date}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Closing Date</label>

                                        <input
                                            type="date"
                                            name="closing_date"
                                            value={form.closing_date}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>City</label>

                                        <input
                                            name="contact_city"
                                            value={form.contact_city}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Province</label>

                                        <input
                                            name="contact_province"
                                            value={form.contact_province}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group">
                                        <label>Contact Email</label>

                                        <input
                                            type="email"
                                            name="contact_email"
                                            value={form.contact_email}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="admin-form-group full">
                                        <label>Website</label>

                                        <input
                                            name="website"
                                            value={form.website}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                            </div>


                            <div className="admin-form-section">

                                <h3>Job Description</h3>

                                <textarea
                                    name="job_description"
                                    value={form.job_description}
                                    onChange={handleChange}
                                    rows="8"
                                    placeholder="Job description"
                                />

                            </div>


                            <div className="admin-form-section">

                                <div className="admin-section-title-row">

                                    <h3>Competencies</h3>

                                    <button
                                        type="button"
                                        className="admin-small-button"
                                        onClick={addCompetency}
                                    >
                                        + Add
                                    </button>

                                </div>


                                {form.competencies.map(
                                    (item, index) => (

                                        <div
                                            className="admin-repeater-row"
                                            key={index}
                                        >

                                            <input
                                                value={item.content}
                                                onChange={(event) =>
                                                    updateCompetency(
                                                        index,
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={`Competency ${index + 1}`}
                                            />

                                            <button
                                                type="button"
                                                className="admin-remove-button"
                                                onClick={() =>
                                                    removeCompetency(index)
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>


                            <div className="admin-form-section">

                                <div className="admin-section-title-row">

                                    <h3>Tasks</h3>

                                    <button
                                        type="button"
                                        className="admin-small-button"
                                        onClick={addTask}
                                    >
                                        + Add
                                    </button>

                                </div>


                                {form.tasks.map(
                                    (item, index) => (

                                        <div
                                            className="admin-repeater-row"
                                            key={index}
                                        >

                                            <input
                                                value={item.content}
                                                onChange={(event) =>
                                                    updateTask(
                                                        index,
                                                        event.target.value
                                                    )
                                                }
                                                placeholder={`Task ${index + 1}`}
                                            />

                                            <button
                                                type="button"
                                                className="admin-remove-button"
                                                onClick={() =>
                                                    removeTask(index)
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>
                                    )
                                )}

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
                                        : editingCareer
                                            ? "Update Career"
                                            : "Create Career"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default CareersAdmin;