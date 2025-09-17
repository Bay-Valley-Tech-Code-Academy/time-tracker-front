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
                const response = await axios.get("http://localhost:5000/api/projects");
                setProjects(response.data);
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

            const response = await axios.post("http://localhost:5000/api/projects/create", {
                name: projectName,
                trackedHours: 0
            });

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
        <div className="min-h-screen flex flex-col items-center justify-start bg-[#FFFFD9] p-6">
            {/* Create Button */}
            <button
                onClick={showDialog}
                className="mb-6 px-5 py-2 rounded-lg bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28]"
            >
                Create
            </button>

            {/* Dialog */}
            <dialog
                ref={dialogRef}
                className="p-6 rounded-xl shadow-lg bg-[#FCAE49] border border-[#A1A1A1]"
            >
                <form onSubmit={addProject} className="flex flex-col gap-4">
                <label
                    htmlFor="pname"
                    className="text-gray-900 font-semibold"
                >
                    Project Name:
                </label>
                <input
                    type="text"
                    id="pname"
                    name="pname"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                    className="p-2 rounded-md border border-[#A1A1A1] bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
                />

                <div className="flex gap-3">
                    <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28] disabled:opacity-60"
                    >
                    {loading ? "Adding..." : "Add Project"}
                    </button>
                    <button
                    type="button"
                    onClick={closeDialog}
                    className="px-4 py-2 rounded-md bg-gray-400 text-white font-semibold shadow-md hover:bg-gray-500"
                    >
                    Close
                    </button>
                </div>
                </form>
            </dialog>

            {/* Current Projects */}
            <div className="w-full max-w-3xl mt-8 p-6 rounded-xl shadow-lg bg-[#A1A1A1]">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Current Projects</h2>
                <table className="w-full border border-[#A1A1A1] rounded-lg overflow-hidden">
                <thead className="bg-[#FFECB3]">
                    <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-[#A1A1A1]">
                        Project Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-[#A1A1A1]">
                        Total Hours
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {projects.length > 0 ? (
                    projects.map((project) => (
                        <tr key={project._id} className="hover:bg-[#FFF8E1]">
                        <td className="py-3 px-4 border-b border-[#A1A1A1] text-gray-900">
                            {project.name}
                        </td>
                        <td className="py-3 px-4 border-b border-[#A1A1A1] text-gray-900">
                            {project.trackedHours}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td
                        colSpan={2}
                        className="py-3 px-4 border-b border-[#A1A1A1] text-center text-gray-600"
                        >
                        No projects
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    )

};
export default ProjectsPage;
