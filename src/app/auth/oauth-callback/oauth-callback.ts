import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Authservice } from '../authservice';


@Component({
  selector: 'app-oauth-callback',
  standalone: false,
  templateUrl: './oauth-callback.html',
  styleUrl: './oauth-callback.scss'
})
export class OauthCallback {

   constructor(
    private route: ActivatedRoute,
    private authservice: Authservice
  ) {}

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];
      const picture = params['picture'];
      const error = params['error'];

      if (error) {
        alert('Authentication failed. Please try again.');
        window.location.href = '/';
        return;
      }

      if (token && email) {
        this.authservice.handleOAuthCallback(token, email,picture);
      } else {
        alert('error');
        window.location.href = '/';
      }
    });
  }

}
