const CreateUserPage = () => {
  return (
    <div>
      <h1>Create User Page</h1>
      <dialog id="formDialog">
        <form method="dialog">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required></input>
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </dialog>

      <button onclick="document.getElementById('formDialog').showModal()">Create User</button>
      
      <UserTable />
    </div>
  );
};

export default CreateUserPage;