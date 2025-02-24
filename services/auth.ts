import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/config/firebaseConfig";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getFirebaseAuthErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "The email address is not valid. Please enter a valid email.";
    case "auth/email-already-in-use":
      return "The email address is already in use. Please use another email.";
    case "auth/user-not-found":
      return "No user found with this email. Please check and try again.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/requires-recent-login":
      return "Please log in again to complete this action.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email, but different sign-in credentials.";
    case "auth/invalid-credential":
      return "The provided credential is not valid. Please try again.";
    case "auth/invalid-verification-code":
      return "The verification code is invalid or has expired.";
    case "auth/invalid-verification-id":
      return "The verification ID is invalid.";
    case "auth/popup-closed-by-user":
      return "The popup was closed before completing the sign in.";
    case "auth/credential-already-in-use":
      return "This credential is already associated with another account.";
    case "auth/provider-already-linked":
      return "This provider is already linked to your account.";
    case "auth/unverified-email":
      return "Please verify your email before proceeding.";
    case "auth/invalid-action-code":
      return "The action code is invalid or expired.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
};
