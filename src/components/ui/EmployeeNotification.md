# Employee Notification System

## Overview

The Employee Notification System provides a consistent way to display notifications for employee-related actions (add, edit, delete) in the organization management interface.

## Components

### EmployeeNotification

A notification component that displays success messages for employee actions.

```tsx
import EmployeeNotification from '../components/ui/EmployeeNotification';

<EmployeeNotification 
  isVisible={showNotification} 
  message="Заявка отправлена на согласование администратору"
/>
```

### useEmployeeNotification Hook

A custom hook that manages notification state and provides helper functions.

```tsx
import { useEmployeeNotification } from '../hooks/useEmployeeNotification';

const { showNotification, notificationMessage, showEmployeeNotification } = useEmployeeNotification();

// Show notification for specific action
showEmployeeNotification('ADD');    // For adding employee
showEmployeeNotification('EDIT');   // For editing employee  
showEmployeeNotification('DELETE'); // For deleting employee

// Show custom message
showEmployeeNotification('Custom notification message');
```

## Usage Example

```tsx
import React from 'react';
import EmployeeNotification from '../components/ui/EmployeeNotification';
import { useEmployeeNotification } from '../hooks/useEmployeeNotification';

const MyComponent: React.FC = () => {
  const { showNotification, notificationMessage, showEmployeeNotification } = useEmployeeNotification();

  const handleAddEmployee = (data: EmployeeFormData) => {
    // Process employee addition
    console.log('Adding employee:', data);
    
    // Show notification
    showEmployeeNotification('ADD');
  };

  return (
    <div>
      {/* Your component content */}
      
      {/* Notification */}
      <EmployeeNotification 
        isVisible={showNotification} 
        message={notificationMessage}
      />
    </div>
  );
};
```

## Features

- **Consistent Messaging**: Uses predefined messages for standard employee actions
- **Auto-hide**: Notifications automatically disappear after 4 seconds
- **Custom Messages**: Supports custom notification messages when needed
- **Responsive Design**: Works on mobile and desktop devices
- **Accessible**: Follows accessibility best practices

## Integration Points

The notification system is integrated into:
- `OrganizationTestPage` - For testing employee management functionality
- Future `MyOrganizationPage` - For production employee management

## Requirements Satisfied

- ✅ 3.5: Display notification when user submits add employee form
- ✅ 4.4: Display notification when user submits edit employee form  
- ✅ 4.5: Display notification when user deletes their own record