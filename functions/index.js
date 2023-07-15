// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {getAuth} = require("firebase-admin/auth");
const {FieldValue} = require("@google-cloud/firestore");

initializeApp();
const db = getFirestore();

exports.applyWork = onCall((req) => {
    if (req.auth == null) {
        logger.warn("No Auth in request");
        throw new HttpsError("permission-denied", "Forbidden. Authentication required.");
    }

    if (req.data.docId == null) {
        logger.warn("No docId in request");
        throw new HttpsError("not-found", "DocId required.");
    }

    const docId = req.data.docId;

    getAuth().getUser(req.auth.uid).then(async (user) => {
        const docRef = db.doc("work_detail/" + docId);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.error("Requesting invalid work doc id: " + docId);
            throw new HttpsError("not-found", "Not found. docId: " + docId);
        } else {
            const disp = getUserDisplay(user);
            logger.info("Updating user " + disp);
            await docRef.update({
                [`employeeApplicant.${req.auth.uid}`]: disp,
            }).then(() => {
                return {status: true};
            }).catch((error) => {
                throw new HttpsError("aborted", "Could not saved work doc. docId: " + docId);
            });
        }
    }).catch((error) => {
        throw new HttpsError("not-found", "Could not found user. uid: " + req.auth.uid);
    });
});

exports.quitWork = onCall((req) => {
    if (req.auth == null) {
        logger.warn("No Auth in request");
        throw new HttpsError("permission-denied", "Forbidden. Authentication required.");
    }

    if (req.data.docId == null) {
        logger.warn("No docId in request");
        throw new HttpsError("not-found", "DocId required.");
    }

    const docId = req.data.docId;
    logger.info("uid: " + req.auth.uid + " docId: " + docId);

    getAuth().getUser(req.auth.uid).then(async (user) => {
        const docRef = db.collection("work_detail").doc(docId);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.error("Requesting invalid work doc id: " + docId);
            throw new HttpsError("not-found", "Not found. docId: " + docId);
        } else {
            await docRef.update({
                [`employeeApplicant.${req.auth.uid}`]: FieldValue.delete(),
            }).then(() => {
                return {status: true};
            }).catch((error) => {
                throw new HttpsError("aborted", "Could not saved work doc. docId: " + docId);
            });
        }
    }).catch((error) => {
        throw new HttpsError("not-found", "Could not found user. uid: " + req.auth.uid + " error: " + error.message);
    });
});


// eslint-disable-next-line require-jsdoc
function getUserDisplay(user) {
    return user?.displayName ?? user?.email ?? "Unknown User";
}
