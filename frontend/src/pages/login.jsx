const Login = () => {
  return (
    <form className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </div>
    </form>
  );
};

export default Login;
