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
- hosting on aws nodejs server

## TODO

#### User
- add kakao signin/signup

#### Work
- fix work detail page (detailed work description, deleting and editing work)

## Done
- HOC to protect pages from [un]authenticated users
- add social login linking to existing account
- add user profile page
- restrict work creation to admin users
- add user detailed profile data (phone number, address, etc.)
- add user delete in profile page
- add user privilege (admin, employee, etc...)
- add google signup and smooth signin/signup
- add enrollment of work (only admin could see)
- abstraction of how users are displayed
- migrate frontend features (direct db handling) to cloud functions
- add firestore rules
- change alert to toastify
- firebase deploy (hosting only supports static files so that aws is needed)
