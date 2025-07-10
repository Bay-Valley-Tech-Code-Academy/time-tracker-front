import UserTable from "./user-table";

const CreateUserPage = () => {
  function toggleDialog(){
    
  }
  return (
    <div>
      <h1>Create User Page</h1>
      <dialog id="formDialog">
        <form method="dialog">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </dialog>

      <button type="button" onClick={toggleDialog}>Create User</button>
      
      <UserTable />
    </div>
  );
};

export default CreateUserPage;