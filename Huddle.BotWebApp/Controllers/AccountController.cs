﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security;

namespace Huddle.BotWebApp.Controllers
{
    public class AccountController : Controller
    {
        public void SignIn(string redirectUri = "/")
        {
            // Send an OpenID Connect sign-in request.
            //if (!Request.IsAuthenticated)
            //{
                HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = redirectUri },
                    OpenIdConnectAuthenticationDefaults.AuthenticationType);
            //}
        }

        public ActionResult SignInCallback()
        {
            return View();
        }

        public void SignOut()
        {
            string callbackUrl = Url.Action("SignOutCallback", "Account", routeValues: null, protocol: Request.Url.Scheme);

            HttpContext.GetOwinContext().Authentication.SignOut(
                new AuthenticationProperties { RedirectUri = callbackUrl },
                OpenIdConnectAuthenticationDefaults.AuthenticationType, CookieAuthenticationDefaults.AuthenticationType);
        }

        public ActionResult SignOutCallback()
        {
            if (Request.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                return RedirectToAction("Index", "Home");
            }

            return View();
        }
    }
}