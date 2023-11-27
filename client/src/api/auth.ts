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
    confirmPasswordReset
  } from 'firebase/auth';
import axios from 'axios';

const signup = async (email: string, username: string, password: string) => { //create
    const auth = getAuth(); 
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {username: username});
    const {data} = await axios.post('http://localhost:8000/user_api/add_user', {username: username, uid: auth.currentUser.uid});
    if(!data) throw 'Problem adding user to database';

    console.log(`Signup successful for ${username}`);
}

const signin = async (email: string, password: string) => { //read
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Signin successful for ${email}`);
}

const changepassword = async (email: string, oldPassword: string, newPassword: string) => { //update
    const auth = getAuth();

    let credential = EmailAuthProvider.credential(email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    
    await updatePassword(auth.currentUser, newPassword);
    console.log(`Password changed for ${email}`);
    await logout();
}

const resetpassword = async (email: string) => { //update
    let auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    console.log(`Password reset email sent to ${email}`);
}

const confirmresetpassword = async (oob: string, newPass: string) => {
    await confirmPasswordReset(oob, newPass);
}

const logout = async () => { //delete
    const auth = getAuth();
    console.log(`Logout successful for ${auth.currentUser.email}`)
    await signOut(auth);
}


export { signup, signin, logout, changepassword, resetpassword, confirmresetpassword }