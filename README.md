#   404 NOT FOUND

This is a project that is a centralised dashboard which can allows the professor and TA's to send notifications and allow students to view the messages

## Team Members
Team:

Prajeeth.S(190050117)
Girish M.V(190050069)
Gaurav.P(190050037)
Krushnakant(190100036)

# Key Features

## Sign Up Page

The Authentication Code reduces spam registration
Its a Regular expression of the form `/[1-2]\d[A-Z0-9]\d{6}/` for students and `/P[A-Z]/{2,3}\d{3}` for professors.
As long as the person doesn’t come to know the form of the expression we can make sure that no spam registration occurs.
Here the expression for the professor is kept small for easier testing and debugging and presentation.But we can actually have it really long and diverse with a lot of characters to make sure that no spam reg happens

## Home Page

Contains the List of courses the user is registered
If the user is a professor he can add courses
Everyone can see the list of users in a course that they are part of including the professor name himself
The professor can also remove students of the course if suspicious activities are performed


## Course Home Page

This is the main page where messages can be sent and received.Prof can send messages both to TA and student 
Message to TA cannot be seen by the students.TA can send messages to students not professors
Professor can add both TA and students but TA can only add students
Students do  not have any control(Especially they can’t send messages/add users to make sure to have only important stuff on the page)

So each message has a header which contains the sender username which on click gives the list of users who read the  message
The body contains the message
Message has two forms.Low priority and High Priority Messages.Low-Green High-Red
Also messages sent by prof appear on left side and messages by TA’s on the right.



## About Page

This page consist of a short description about the project
This page also consist of a nice logo with the team members and their names with roll no
Angular Bootstrap 4 was exclusively used here for the styling


## Further Developement

First we can greatly improve on the authentication in the signup page maybe use SSO
Then we can improve on the bootstrap/styling.WE have used a good amount but can add more animation
We can try to reduce the requests time and make it faster though its already quite fast(But dont know how to do)
Then we can regulate by having top 10 messages in a page and rest can be done like view previous or something like that which may make it faster(Honestly dont know will it do)
We can add some confirmation way for adding/removing students/TA's since things may happen by a slip of a hand
We can give provision to delete a message(Though this is still fine)



