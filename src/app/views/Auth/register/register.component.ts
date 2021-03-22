import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { user } from '../../../models/auth/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  message: any;
    user:user = new user;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    public _router: Router,
  ) {

    this.message = null;
  }

  ngOnInit(): void {
  }
  register(): void
  {
      // Hide the message
      this.message = null;

      // Sign in
      this._authService.register(this.user)
          .subscribe((data) => {
              // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
              // to the correct page after a successful sign in. This way, that url can be set via
              // routing file and we don't have to touch here.
              const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';
              // Navigate to the redirect url
              this._router.navigateByUrl(redirectURL);
          }, (response) => {
              // Show the error message
              this.message = {
                  appearance: 'outline',
                  content   : response.message,
                  shake     : true,
                  showIcon  : false,
                  type      : 'error'
              };
          });
  }
}
