import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  auth = getAuth();

  // LOGIN
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log(userCredential);

        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        alert(err.message)
        console.log(err)
        this.router.navigate(['/login'])
      })
  }

  // REGISTER
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
        alert('register success')
        this.router.navigate(['/login'])
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
        this.router.navigate(['/register'])
      })
  }

  // LOGOUT
  logout() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    })
      .catch(err => {
        console.log(err)
      })
  }
}
