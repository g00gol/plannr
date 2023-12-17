import {
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
} from "firebase/auth";
// import axios from 'axios';

const signup = async (email: string, username: string, password: string) => {
  //create
  const auth = getAuth() as any;
  // const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  // await updateProfile(userCredentials.user, {displayName: username});
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: username });

  console.log(`Signup successful for ${username}`);
};

const signin = async (email: string, password: string) => {
  //read
  const auth = getAuth() as any;
  await signInWithEmailAndPassword(auth, email, password);
  console.log(`Signin successful for ${email}`);
};

const changepassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  //update
  const auth = getAuth() as any;

  const credential = EmailAuthProvider.credential(email, oldPassword);
  await reauthenticateWithCredential(auth.currentUser, credential);

  await updatePassword(auth.currentUser, newPassword);
  console.log(`Password changed for ${email}`);
  await logout();
};

const resetpassword = async (email: string) => {
  //update
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
  console.log(`Password reset email sent to ${email}`);
};

const confirmresetpassword = async (oob: string, newPass: string) => {
  const auth = getAuth();
  await confirmPasswordReset(auth, oob, newPass);
};

const logout = async () => {
  //delete
  const auth = getAuth() as any;
  console.log(`Logout successful for ${auth.currentUser.email}`);
  await signOut(auth);
};

export {
  signup,
  signin,
  logout,
  changepassword,
  resetpassword,
  confirmresetpassword,
};
