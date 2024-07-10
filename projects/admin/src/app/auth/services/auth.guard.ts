import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  let isAuthenticated = false;

  const user = await new Promise((resolve) =>
    auth.onAuthStateChanged((user) => resolve(user))
  );
  if (user) {
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};
