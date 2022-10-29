# pdf-to-word-converter

- first check whether node and npm exists using this command node -v and npm -v if not then install node and install npm using command npm i npm -g.

- for backend: 

  1. Then go inside backend folder using cmd/terminal then use command npm i to install required packages.

  2. Then create a .env file inside backend folder.

  3. Then register to an api using this link (https://conversiontools.io/profile) go to dashboard and copy the given token.

  4. Create a variable inside .env file name as (API_TOKEN) and paste the value of token there. for eg API_TOKEN=YOUR_COPIED_TOKEN.

  5. Then signup on cloudinary (https://cloudinary.com) and visit on dashboard, copy cloud name, api key and api secret from it and create Variable in .env file. for eg: 
     CLOUDINARY_NAME= pase cloud name here
     CLOUDINARY_API_SECRET=paste cloudinary api secret here
     CLOUDINARY_API_KEY=paste cloudinary api key here

  6. Then run node index.js or npm start
 
- For frontend: 

  1. Run npm i
  
  2. Then run npm start
 
