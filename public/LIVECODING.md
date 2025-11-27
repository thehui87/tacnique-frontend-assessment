# User Management Interface - TODO

A CRUD interface for managing user records with search functionality and form validation.

## Requirements

1. The listbox shows a list of all users in the database. At most one entry can be selected at a
   time.

2. By entering a string into the "Search" input, users containing the string will be filtered. The
   filtering happens immediately without submission / pressing Enter.

3. "Create" button:

   - Only enabled when no users are selected and when both name fields are filled.
   - Upon activation, a new user is created based on the name input fields and added to the
     database. The input fields are then cleared.

4. "Update" button:

   - Only enabled when there is a user selected.
   - Upon activation, the selected user's name is updated in the database.

5. "Delete" button:

   - Only enabled when there is a user selected.
   - Upon activation, the selected user is removed from the database.

6. "Cancel" button:
   - Only enabled when there is a user selected.
   - Upon activation, any selected user and both name input fields are cleared.

## Design Reference

View the visual example and design specifications on Figma:

[User Management Interface Example](https://www.figma.com/design/UUaV6u9muY5L7vM625TZPl/User-Management-Interface-Exercise-Example?node-id=0-1&t=hxr3RenOXZQuqnnS-1)
