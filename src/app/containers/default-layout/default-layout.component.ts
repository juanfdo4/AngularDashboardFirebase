import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  /**
   *
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    public _router: Router,
  ) {

  }
  Logout():void{
    console.log('Logout');

    this._authService.signOut()
          .subscribe((data) => {
            console.log('signOut');

              const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/login';
              // Navigate to the redirect url
              this._router.navigateByUrl(redirectURL);
          }, (response) => {
              console.log(response);

          });
  }
}
