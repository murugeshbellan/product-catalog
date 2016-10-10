# product-catalog

* Note:
Before running the application, have the mongodb started locally on port "27017".

* Running the Server:
Run below commands to get the server started.

npm install

DEBUG=product-catalog:* npm start

* Application:
To access application, type below URL in browser

https://localhost:8443/

The certificate is a self signed certificate, accept the certificate error.

To add a product - https://localhost:8443/add-product
To view products - https://localhost:8443/view-products 

To load dummy data, type below URL in browser

https://localhost:8443/load-dummy-products


* Pending:

Additional form validation.
Unit Tests
logging
