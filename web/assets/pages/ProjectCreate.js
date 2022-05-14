import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

const ProjectCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    axios
      .post("/api/project", formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Project saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsSaving(false);
        setName("");
        setDescription("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout className="projectCreate">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Create New Project</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/">
              View All Projects
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  value={description}
                  type="text"
                  className="form-control"
                  id="description"
                  rows="4"
                  name="description"
                ></textarea>
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="buttton"
                className="btn btn-outline-primary mt-3"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectCreate;
