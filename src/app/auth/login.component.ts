import { Component, OnDestroy, OnInit, Optional } from '@angular/core';

import { environment } from '@env/environment';
import { Logger, UntilDestroy } from '@shared';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, GoogleAuthProvider, User, authState, signInAnonymously, signInWithPopup, signOut } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  isLoading = false;

  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth, 
    private authenticationService: AuthenticationService,
    private router: Router) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { 
    this.user.subscribe((u: any) => {
      if (!!u) {
        this.authenticationService.login({ username: u.email, userId: u.uid, remember: false }).subscribe(() => {
          this.router.navigate(['home', { replaceUrl: true }]);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }

  // ngOnInit() {
  //   this.socialAuthService.authState.subscribe((user: SocialUser) => {
  //     this.user = user;

  //     if (user != null) {
  //       this.authenticationService.login({ username: this.user.name, userId: this.user.idToken, remember: false }).subscribe(() => {
  //         this.router.navigate(['home', { replaceUrl: true }]);
  //       });
  //       // this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
  //     }
  //   });
  // }
}

