# scoreboardv2
----
## User Stories

As a connie player I want to

> Vist the site and be able to keep track of the scores of my game,

By

> Inputing the names of the players and the first dealer, in their seated order, so I can just put the bid's of each player and the number of tricks they acheive, and the app should accumalate and know who is next.

> Showing peoples current scores at the top of the page for easy reference

> Mobile first?
----
## Client Journey

**Page 1**
Enter the names of the players (default to 5, upgrade to choose)

**Page 2**
Display table(list?) of the players, dealer, ask for bids (2nd from the Dealer first) - deny illegal bids

Hit submit button to proceed

**Page 3**
Same as page 2 but with tricks made

**Page 4**
Show results, have a next round button, go back to page 2

**Page 5**
At game end, show final scores, highlight winner

----
## How?

Have a database with tables - 1 for players, 1 for each round:
  - Players: id, name, score, dealer (true or false)
  - rounds: id, round id, player id, tricks bid, tricks made
 
After getting players names, initialize that database, with one player being dealer

Have a query to get the third three columns from that database, display these as a partial on all pages

Start on 10D (round id's will be number of tricks + D for down or U for up)

Get bids, insert into rounds table
Get tricks, insert into rounds table
In player table, scores +=tricks
Have a checker for that round, if bids==tricks, in player table, scores +=10
