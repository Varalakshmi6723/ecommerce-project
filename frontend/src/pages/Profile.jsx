
function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <h2>Please login to view your profile</h2>;
  }

  return (
    <div className="formContainer">
      <h2>My Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
