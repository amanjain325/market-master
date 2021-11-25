import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable()

export class AuthService {
    userData: User;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        private localStorageService: LocalStorageService,
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                this.localStorageService.set('user', this.userData);
            } else {
                this.localStorageService.set('user', null);
            }
        })
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.router.navigateByUrl('/tabs/home');
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign 
                up and returns promise */
                result.user.sendEmailVerification();
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // need to check this later    
    // Send email verfificaiton when new user sign up
    // SendVerificationMail() {
    //     return this.afAuth.currentUser.sendEmailVerification()
    //         .then(() => {
    //             this.router.navigate(['verify-email-address']);
    //         })
    // }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Returns true when user is looged in and email is verified
    get loggedInUser(): any {
        return this.localStorageService.get('user');
        // return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                this.router.navigateByUrl('/tabs/home');
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error)
            })
    }

    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    SignOut() {
        return this.afAuth.signOut().then(() => {
            this.localStorageService.delete('user');
            this.router.navigate(['login']);
        })
    }

}