import React, {useState} from "react";
import UserTable from "./user-table";

const CreateUserPage = () => {
  interface DialogProps {
    onSubmit: () => void;
  }

  const DialogComponent: React.FC<DialogProps> = ({ onSubmit }) => {
    return (
    <div>
      <div className="dialog-overlay">
        <h1>Add User</h1>
        <div className="dialog-content">
        <form method="dialog">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <button type="submit" onClick={onSubmit}>Submit</button>
        </form>
        </div>
      </div>

    <button type="button" onClick={toggleDialog}>Create User</button> 
    <UserTable />
    </div>
    )
  };

  function toggleDialog(){
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
      setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setIsDialogOpen(false);
    };

    return(
      <div>
        <button onClick={handleOpenDialog}>Create User</button>
        {isDialogOpen && <DialogComponent onSubmit={handleCloseDialog} />}
      </div>
    )
  }
};
export default CreateUserPage;