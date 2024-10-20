import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {

  isLoggedIn!: boolean;
  loggedInUser!: string;

  loginService = inject(LoginService);
  router = inject(Router);

  ngOnInit() {

  this.loginService.getAuth().subscribe( auth => {
    if(auth){
      this.isLoggedIn = true;
      this.loggedInUser = auth.email ?? '';

    }else {
      this.isLoggedIn = false;
    }
  })

  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }

}
