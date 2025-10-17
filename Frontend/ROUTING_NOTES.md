Routing notes

What I changed
- Fixed a route-not-found caused by a casing mismatch between route checks and actual folder name.
  - The app has an auth group folder named `(Auth)` with a capital A.
  - Some code was redirecting to `/(auth)/login` (lowercase) which caused the router to not find the route.
- Updated `app/_layout.jsx` to normalize segments and redirect to `/(Auth)/login` when necessary.
- Updated navigation calls in `app/(Auth)/login.jsx` and `app/(Auth)/signUp.jsx` to use `/(Auth)/...` paths.

Why this happened
- expo-router uses filesystem routing. Folder and file names are significant and must match the path used with `router.push()`/`replace()`.
- The checks in `_layout.jsx` compared segments strictly and expected `(auth)` lowercase which didn't match the actual folder name `(Auth)`.

Files edited
- `app/_layout.jsx` — normalized segments and used `(Auth)` when redirecting to login.
- `app/(Auth)/login.jsx` — changed `router.push("/(auth)/signup")` to `router.push("/(Auth)/signup")`.
- `app/(Auth)/signUp.jsx` — changed `router.replace("/(auth)/login")` to `router.replace("/(Auth)/login")`.

Next steps / Suggestions
- Standardize folder naming: prefer either all-lowercase `(auth)` or keep `(Auth)` but always reference it consistently in code.
- Add a small test or runtime assertion in startup (in `_layout.jsx`) that logs available route groups (segments) to help debug future routing issues.
- Wire authentication token to router navigation more explicitly:
  - After `login(token)`, call `router.replace('/(tabs)')` where appropriate so users get sent straight to the app.
  - After `logout()`, call `router.replace('/(Auth)/login')`.
- Consider adding an ESLint/Prettier setup and a `lint` script in `Frontend/package.json` to catch these mistakes earlier.

How to reproduce the original error
1. Build/run the app (expo) and ensure AsyncStorage does not have `userToken`.
2. The app will attempt to redirect to `/(auth)/login` which previously didn't exist, causing "route not found".

If anything still errors, paste the exact runtime error text here and I'll dig deeper.
