# AURA

## Project Overview
This project is a comprehensive e-commerce web application designed to provide a seamless online shopping experience. Leveraging modern web development technologies and frameworks, the application offers a rich, interactive user interface and robust backend functionality.

## Live Demo
Experience AURA Web App live on Heroku: [AURA](https://ecommerce-aura-e096c9042858.herokuapp.com/)

Feel free to register an account, explore various products, and order what you want!

## Key Features
- User Authentication: Secure login, registration, and logout functionality.
- User Profile Page: Allows users to update their information and view previous orders.
- Top Products and Search Function: Showcases the top 12 products based on reviews and includes a search feature for easy product discovery.
- Shopping Cart: Allows users to add products to a cart, adjust quantities, and remove items as needed before checkout.
- Order and Payment: Supports processing orders and secure payment transactions, integration with PayPal for providing users with a smooth and secure checkout experience.
- Admin Panels: Comprehensive management interface for users, orders, and products. Admins can also assign user roles, edit products, and update order statuses.

## Technologies
- Frontend: React, Redux, SCSS
- Backend: Python, Django
- Database: PostgreSQL, AWS RDS
- Media Storage: AWS S3, IAM
- Payment System: PayPal Integration
- API Test: Postman
- Email: EmailJS
- Deployment: Heroku

## Getting Started

### Prerequisites
- Vite
- Python
- PostgreSQL
- Personal Email Account
- EmailJS Account
- PayPal Sandbox Account
- AWS Account for S3, IAM, RDS
- Virtual Environment (recommended)

### Setup
1. Clone the repository
```
git clone https://github.com/ge1118/ecommerce-aura.git
```

2. Set up a virtual environment
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install dependencies
```
pip install -r requirements.txt
npm install
```

4. Configure AWS
- Create an AWS S3 bucket and note your bucket name and region.
- Create IAM credentials (access key ID and secret access key) with permissions to access the bucket.

5. Create a PostgreSQL database and configure the connection settings

6. Set up environment variables
- Copy .env.example to a new file named .env.
- Fill in the .env file with your specific values, including your Django SECRET_KEY, AWS credentials, and any other necessary configuration.
```
# Backend
# Database Configuration
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port

# AWS S3 Configuration
AWS_QUERYSTRING_AUTH=False
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_STORAGE_BUCKET_NAME=your_aws_s3_bucket_name
AWS_S3_REGION_NAME=your_aws_s3_region_name

# Email SMTP Configuration
EMAIL_PORT=your_email_port
EMAIL_HOST_USER=your_email_host_user
EMAIL_HOST_PASSWORD=your_email_host_password

# Frontend
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

7. Database Migrations
```
python manage.py migrate
```

8. Run the Development Server
```
python manage.py runserver
```
Access the application at http://127.0.0.1:8000/.

## .env and .env.example
- .env: This file contains the project's environment-specific settings, including secret keys and credentials.
- .env.example: A template showcasing the required environment variables without actual values.

## AWS S3 Configuration
Media files in AURA are served via AWS S3. Ensure you have correctly set up your AWS S3 bucket and provided the necessary credentials in your .env file as described in the setup section.

## Contributing
Contributions are welcome! Please open a pull request or issue to propose changes or additions.
