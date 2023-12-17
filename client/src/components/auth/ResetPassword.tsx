import { useSearchParams } from "react-router-dom";
import { confirmresetpassword } from "../../api/auth.js";

const ResetPassword = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const doResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const oobCode = searchParams.get("oobCode") || "";
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    confirmresetpassword(oobCode, password);
  };
  return (
    <form onSubmit={doResetPassword}>
      <label>
        <input id="password" type="password" placeholder="password" />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
