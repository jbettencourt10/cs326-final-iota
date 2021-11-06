The project has already been deployed and are now presented at the URL: https://mymediamix.herokuapp.com

# Build the project
- After making changes on the project, developers need to commit, merge, and push the changes to the main branch.
- Then, developers need to push the main branch to "heroku" in addition to the push to "origin" as we normally do.
    >> git add .
    >> git commit -m "message here"
    >> git push heroku main
- If the project works perfectly on the local machine, then it should be pushed to Heroku immediately without any error. 
- When the project is successfully pushed to Heroku, refresh the URL and the changes should be updated immediately. 

# NOTE:
- For the first time launching the project, you should install "express" on your machine to update package.json and then push the new change to the main branch before pushing the project to Heroku. 
    >> npm install express
    >> git add .
    >> git commit -m "installing express"
    >> git push origin main
    >> git push heroku main

- Required files for Heroku to work: server.js, package.json, Procfile. 
- Procfile should not be modified. 