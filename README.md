# Karate-Club-System
 The **Karate Club Project** is a feature-rich web application designed to meet the specific database requirements for effective management of a Karate Club. This comprehensive software solution offers a range of functionalities to streamline member management, class scheduling, belt grading, and payment tracking. The system ensures efficient administration, empowering karate club instructors and administrators to effortlessly manage club activities.

## Key Features

### 1. Belt Ranks
* Define various belt ranks with associated test fees.
* Ensure uniqueness of rank names.
### 2. Belt Tests
* Record the results of belt tests for members, including test date, result, and payment details.
* Track test history and progress of members.
### 3. Instructors
* Manage information about instructors, including qualifications and personal details.
### 4. Member Instructors
* Assign instructors to members along with the assignment date.
### 5. Members
* Store details of karate club members, including emergency contact information, current belt rank, and activation status.
### 6. Payments
* Record payments made by members, including amount, date, and payment method.
### 7. People
* Maintain records of individuals involved in the karate club, including personal details, contact information, and date of birth.
### 8. Settings
* Configure default subscription period for members.
### 9. Subscription Periods
* Define subscription periods for members, including start date, end date, fees, and payment status.
### 10. Users
* Manage user accounts for system access, including usernames, passwords, and permissions.

## Technologies Used
* **Backend**: ASP.NET Core with RESTful API
* **Database**: Microsoft SQL Server using ADO.NET
* **Architecture**: 3-tier architecture
  - DataAccess Layer
  - Business Layer
  - API Controller Layer
* **Deployment**: Hosted on Monster Asp.net Free

* **Frontend**: React with the following libraries:
  - eslint@^8.0.0
  - react-router-dom
  - @tanstack/react-query
  - @tanstack/react-query-devtools
  - styled-components
  - axios
  - date-fns
  - react-hot-toast
  - react-hook-form
* **Frontend Deployment**: Hosted on Netlify

## Project URL
[Live Demo](#) *(https://karate-club-system.netlify.app/)*

## Future Enhancements
- Implement authentication and authorization.
- Migrate database handling to Entity Framework Core (EF Core).
- Utilize Design Patterns to improve maintainability and scalability.

