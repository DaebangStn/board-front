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

## TODO

#### User
- add google signup
- add kakao signin/signup

#### Work
- fix work detail page (detailed work description, deleting and editing work)
- add enrollment of work (only admin could see)

## Done
- HOC to protect pages from [un]authenticated users
- add social login linking to existing account
- add user profile page
- restrict work creation to admin users
- add user detailed profile data (phone number, address, etc.)
- add user delete in profile page
- add user privilege (admin, employee, etc...)
