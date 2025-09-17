import React from "react";
import axios from "axios";

interface Project {
    _id?: string;
    name: string;
    trackedHours: number;
}

const ProjectsPage = () => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    const [projects, setProjects] = React.useState<Project[]>([]);
    const [projectName, setProjectName] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    function showDialog() {
        dialogRef.current?.showModal();
    }

    function closeDialog() {
        dialogRef.current?.close();
        setProjectName("");
    }

    // Get existing projects when the component mounts
    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found. Please log in!");
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/projects', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }); setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const addProject = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found. Please log in!");
                return;
            }

            const response = await axios.post("http://localhost:5000/api/projects/create", {
                name: projectName,
                trackedHours: 0
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            setProjects([...projects, response.data]);
            closeDialog();
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to create project!';
                console.error("Failed to create project:", errorMessage);
                alert(errorMessage);
            } else {
                console.error("An unknown error occurred:", error);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <button onClick={showDialog}>Create</button>
            <dialog ref={dialogRef}>
                <form onSubmit={addProject}>
                    <label htmlFor="pname">Project Name:</label>
                    <input
                        type="text"
                        id="pname"
                        name="pname"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    >
                    </input>
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Project"}
                    </button>
                    <button type="button" onClick={closeDialog}>Close</button>
                </form>
            </dialog>

            <h2>Current Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.name}</td>
                                <td>{project.trackedHours}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No projects</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )

};
export default ProjectsPage;
