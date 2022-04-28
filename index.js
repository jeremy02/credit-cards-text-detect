import DetectTextException from './models/custom-exception'
import DetectTextFunctions from './utils/detect-text-common-functions'
import detectTextApi from './utils/detectTextAPI.js'

/*
    This is the function to get the detected text from the image uploaded
 */
async function getCardDetails(fileObject) {
    let imageFile = null // initialize the image to null

    // Check what type of object we have
    // if is an object of Event
    if(fileObject instanceof Event) {
        // Check if there is a file
        if(!fileObject.target.files) {
            throw new DetectTextException("No file was found to perform operation")
        }

        // Check if there was a file object
        if(fileObject.target.files.length < 1) {
            throw new DetectTextException("Please upload an image/file to perform operation")
        }

        // should not allow upload of more than one file
        if(fileObject.target.files.length > 1) {
            throw new DetectTextException("Only one file or image allowed to perform operation")
        }

        // initialize the image
        imageFile = fileObject.target.files[0]
    }

    // if is an object of File
    if(fileObject instanceof File) {
        // initialize the image
        imageFile = fileObject
    }

    // do we have an image file???
    if(imageFile) {
        // should not allow files that are not images
        if(!DetectTextFunctions.isFileImage(imageFile)) {
            throw new DetectTextException("Only files that are images are allowed to perform operation")
        }

        // should not allow files that are not images with the allowed extensions
        if(!DetectTextFunctions.isAllowedImageExtensions(imageFile)) {
            throw new DetectTextException("The file/image extension is not allowed to perform operation")
        }

        //  call the Google Vision Detect Text API
        try {
            const response = await detectTextApi.detectTextFromImage(imageFile)

            const responseData = DetectTextFunctions.formatDetectedText(response.data)

            return responseData
        } catch (error) {
            // The default message to return
            let message = "Could not complete detect operation on image"

            // Check if the error is a {DetectTextException} from detectTextAPI
            if(error.name == "DetectTextException" && error.errorMessage) {
                message = error.errorMessage
            }else{
                if(error.response.data.error.message) {
                    message = error.response.data.error.message
                }else{
                    message = error.message
                }
            }
            throw new DetectTextException(message.toString())
        }
    }else {
        throw new DetectTextException("No file was found to perform operation")
    }
}

/*
    This is the function used to set the api key for the OCR/ detect functions
 */
async function setAPISecret(apiKey) {
    await detectTextApi.setAPISecretKey(apiKey)
}

// a list of exported variables
export {
    getCardDetails,
    setAPISecret
}
