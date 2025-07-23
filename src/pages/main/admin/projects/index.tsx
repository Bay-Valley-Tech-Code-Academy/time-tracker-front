import React from "react";

const ProjectsPage = () => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    function showDialog() {
        dialogRef.current?.showModal();
    }

    function closeDialog() {
        dialogRef.current?.close();
    }

    return (
        <div>
            <button onClick={showDialog}>Create</button>
            <dialog ref={dialogRef}>
                <form>
                    <label htmlFor="pname">Project Name:</label>
                    <input
                        type="text"
                        id="pname"
                        name="pname">
                    </input>
                    <button>Add Project</button>
                    <button onClick={closeDialog}>Close</button>
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
                    {/* These are placeholders and have to be changed later */}
                    <tr>
                        <td>Placeholder</td>
                        <td>1000</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )

};
export default ProjectsPage;
