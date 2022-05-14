import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [test, setTest] = useState([
    { description: "Trying a new entry", id: 1, name: "Full-Stack App" },
    { description: "Next entry", id: 2, name: "Dev Stuff App" },
  ]);
  //   const [description, setDescription] = useState("");
  //   const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    axios
      .get("/api/project")
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, please delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/project/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Project was deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchProjectList();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete was unsuccessful",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">
          SymfonyPMAPP - Project Manager App
        </h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/create">
              Create New Project
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th width="240px">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project) => {
                  return (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        <Link
                          to={`/show/${project.id}`}
                          className="btn btn-outline-info mx-1"
                        >
                          Show
                        </Link>
                        <Link
                          to={`/edit/${project.id}`}
                          className="btn btn-outline-info mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="btn btn-outline-danger mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectList;
