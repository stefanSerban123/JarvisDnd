import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  isLoading = false;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private socialAuthService: SocialAuthService
  ) {
    
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      if (user != null) {
        this.authenticationService.login({username: 'user', password: '', remember: false}).subscribe(() => {
          this.router.navigate(['home', { replaceUrl: true }]);
        });
        // this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
      }
    });
  }

}
