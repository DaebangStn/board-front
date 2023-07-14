## Getting Started

**JAVA over 11 is required to run firebase emulator**

```bash
npm install
firebase emulators:start --import=./firestore
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


If you modified firestore data and want to save it, run
```bash
firebase emulators:export ./firestore
```
**REMEMBER:** Run this command before exiting emulator

## Working
linking/page.tsx
- add social login linking to existing account

## TODO

#### User
- add user profile page
- add user detailed profile data (phone number, address, etc.)
- add user delete page
- add kakao login

#### Work
- fix work detail page (detailed work description, deleting and editing work)
- restrict work creation to admin users
- add enrollment of work (only admin could see)

## Done
- HOC to protect pages from [un]authenticated users
