import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, API_BASE_URL } from "../utils/api";

const emptyProject = {
  title: "",
  category: "",
  description: "",
  image: "",
  techStack: "",
  features: "",
  githubUrl: "",
  liveUrl: ""
};

const emptySkill = {
  category: "",
  name: ""
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
};

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(localStorage.getItem("adminKey") || "");
  const [authorized, setAuthorized] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [activeTab, setActiveTab] = useState("contacts");

  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingSkillId, setEditingSkillId] = useState("");
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [savingSkill, setSavingSkill] = useState(false);

  const adminHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-admin-key": adminKey
    }),
    [adminKey]
  );

  const setSuccess = (message) => setStatus({ type: "success", message });
  const setError = (message) => setStatus({ type: "error", message });

  const verifyAdmin = async () => {
    try {
      await apiRequest("/api/admin/verify", {
        headers: { "x-admin-key": adminKey }
      });
      localStorage.setItem("adminKey", adminKey);
      setAuthorized(true);
      setSuccess("Admin access granted.");
    } catch (error) {
      setAuthorized(false);
      setError(error.message);
    }
  };

  const loadDashboard = async () => {
    try {
      setLoadingDashboard(true);
      const [contactRes, projectRes, skillRes] = await Promise.all([
        apiRequest("/api/contact", { headers: { "x-admin-key": adminKey } }),
        apiRequest("/api/projects"),
        apiRequest("/api/skills")
      ]);
      setContacts(contactRes.data || []);
      setProjects(projectRes.data || []);
      setSkills(skillRes.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    if (!adminKey) return;
    verifyAdmin();
  }, []);

  useEffect(() => {
    if (authorized) {
      loadDashboard();
    }
  }, [authorized]);

  const handleProjectInput = (event) => {
    const { name, value } = event.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillInput = (event) => {
    const { name, value } = event.target;
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearProjectForm = () => {
    setEditingProjectId("");
    setProjectForm(emptyProject);
    setProjectImageFile(null);
  };

  const clearSkillForm = () => {
    setEditingSkillId("");
    setSkillForm(emptySkill);
  };

  const uploadProjectImage = async () => {
    if (!projectImageFile) {
      setError("Select an image file first.");
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", projectImageFile);

      const response = await fetch(`${API_BASE_URL}/api/upload/project-image`, {
        method: "POST",
        headers: {
          "x-admin-key": adminKey
        },
        body: formData
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Image upload failed.");
      }

      setProjectForm((prev) => ({ ...prev, image: result.data.url }));
      setProjectImageFile(null);
      setSuccess("Project image uploaded.");
    } catch (error) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const submitProject = async (event) => {
    event.preventDefault();
    try {
      setSavingProject(true);
      const payload = {
        ...projectForm,
        techStack: projectForm.techStack.split(",").map((item) => item.trim()).filter(Boolean),
        features: projectForm.features.split(",").map((item) => item.trim()).filter(Boolean)
      };

      if (editingProjectId) {
        await apiRequest(`/api/projects/${editingProjectId}`, {
          method: "PUT",
          headers: adminHeaders,
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/api/projects", {
          method: "POST",
          headers: adminHeaders,
          body: JSON.stringify(payload)
        });
      }

      clearProjectForm();
      await loadDashboard();
      setSuccess("Project saved.");
    } catch (error) {
      setError(error.message);
    } finally {
      setSavingProject(false);
    }
  };

  const editProject = (project) => {
    setActiveTab("projects");
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      image: project.image || "",
      techStack: (project.techStack || []).join(", "),
      features: (project.features || []).join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || ""
    });
    setProjectImageFile(null);
  };

  const removeProject = async (id) => {
    try {
      await apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey }
      });
      await loadDashboard();
      setSuccess("Project deleted.");
    } catch (error) {
      setError(error.message);
    }
  };

  const submitSkill = async (event) => {
    event.preventDefault();
    try {
      setSavingSkill(true);
      if (editingSkillId) {
        await apiRequest(`/api/skills/${editingSkillId}`, {
          method: "PUT",
          headers: adminHeaders,
          body: JSON.stringify(skillForm)
        });
      } else {
        await apiRequest("/api/skills", {
          method: "POST",
          headers: adminHeaders,
          body: JSON.stringify(skillForm)
        });
      }

      clearSkillForm();
      await loadDashboard();
      setSuccess("Skill saved.");
    } catch (error) {
      setError(error.message);
    } finally {
      setSavingSkill(false);
    }
  };

  const editSkill = (skill) => {
    setActiveTab("skills");
    setEditingSkillId(skill._id);
    setSkillForm({
      category: skill.category || "",
      name: skill.name || ""
    });
  };

  const removeSkill = async (id) => {
    try {
      await apiRequest(`/api/skills/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey }
      });
      await loadDashboard();
      setSuccess("Skill deleted.");
    } catch (error) {
      setError(error.message);
    }
  };

  const removeContact = async (id) => {
    try {
      await apiRequest(`/api/contact/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey }
      });
      await loadDashboard();
      setSuccess("Contact deleted.");
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminKey");
    setAdminKey("");
    setAuthorized(false);
    setStatus({ type: "", message: "Logged out." });
  };

  if (!authorized) {
    return (
      <main className="admin-page">
        <div className="container admin-login-wrap">
          <div className="admin-login-card">
            <h1>Admin Panel</h1>
            <p>Sign in with your admin key to manage messages, projects, and skills.</p>
            <input
              className="input"
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Admin key"
            />
            <div className="admin-login-actions">
              <button className="btn btn-primary" onClick={verifyAdmin}>
                Login
              </button>
              <Link to="/" className="btn btn-outline">
                Back to Portfolio
              </Link>
            </div>
            {status.message ? (
              <p className={status.type === "error" ? "status-msg status-error" : "status-msg status-success"}>
                {status.message}
              </p>
            ) : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Content Dashboard</h1>
            <p className="admin-subtitle">Manage all portfolio content from one place.</p>
          </div>
          <div className="admin-header-actions">
            <button className="btn btn-outline" onClick={loadDashboard} disabled={loadingDashboard}>
              {loadingDashboard ? "Refreshing..." : "Refresh"}
            </button>
            <Link to="/" className="btn btn-outline">
              View Portfolio
            </Link>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <section className="admin-stats">
          <article className="admin-stat-card">
            <p>Messages</p>
            <h3>{contacts.length}</h3>
          </article>
          <article className="admin-stat-card">
            <p>Projects</p>
            <h3>{projects.length}</h3>
          </article>
          <article className="admin-stat-card">
            <p>Skills</p>
            <h3>{skills.length}</h3>
          </article>
        </section>

        {status.message ? (
          <p className={status.type === "error" ? "status-msg status-error admin-status" : "status-msg status-success admin-status"}>
            {status.message}
          </p>
        ) : null}

        <div className="admin-tabs">
          <button
            className={activeTab === "contacts" ? "admin-tab-btn active" : "admin-tab-btn"}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
          <button
            className={activeTab === "projects" ? "admin-tab-btn active" : "admin-tab-btn"}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={activeTab === "skills" ? "admin-tab-btn active" : "admin-tab-btn"}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>
        </div>

        {activeTab === "contacts" ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>Contact Messages</h2>
              <p>Review and clean up incoming messages.</p>
            </div>
            <div className="admin-list">
              {contacts.map((contact) => (
                <article key={contact._id} className="admin-item admin-message-item">
                  <div>
                    <h3>{contact.name}</h3>
                    <p className="admin-meta">{contact.email}</p>
                    <p className="admin-meta">{formatDate(contact.createdAt)}</p>
                    <p>{contact.message}</p>
                  </div>
                  <button className="btn btn-danger" onClick={() => removeContact(contact._id)}>
                    Delete
                  </button>
                </article>
              ))}
              {contacts.length === 0 ? <p className="empty-state">No contact messages yet.</p> : null}
            </div>
          </section>
        ) : null}

        {activeTab === "projects" ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>{editingProjectId ? "Edit Project" : "Create Project"}</h2>
              <p>Upload image, save details, and manage project cards.</p>
            </div>

            <div className="admin-split">
              <form onSubmit={submitProject} className="admin-form">
                <div className="field admin-field">
                  <label htmlFor="project-title">Project Title</label>
                  <input
                    id="project-title"
                    className="input"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectInput}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-category">Category</label>
                  <input
                    id="project-category"
                    className="input"
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectInput}
                    placeholder="Web App, Full Stack, etc."
                    required
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-description">Description</label>
                  <textarea
                    id="project-description"
                    className="input"
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectInput}
                    placeholder="Write a short summary of the project"
                    required
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-image-url">Image URL</label>
                  <input
                    id="project-image-url"
                    className="input"
                    name="image"
                    value={projectForm.image}
                    onChange={handleProjectInput}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="image-upload-row">
                  <div className="field admin-field">
                    <label htmlFor="project-image-file">Upload Image File</label>
                    <input
                      id="project-image-file"
                      className="input"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(event) => setProjectImageFile(event.target.files?.[0] || null)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    disabled={uploadingImage}
                    onClick={uploadProjectImage}
                  >
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
                {projectForm.image ? (
                  <img className="admin-image-preview" src={projectForm.image} alt="Project preview" />
                ) : null}
                <div className="field admin-field">
                  <label htmlFor="project-tech-stack">Tech Stack</label>
                  <input
                    id="project-tech-stack"
                    className="input"
                    name="techStack"
                    value={projectForm.techStack}
                    onChange={handleProjectInput}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-features">Features</label>
                  <input
                    id="project-features"
                    className="input"
                    name="features"
                    value={projectForm.features}
                    onChange={handleProjectInput}
                    placeholder="Authentication, dashboard, analytics"
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-github-url">GitHub URL</label>
                  <input
                    id="project-github-url"
                    className="input"
                    name="githubUrl"
                    value={projectForm.githubUrl}
                    onChange={handleProjectInput}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="field admin-field">
                  <label htmlFor="project-live-url">Live URL</label>
                  <input
                    id="project-live-url"
                    className="input"
                    name="liveUrl"
                    value={projectForm.liveUrl}
                    onChange={handleProjectInput}
                    placeholder="https://project-demo.com"
                  />
                </div>
                <div className="admin-form-actions">
                  <button className="btn btn-primary" type="submit" disabled={savingProject}>
                    {savingProject ? "Saving..." : editingProjectId ? "Update Project" : "Add Project"}
                  </button>
                  {editingProjectId ? (
                    <button type="button" className="btn btn-outline" onClick={clearProjectForm}>
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="admin-list">
                {projects.map((project) => (
                  <article key={project._id} className="admin-item">
                    <div>
                      <h3>{project.title}</h3>
                      <p className="admin-meta">{project.category}</p>
                      <p>{project.description}</p>
                    </div>
                    <div className="admin-item-actions">
                      <button className="btn btn-outline" onClick={() => editProject(project)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => removeProject(project._id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
                {projects.length === 0 ? <p className="empty-state">No projects available.</p> : null}
              </div>
            </div>
          </section>
        ) : null}

        {activeTab === "skills" ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>{editingSkillId ? "Edit Skill" : "Create Skill"}</h2>
              <p>Manage skill categories and items shown on the portfolio.</p>
            </div>

            <div className="admin-split skill-split">
              <form onSubmit={submitSkill} className="admin-form">
                <input className="input" name="category" value={skillForm.category} onChange={handleSkillInput} placeholder="Category" required />
                <input className="input" name="name" value={skillForm.name} onChange={handleSkillInput} placeholder="Skill name" required />
                <div className="admin-form-actions">
                  <button className="btn btn-primary" type="submit" disabled={savingSkill}>
                    {savingSkill ? "Saving..." : editingSkillId ? "Update Skill" : "Add Skill"}
                  </button>
                  {editingSkillId ? (
                    <button type="button" className="btn btn-outline" onClick={clearSkillForm}>
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="admin-list">
                {skills.map((skill) => (
                  <article key={skill._id} className="admin-item">
                    <div>
                      <h3>{skill.name}</h3>
                      <p className="admin-meta">{skill.category}</p>
                    </div>
                    <div className="admin-item-actions">
                      <button className="btn btn-outline" onClick={() => editSkill(skill)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => removeSkill(skill._id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
                {skills.length === 0 ? <p className="empty-state">No skills available.</p> : null}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default AdminPage;
