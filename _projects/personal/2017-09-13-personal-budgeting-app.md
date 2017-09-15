---
layout: post
title:  "A Budgeting Application"
date:   2017-09-13
excerpt: "Currently developing an iOS application to track my budget in a more customizable way. I have used multiple budgeting apps before (Mint, Personal Capital, and CountAbout) that could not meet my needs, such as properly splitting transactions and accounting for transactions in different currencies. Furthermore, I decided this would be a great opportunity to experiment with technologies I have not used before or integrated into my applications."
type: "personal"
tag:
- personal
- budget
- budgeting
- iOS
- app
- mobile
- development
comments: true
---
## Technologies Used
The following technologies are currently being used for this project:
* NodeJS/JavaScript (ES2015)
* ExpressJS (v4.x)
* GraphQL (for NodeJS)
* MongoDB (v3.x)
* iOS (11) and Swift (4)
* Redis (for caching)
* Docker
I intend to introduce the following technologies in the future:
* ElasticSearch
* RxJS
* Android/Java

## Introduction
For the past year, I've tried out several budgeting applications, including Mint, Personal Capital, and CountAbout. However, none of these applications seem to suit my needs. After searching for a while, I realized I needed an application that:
* Allows me to roll over amounts left over in one budget category to other budget categories at the end of a budgetary period.
* Allows me to create "buckets" in bank accounts I have, such that I can virtually split the balance of my bank accounts.
* Can recognize transactions in different currencies and convert them (on a daily basis) to my default currency. (As a person with family living abroad and one who travels internationally every year, this is crucial to me when making cash transactions and exchanges).
* Allows me to split transactions with other users of the same app.
* Provides a better way to search through my transactions. I should be able to sort and filter based on date of transaction, amount, location, etc.

None of the applications I mentioned above contained any of these features.

<figure class="third">
  <a href="https://cdn6.ijstatic.com/wp-content/uploads/2016/12/countabout-transaction.png"><img src="https://cdn6.ijstatic.com/wp-content/uploads/2016/12/countabout-transaction.png"></a>
  <a href="https://cdn3.ijstatic.com/wp-content/uploads/2017/06/personal-capital-dashboard.png"><img src="https://cdn3.ijstatic.com/wp-content/uploads/2017/06/personal-capital-dashboard.png"></a>
  <a href="https://www3.pcmag.com/media/images/483160-mint-com.png"><img src="https://www3.pcmag.com/media/images/483160-mint-com.png"></a>
  <center><figcaption>Screenshots from CountAbout (left), Personal Capital (middle), and Mint.com (right).</figcaption></center>
</figure>

### Mint
Most people I know have used Mint at least once in their lifetime. It's the one I use currently and my most used one. It's a decent application to get information about all your accounts in one central location. However, Mint's Transaction search and split, budgeting, and goal-setting capabilities are lacking:
* Transaction search is limited only to text search. There's no date, amount, category, etc. based searching.
* Transaction splitting is limited to only splitting by dollar amounts. There are no complex splitting methods, such as those ones available on Splitwise. In addition, I cannot share the split transaction with other users on Mint.
* Budgeting doesn't allow rolling over left over amounts in one budget category to other budget categories. In addition, I cannot divide a transaction to occur over a certain period of time in a budget category (this is important for subscriptions that are paid once a year, but you would like to split its cost over 12 months).
* Goal-setting doesn't allow me to allocate just a portion of a bank account to saving for that goal.

Mint is a free to use application. In most cases like this "the user is the product" and I am not fond of my financial information being sold for profit.

<figure>
  <a href="https://cdn5.ijstatic.com/wp-content/uploads/2017/08/mint-com-transactions.png"><img src="https://cdn5.ijstatic.com/wp-content/uploads/2017/08/mint-com-transactions.png"></a>
  <center><figcaption>Mint.com offers very few filtering capabilities for searching through transactions.</figcaption></center>
</figure>

### Personal Capital
My concerns for Personal Capital is similar to those of Mint. However, Personal Capital is mostly useful as a dashboard for all your accounts. It's budgeting capabilities are more lacking than Mint's, such as not being able to create your own categories for transactions. Furthermore, I find Personal Capital's interface to contain too much information; it feels overwhelming.

I am less concerned with Personal Capital selling my financial information, as they get the bulk of their profits from their asset management business.

### CountAbout
CountAbout is a paid budgeting application, that I feel has less features than Mint. It can automatically download banking information; however, the interface is not well polished and difficult to use.

<figure>
  <a href="https://cdn6.ijstatic.com/wp-content/uploads/2016/12/countabout-transaction.png"><img src="https://cdn6.ijstatic.com/wp-content/uploads/2016/12/countabout-transaction.png"></a>
  <center><figcaption>Looking at the same screenshot from CountAbout above, the interface is cluttered and contains too many options and fields.</figcaption></center>
