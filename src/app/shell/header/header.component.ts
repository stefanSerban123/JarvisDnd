import { Component, OnInit, Optional } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.logoutOfSocial().then(() => {
      this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    });
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  async logoutOfSocial() {
    return await signOut(this.auth);
  }
}
