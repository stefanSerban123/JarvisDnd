import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Database, objectVal, ref, list, push, object, set } from '@angular/fire/database';
import { environment } from '@env/environment';
import { Logger, UntilDestroy } from '@shared';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, GoogleAuthProvider, User, authState, signInAnonymously, signInWithPopup, signOut } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { JarvisUser } from '@app/@shared/models/user';

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
  jarvisUser: JarvisUser | undefined;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private database: Database) {

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
        this.jarvisUser = new JarvisUser(u);
        const doc = ref(this.database, 'Users/' + this.jarvisUser.uid);

        object(doc).subscribe((v: any) => {
          console.log(v.snapshot.val());

          // kind of an "auto register"
          if (!v.snapshot.val()) {
            set(doc, { name: this.jarvisUser?.displayName, email: this.jarvisUser?.email, uid: this.jarvisUser?.uid , photoUrl: this.jarvisUser?.photoURL});
          }

          this.authenticationService.login({ username: u.email, userId: u.uid, remember: false }).subscribe(() => {
            this.router.navigate(['home', { replaceUrl: true }]);
          });
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

