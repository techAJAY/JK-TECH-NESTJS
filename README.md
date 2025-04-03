# JK-TECH-NESTJS
Project Overview: NestJS Backend User Management and Document Management.

Technologies Used: NestJS, PostgreSQL, JWT, Jest, and Python (for ingestion).



//NOTE - user & auth :
I have created user api and login apis and auth apis
Method	      Endpoint	      Description	                   Authentication
POST	    /auth/register	  Register a new user	               No
POST	    /auth/login	      Login and get access token	       No
POST	    /auth/logout	  Logout and revoke token	           Yes
GET	        /auth/me	      Get logged-in user details	       Yes


Role-Based Authorization:
Admin can update roles.
Users can only view their own data.
JWT authentication is required for protected routes.


Role Management :
Method	  Endpoint	        Description	      Allowed Role
PUT   	/users/:id/role	  Update user role	   Admin only




//NOTE - Document
I have create document upload crud


Document Management
Method	         Endpoint	          Description	            Authentication
POST	        /documents	       Upload a document	            Yes
GET	            /documents/:id	   Get a document by ID	            Yes
PUT	            /documents/:id	   Update a document	            Yes
DELETE	        /documents/:id	   Delete a document	            Yes



//NOTE - Ingestion
I have create ingestion api for python backend

Ingestion Process
Method	     Endpoint	             Description	                     Authentication
POST	    /documents/:id/ingest	Trigger ingestion in Python backend	   Yes



Unit Tests:
Service methods : user creation, role change, document upload.