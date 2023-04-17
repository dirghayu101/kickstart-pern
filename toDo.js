/**

User dashboard things:
1. Update reservation for user.
2. Feedback post in user dashboard.
3. Cancel reservation functionality in support option of user dashboard.
4. Update reservation functionality in reschedule option of user dashboard.

Admin dashboard things:
1. Feedback and other message display for admin. Like people who cancelled.  There should be a button like mark as read in the messages which will set boolean to false and the same feedback won't be shown again. And there will be an all feedbacks button which will show all reservation no matter what. And I will sort reservations before showing them. Later I will add a functionality in the user side as such that it will send a post request to admin as well if in case user updates or cancels a reservation. Then I will add functionality to update the messages popup in the Aside component.

2. Product display like all the seats remaining and similar things in product option.
3. Add user functionality in admin. (DONE)
4. In settings menu, admin should be able to delete any space table and even create a new space table.
5. In orders admin should be able to modify recent reservation. Like delete and update. Even see all reservations ever and the users who performed all those. (Partially DONE)
6. Add product to increase the seats and other similar functionality for admin.
7. Validation for reservation that user will be able to make like no reservation of a past date.


Miscellaneous:
1. Reset database with constraints. Like date for reservation constraints and others. I removed them for testing.
2. Walkthrough the project and add validations wherever you think is necessary. 
3. No phone number repetition middleware check for all the APIs with update or insert points. There should be strict validation for this. I am able to have duplicate mailIDs and phone numbers by using admin panel.
4. You can do frontend validation of repetition of email and phone number in admin.
5. Replace pricing in the homepage.
 */
