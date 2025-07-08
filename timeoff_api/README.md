# Timeoff API

## Overview

The Timeoff API provides endpoints to manage time off requests, including creating, updating, and retrieving requests. It supports various request types such as vacation, sick leave, and personal days.

## Apps

### company

#### Company Model

```json
{
  "id": "UUID",
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "website": "string",
  "company_leave_days": "integer", // Total leave days allowed for the company
  "created_at": "YYYY-MM-DDTHH:MM:SSZ",
  "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

#### Company Endpoints

- `/company/` - List all companies
- `/company/<uuid:company_id>/` - Get company details by ID
- `/company/create/` - Create a new company
- `/company/<uuid:company_id>/update/` - Update company details by ID
- `/company/<uuid:company_id>/delete/` - Delete company by ID

---

### attendance

#### Attendance Model

```json
{
  "user_id": "UUID", // Foreign key to User model
  "date": "YYYY-MM-DD",
  "status": "string", // e.g., 'present', 'absent', 'leave'
  "check_in_time": "HH:MM:SS",
  "check_out_time": "HH:MM:SS",
  // If needed, connect to `leave` to check if the user is on leave
  "leave_id": "UUID" // Foreign key to Leave model, if applicable
}
```

#### Attendance Endpoints

- `/attendance/` - List all attendance records
- `/attendance/<uuid:user_id>/` - Get attendance records for a specific user
- `/attendance/<uuid:user_id>/check-in/` - Create a new attendance record for a user
- `/attendance/<uuid:user_id>/check-out/` - Update attendance record for a user
- `/attendance/<uuid:user_id>/status/` - Update attendance status for a user

---

### leave
#### Leave Model

```json
{
  "id": "UUID",
  "user_id": "UUID", // Foreign key to User model
  "leave_type": "string", // e.g., 'vacation', 'sick', 'personal'
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "duration": "integer", // Duration in days requested
  "days_remaining": "integer", // Remaining leave days for the user calculated from company_leave_days
  "status": "string", // e.g., 'pending', 'approved', 'rejected'
  "description": "string", // Optional reason for the leave
  "created_at": "YYYY-MM-DDTHH:MM:SSZ",
  "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

#### Leave Endpoints
- `/leave/` - List all leave requests
- `/leave/<uuid:user_id>/` - Get leave request details by ID for specific user
- `/leave/create/` - Create a new leave request
- `/leave/<uuid:leave_id>/update/` - Update leave request by ID
- `/leave/<uuid:leave_id>/delete/` - Delete leave request by ID
- `/leave/<uuid:leave_id>/approve/` - Approve leave request by ID
- `/leave/<uuid:leave_id>/reject/` - Reject leave request by ID

---

### notifications

#### Notification Model

```json
{
  "id": "UUID",
  "user_id": "UUID", // Foreign key to User model
  "message": "string",
  "is_read": "boolean", // Indicates if the notification has been read
  "created_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

#### Notification Endpoints
- `/notifications/` - List all notifications
- `/notifications/<uuid:user_id>/` - Get notifications for a specific user
- `/notifications/<uuid:notification_id>/` - Get notification details by ID
- `/notifications/<uuid:notification_id>/mark-read/` - Mark notification as read
- `/notifications/<uuid:notification_id>/delete/` - Delete notification by ID
- `/notifications/create/` - Create a new notification

---

### users

#### User Model

```json
{
  "id": "UUID",
  "first_name": "string",
  "last_name": "string",
  "employee_id": "string",
  "email": "string",
  "password": "string",
  "user_type": "string", // e.g., 'management', 'employee'
  "role": "string" // e.g., 'manager', 'developer', 'hr', etc
}
```

#### Authentication Endpoints

- `/auth/user/me/` - Get user details by ID (session management)
- `/auth/login/` - User login endpoint
- `/auth/register/` - User registration endpoint
- `/auth/refresh/` - Refresh user authentication token
- `/auth/logout/` - User logout endpoint
- `/auth/password/reset/` - Reset user password
- `/auth/password/change/` - Change user password

#### User Management Endpoints

- `/users/` - List all users
- `/user/profile/<uuid:user_id>/` - Get user details by ID
- `/user/profile/<uuid:user_id>/update/` - Update user details by ID
- `/user/profile/<uuid:user_id>/delete/` - Delete user by ID

