# credit-cards-detect-text

credit-cards-detect-text is an axios-dependency module that detects text from  `credit card image` file and returns:
* The Credit Card Number
* The Credit Card Expiry Date 
* The `full` detected text from the image (than you can use for your own further processing)

### Installation

- Installing via npm
    ```
    > npm install credit-cards-detect-text --save
      
      OR
  
    > npm install credit-cards-detect-text
    ```

### Example Usage

#### Create the Google API Key

Follow the instructions on how to create Google API Key for your project(https://cloud.google.com/docs/authentication/api-keys). This will
 help in authenticating your requests.

Please make sure to copy your key and keep it secure.

##### Enable Google Cloud Vision api 

> - You must enable the Vision API for your project. For more information on enabling APIs, see the [Service Usage documentation](https://cloud.google.com/service-usage/docs/enable-disable).
> - Alternatively [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=vision.googleapis.com) here.

###Integration

- In your html add the function to select or take an image of the credit card you want
  to get the detected text details from.
- Example as illustrated below using VueJS
    ```
    <input @change="handleImageSelect($event)" 
                        type="file" block accept="image/x-png,image/gif,image/jpeg,image/jpg">
    ```

- #### Using Promises
    ```
    > import * as creditCardsDetectText from "credit-cards-detect-text
    
    > handleImageSelect: function(event) {  
          // set the secret api key using this function.
          // This is the Google API Key you created above and will help in authenticating your API requests          
          creditCardsDetectText.setAPISecret({GOOGLE-API-KEY})
  
          // Either use the image event or the image file
          const selectedImage = event || event.target.files[0]
          
          creditCardsDetectText.getCardDetails(selectedImage)
              .then(response => {
                  console.log("response", JSON.stringify(response))
              }).catch((err) => {
                  console.log(err)
              })
      }
    ```

- #### Using Async Function
    ```
    > import * as creditCardsDetectText from "credit-cards-detect-text
    
    > handleImageSelect: async(event) {
          // set the secret api key using this function.
          // This is the Google API Key you created above and will help in authenticating your API requests          
          creditCardsDetectText.setAPISecret({GOOGLE-API-KEY})
  
          // Either use the image event or the image file
          const selectedImage = event || event.target.files[0]

          const response = await creditCardsDetectText.getCardDetails(selectedImage)
  
          console.log(JSON.stringify(response))
      }
    ```

### Un-installation

- To uninstall use the commands below
    ```
    > npm uninstall credit-cards-detect-text --save
      
      OR
  
    > npm uninstall credit-cards-detect-text