import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  confirmPasswordReset,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const signup = async (email: string, username: string, password: string) => {
  const auth = getAuth() as Auth;
  await createUserWithEmailAndPassword(auth, email, password);

  const user = auth.currentUser;
  if(!user) throw new Error('Error creating user');

  await updateProfile(user, { displayName: username });

  console.log(`Signup successful for ${username}`);
};

const signin = async (email: string, password: string, persistent?: boolean) => {
  const auth = getAuth() as Auth;
  await setPersistence(auth, persistent ? browserLocalPersistence : browserSessionPersistence); //default session persistence
  await signInWithEmailAndPassword(auth, email, password);
  console.log(`Signin successful for ${email}`);
};

const changepassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  const auth = getAuth() as Auth;

  const credential = EmailAuthProvider.credential(email, oldPassword);

  const user = auth.currentUser;
  if(!user) throw new Error('Error updating password');

  await reauthenticateWithCredential(auth.currentUser, credential);
  await updatePassword(auth.currentUser, newPassword);

  console.log(`Password changed for ${email}`);
  await logout();
};

const forgotpassword = async (email: string) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
  console.log(`Password reset email sent to ${email}`);
};

const resetpassword = async (oob: string, newPass: string) => {
  const auth = getAuth();
  await confirmPasswordReset(auth, oob, newPass);
  console.log(`Password reset successful`);
};

const logout = async () => {
  const auth = getAuth() as Auth;

  const user = auth.currentUser;
  if(!user) throw new Error('Error logging out');

  console.log(`Logout successful for ${auth.currentUser.email}`);
  await signOut(auth);
};

export {
  signup,
  signin,
  logout,
  changepassword,
  forgotpassword,
  resetpassword,
};
