import { Appwrite, Models } from 'appwrite';

type TPatient = {
  documentType: string;
  documentNumber: string;
  birthDate: string;
  gender: string;
  phoneNumbers: string[];
  province: string;
  canton: string;
  district: string;
  userId: string;
};

const SERVER = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  collectionID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
  patientCollectionID: process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID
};

const api = {
  sdk: null,

  provider: (): Appwrite => {
    if (api.sdk) {
      return api.sdk;
    }
    const appwrite = new Appwrite();
    appwrite.setEndpoint(SERVER.endpoint).setProject(SERVER.project);
    api.sdk = appwrite;
    return appwrite;
  },

  createAccount: (unique, email, password, name) => {
    return api.provider().account.create(unique, email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email: string, password: string): Promise<Models.Session> => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (collectionId, data, read, write) => {
    return api.provider().database.createDocument(collectionId, data, read, write);
  },

  listDocuments: collectionId => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api.provider().database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },

  restorePassword: (email: string): Promise<Models.Preferences> => {
    return api
      .provider()
      .account.createRecovery(email, `${window.location.origin}/recover_password/change_password`);
  },

  restorePasswordConfirmation: (
    userId: string,
    secret: string,
    password: string,
    passwordVerify: string
  ): Promise<Models.Token> => {
    return api.provider().account.updateRecovery(userId, secret, password, passwordVerify);
  },

  createPatient: (patient: TPatient): Promise<Models.Document> => {
    const { patientCollectionID } = SERVER;
    return api
      .provider()
      .database.createDocument(
        patientCollectionID,
        'unique()',
        patient,
        ['role:all'],
        ['user:[USER_ID]']
      );
  }
};

export default api;
