import firebase from "firebase/app";
import "firebase/storage";
export const firebaseConfig = {
     apiKey: "AIzaSyCTzxSvStrY5ZLGOq-bwsObtx2l6Hw4Ib0",
     authDomain: "crmtest-36060.firebaseapp.com",
     projectId: "crmtest-36060",
     storageBucket: "crmtest-36060.appspot.com",
     messagingSenderId: "838282316916",
     appId: "1:838282316916:web:224709babc74309cfb5521",
     measurementId: "G-EZW5XNTC0E",
};
const app = firebase.initializeApp(firebaseConfig);
export const firebaseFileStorage = app.storage();
export const UploadEventsImage = async (file: File) => {
     const imageName = `${file.name}`;
     const uploadFile = await firebaseFileStorage.ref(`/events/${imageName}`).put(file);
     const uploadedFileRef = uploadFile.ref.fullPath.toString();
     const files = await firebaseFileStorage.ref(uploadedFileRef).getDownloadURL();
     return files;
};

export const RemoveUploadedImage = async (imageName: string) => {
     const deleteFile = await firebaseFileStorage.ref(`/events/${imageName}`).delete();
     return deleteFile;
};

export const UploadBlogImage = async (file: File) => {
     const imageName = `${file.name}`;
     const uploadFile = await firebaseFileStorage.ref(`/blogs/${imageName}`).put(file);
     const uploadedFileRef = uploadFile.ref.fullPath.toString();
     const files = await firebaseFileStorage.ref(uploadedFileRef).getDownloadURL();
     return files;
};

export const UploadGalleryImage = async (file: File) => {
     const imageName = `${file.name}`;
     const uploadFile = await firebaseFileStorage.ref(`/gallery/${imageName}`).put(file);
     const uploadedFileRef = uploadFile.ref.fullPath.toString();
     const files = await firebaseFileStorage.ref(uploadedFileRef).getDownloadURL();
     return files;
};

export const RemoveGalleryImage = async (imageName: string) => {
     const deleteFile = await firebaseFileStorage.ref(`/gallery/${imageName}`).delete();
     return deleteFile;
};

const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export function GetBytes(x: string) {
     let l = 0,
          n = parseInt(x, 10) || 0;

     while (n >= 1024 && ++l) {
          n = n / 1024;
     }

     return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

export const Upload80G = async (file: File) => {
     const pdfName = `${file.name}`;
     const uploadFile = await firebaseFileStorage.ref(`/80G/${pdfName}`).put(file);
     const uploadedFileRef = uploadFile.ref.fullPath.toString();
     const files = await firebaseFileStorage.ref(uploadedFileRef).getDownloadURL();
     return files;
};
