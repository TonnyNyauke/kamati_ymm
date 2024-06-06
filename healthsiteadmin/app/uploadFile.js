import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { message } from 'react-message-popup';

const uploadFile = (file) => {
    const fileName = `${file.name}`;
    const path = `Products/${fileName}`;

    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Set up timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                console.log("Time out")
            }, 60000);
        });

        // Race the upload task promise with the timeout promise
        Promise.race([uploadTaskPromise(uploadTask), timeoutPromise])
            .then(async (result) => {
                if (result) {
                    // Upload completed successfully
                    message.info('Upload completed')
                    resolve(result);
                  } else {
                    // Timeout occurred, reject the promise
                    reject(new Error('Upload timed out'));
                  }
            })
            .catch((error) => {
                                
                message.error('Error uploading file')
                reject(error);
            })
            .finally(() => {
                console.log("Uploaded");
            });

        // Function to create promise for upload task
        function uploadTaskPromise(uploadTask) {
            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        const formUpload = {
                            isUploding: true,
                            progress: progress,
                            fileName: fileName
                        };
                        console.log(formUpload);
                    },
                    (error) => {
                        // Error occurred during upload
                        reject(error);
                    },
                    async () => {
                        try {
                            // Upload completed successfully, get download URL
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve({
                                filename: file.name,
                                progress: 100,
                                downloadURL: downloadURL
                            });
                        } catch (error) {
                            // Error occurred while retrieving download URL
                            message.error('Error while retrieving download url.')
                            reject(error);
                        }
                    }
                );
            });
        }
    });
};

export default uploadFile;