</figure>

## Development Timeline and Responsibilities
I am in the process of implementing the backend and the iOS application. I do not have a deadline for completion, as I'm currently only aiming for this application to be used within my household. However, I am open to the possibility of monetizing this application in the future.

I am the sole developer of this project. As such, I am responsible for managing, designing, implementing, testing, and releasing this software. I do not require more hands on the project while it's only being used in my household, but would seek additional help if this application was to be released to the public, as usability tests, security auditing, and monetization strategies would be required.

## Another Pressing Issue
Online banking in the US is still lacking behind many banks around the world. Most banks simply don't have APIs available to directly retrieve financial information. In cases where Mint cannot exchange my username/password for a token, it has to store them in their database to access my bank account and scrape the page contents. This has the potential to be a huge security issue.

While third-party services are available to retrieve bank account information from thousands of national banks such as [Plaid](https://plaid.com/) and [Yodlee](https://www.yodlee.com/), the barrier to entry is high (due to annual and per-request costs) and flexibility of their APIs is lacking in many cases. As such, I have decided to resort to manual recording of transactions. 

On my road map is to allow users to take photos of receipts, which will then pass through visual recognition algorithms to detect and record transaction information. Other ideas include possibilities such as listening to incoming emails and text messages from banking institutions to automatically record transactions.

## Design and Technologies Used
As the sole developer of this project, I have decided to first design the UI, then implement in every iteration. This forces me to keep within the design constraints and prevent scope creep.

<figure class="half">
  <a href="{{ site.url }}/assets/img/projects/budgeting-app/transactions-list.png"><img src="{{ site.url }}/assets/img/projects/budgeting-app/transactions-list.png"></a>
  <a href="{{ site.url }}/assets/img/projects/budgeting-app/new-transaction.png"><img src="{{ site.url }}/assets/img/projects/budgeting-app/new-transaction.png"></a>
  <center><figcaption>Transactions List (left) and New Transaction addition views for the iOS app, designed in <a href="https://www.figma.com/">Figma</a>.</figcaption></center>
</figure>

The architecture of the application is currently simple and does not have any distributed features:

<figure>
  <a href="{{ site.url }}/assets/img/projects/budgeting-app/current-arch.png"><img src="{{ site.url }}/assets/img/projects/budgeting-app/current-arch.png"></a>
  <center><figcaption>The current architecture of the entire stack.</figcaption></center>
</figure>

### NodeJS and ExpressJS
At BP3, we used Spring Boot (and thus Java) for the backend of our web projects, primarily because the systems we develop our products for run on Java. Wanting to learn more about different backend platforms, I have decided to use NodeJS with JavaScript ES2015. 

To focus my attention more on GraphQL and iOS app development, I chose ExpressJS which is the most widely used NodeJS web framework. This allows me to easily find answers to questions I may have about the framework and requires less experimentation.

### GraphQL
GraphQL is a query language for replacing REST endpoints. It allows for flexible requests, letting you omit unnecessary properties in the response data as well as providing a more descriptive way of defining available endpoints (inside a schema). Moreover, the abstract syntax tree of queries works perfectly with MongoDB, allowing you to only get the fields you would like at the database level, rather than filtering it in code in NodeJS.

### MongoDB
As someone who is not very fond of relational databases (SQL queries can get extremely complex at times), MongoDB is a good NoSQL database alternative and a has a great object modeling tool called Mongoose available for NodeJS.

### iOS Application
Instead of taking the usual route of developing a web application, I've decided to take the native approach and develop an iOS application instead. The last time I developed an iOS app was back in 2013 in Objective-C and I wanted to get more experienced with Swift.

### Redis
Redis is used purely as a cache, to store the GraphQL queries available to application users. GraphQL queries are persisted to only allow users to make existing queries, as letting users perform arbitrary queries can potentially lead to a (D)DOS attack against the server, since GraphQL allows for recursive queries.

### Docker
Currently, I'm using docker (compose) to run MongoDB and Redis for development. When my application is ready for release, I will be using Docker for deployment of both MongoDB and Redis, as well as the NodeJS backend.

### ElasticSearch
In the future, I'm planning to add ElasticSearch to the stack, allowing for faster and better text-based searching for transactions.

### RxJS
In the future, I'm planning to integrate RxJS into NodeJS to allow for reactive programming, as I believe applications are easier to implement when data is more fluid. However, I don't think RxJS will be needed unless in the near future.

## Coming Soon

### Security
I will be updating the architecture diagram once I incorporate security measures into the stack.

### Android and Web Application
Once the iOS application is stable and ready for release, I plan on making an Android application, as well as a web application.
