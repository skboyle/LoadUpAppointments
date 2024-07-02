# LoadUp - Pet Sitter Appointment Scheduling Application

LoadUp is a Ruby on Rails application that allows users to schedule appointments for pet sitting services. This application includes features such as appointment creation, viewing past and upcoming appointments, and an admin view for managing appointments.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Appointment Scheduling:** Users can create appointments for pet sitting services.
- **Past and Upcoming Appointments:** View sections for past and upcoming appointments, sorted appropriately.
- **Admin View:** Admins can view and manage all appointments.
- **Validation:** Enforces validation rules to ensure valid appointment data.

## Setup

### Prerequisites

Ensure you have the following installed:

- Ruby (version 3.1.2)
- Rails (version 7.1.3.4)
- Node.js (with yarn)
- PostgreSQL (or another preferred database)

### Installation

1. **Clone the Repository:**

```
git clone https://github.com/yourusername/loadup.git
cd loadup
```

2. **Install Dependencies:**
```
bundle install
yarn install
```

3. **Set Up the Database:**
Update the config/database.yml file with your database configuration, then run:
```
rails db:create
rails db:migrate
rails db:seed
```

### Running the Application
1. **Start the Rails Server:**
```
rails server
```

2. **Start the Webpack Dev Server:**
```
bin/shakapacker-dev-server**
```

3. **Access the Application:**

Open your browser and navigate to http://localhost:3000.

## Usage
### Creating an Appointment
- Navigate to the appointment creation page.
- Fill out the form with your details and submit to schedule an appointment.
### Viewing Appointments
- Visit the main page to see sections for upcoming and past appointments.
- Click on an appointment to view its details.
### Admin View
- Admins can access a special view to manage all appointments.


## Testing
### Running Tests
Ensure you have RSpec installed, then run:
```
bundle exec rspec
```

## Technologies Used
- Ruby on Rails: Web application framework.
- React: JavaScript library for building user interfaces.
- Shakapacker: Webpack integration for Rails.
- PostgreSQL: Database.
- Faker: Library for generating fake data.
- Rspec: Testing framework for Rails.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

