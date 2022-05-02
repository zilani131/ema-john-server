/*
one time for your computer
-------------------
1.create heroku account (one time )
2.verify email
3.install heroku cli
4.heroku log in
-------------
for each projects one time
----------------
1.heroku create
2.make sure you : git add . git commit . git push
3.git push heroku main
4.Go to Heroku Dashboard>Current Projects>Setting >Reveal config verse
5.copy paste config vars from your .env file
6.Make sure you have whitelisted all ip address to access mongodb
-------------------------------
update server with new changes
-------------------------------
1.Make changes
2.make sure you : git add . git commit . git push
3.git push heroku main
------------------------
Connect Server with client and deploy client
--------------------------
1.Replace localhost by heroku link
2.npm run build
3.firebase deploy
*/