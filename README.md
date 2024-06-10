Vacation search website. 
There are two roles in the system:
User - can view vacations, follow and unfollow a vacation, can filter and display only the vacations that the user follows, or that have not yet started, or currently active vacations.
Admin - can add, edit, delete vacation and view vacations reports (number of followers for each vacation), to create and download a file "csv" containing the vacation destinations
and the number of followers.
Database: mySQL
Server-side: Node.js + Express
Client-side: React

Runs on ports: 
               Front: "3000:3000"
               Back: "8080:8080"
               DB: "3306:3306"

docker compose up -d --build         
http://localhost:3000
