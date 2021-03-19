import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { from, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { user } from "../../models/auth/user";
import { AuthUtils } from "./auth.utils";
import { AuthToken } from "./guards/auth.token";


@Injectable()
export class AuthService
{
  private _authenticated: boolean;


  /**
   *
   */
  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
    this._authenticated = false;

  }


   /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('access_token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token');
    }
/**
     * Check the authentication status
     */
 check(): Observable<boolean>
 {
     // Check if the user is logged in
     if ( this._authenticated )
     {
         return of(true);
     }

     // Check the access token availability
     if ( !this.accessToken )
     {
         return of(false);
     }

     // Check the access token expire date
     if ( AuthUtils.isTokenExpired(this.accessToken) )
     {
         return of(false);
     }

     // // If the access token exists and it didn't expire, sign in using it
     return this.signInUsingToken();
 }

 /**
     * Sign in
     *
     * @param credentials
     */
  signIn(credentials: user): Observable<any>
  {
    // Throw error, if the user is already logged in
    if ( this._authenticated )
    {
      return throwError('User is already logged in.');
    }
    let encodePassword:string = new AuthToken().encodePassword(credentials.password);
    console.log(encodePassword);

    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, encodePassword))
    .pipe(
      map(credential => credential.user),
      tap(user => {
        this.accessToken = new AuthToken().generateJWTToken();
        this._authenticated = true;
        console.log(this._authenticated);

      }),
      catchError((error, obs)=>{
        console.log(error);

        return throwError(error);
      })
    );
  }

  /**
   * Sign Un
   *
   * @param credentials
   */
   signUp(credentials: {name: string, email: string, password: string, company: string }): Observable<any>
   {
     // Throw error, if the user is already logged in
     let encodePassword:string = new AuthToken().encodePassword(credentials.password);
     console.log(encodePassword);

     return from(this.afAuth.createUserWithEmailAndPassword (credentials.email, encodePassword))
     .pipe(
       map(credential => credential.user),
       tap(user => {
         this.afs.collection(`users`).doc(user.uid).set({name:credentials.name, company:credentials.company},{merge:true});
         this.sendVerificationMail();
       }),
       catchError((error, obs)=>{
         return throwError(error);
       })
     );
   }
   signInGoogle(): any {
    return from(this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()))
    .pipe(
      map(credential => credential.user),
      tap(user => {
        this.accessToken = new AuthToken().generateJWTToken();
        this._authenticated = true;
      }),
      catchError((error, obs)=>{
        return throwError(error);
      })
    );
  }

       // Send email verfificaiton when new user sign up
       async sendVerificationMail() {
        (await this.afAuth.currentUser).sendEmailVerification().then(() => {
            console.log('email sent');
            this.router.navigate(['confirmation-required']);
      });
      }
 /**
     * Sign in using the access token
     */
  signInUsingToken(): Observable<any>
  {
    let verifyToken:boolean = new AuthToken().verifyJWTToken(this.accessToken);
    if(verifyToken){
      this.accessToken = new AuthToken().generateJWTToken();
      this._authenticated = true;
      return of(true);
    }else{
      return of(false);
    }
  }

  signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }
}
