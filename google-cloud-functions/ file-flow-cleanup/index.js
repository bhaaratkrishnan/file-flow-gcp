  /**
   * @typedef {Object} urlsSchemaFs
   * @property {Object} timeStamp - Object containing timestamp details
   * @property {number} timeStamp._seconds - Timestamp seconds
   * @property {number} timeStamp._nanoseconds - Timestamp nanoseconds
   * @property {string} fileUrl - File URL
   * @property {string} fileGsUrl - File Google Cloud Storage URL
   * @property {string} fileName - File name
   * @property {string} fileType - File type
   */

  /**
   * @typedef {Object} userSchemaFs
   * @property {number} count - Number of file flows
   * @property {string[]} fileFlows - Array of file flow IDs
   * @property {Object} timeStamp - Object containing timestamp details
   * @property {number} timeStamp._seconds - Timestamp seconds
   * @property {number} timeStamp._nanoseconds - Timestamp nanoseconds
   */

  /**
   * @typedef {Object} userSchemaWithIdFs
   * @property {string} id - User ID
   * @property {userSchemaFs} - User schema properties
   */
  const functions = require('@google-cloud/functions-framework');
  const { Firestore } = require("@google-cloud/firestore");
  
  functions.http('helloHttp', async (req, res) => {
  
    const firestore = new Firestore();
  
    /**
     * Gets all users from Firestore and checks for valid links.
     * @returns {Promise<{ status: 200 }>} A promise resolving to an object with status 200.
     */
    // Get all users
    const allUsersSnapshot = await firestore.collection("user").get();
  
    /** @type {userSchemaWithIdFs[]} */
    const allUsers = allUsersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    // Iterate over each user and check if the links are valid
    for (const user of allUsers) {
      const currentTime = new Date();
      const userFileFlows = user.fileFlows;
  
      for (const fileFlow of userFileFlows) {
        const fileFlowSnapshot = await firestore
          .collection("urls")
          .doc(fileFlow)
          .get();
  
        /** @type {urlsSchemaFs | undefined} */
        const fileFlowData =
          fileFlowSnapshot.data() === undefined
            ? undefined
            : fileFlowSnapshot.data();
  
        if (
          fileFlowData === undefined ||
          fileFlowData.timeStamp._seconds < currentTime.getTime() / 1000
        ) {
          // Delete the file
          firestore.collection("urls").doc(fileFlow).delete();
  
          // Delete the url from the user
          const userDoc = firestore.collection("user").doc(user.id);
          user.fileFlows = user.fileFlows.filter((flow) => flow !== fileFlow);
          user.count = user.fileFlows.length;
          await userDoc.update({ fileFlows: user.fileFlows, count: user.count });
        }
      }
    }
    res.send(`Success`);
  });
  