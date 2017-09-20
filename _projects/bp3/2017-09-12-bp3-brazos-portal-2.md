---
layout: project
title:  "Brazos Portal (2.0)"
excerpt: "In 2016 and 2017, I worked on BP3's process task management portal for IBM BPM. I was responsible for designing the architecture and developing the new version of our product, which utilized Elasticsearch instead of a traditional relational database."
type: "work"
tag:
- bp3
- portal
- brazos
- process
- management
comments: true
thumbnail: "brazos-portal.png"
technologiesUsed:
  - "Java 8"
  - "Spring Boot"
  - "Angular 2+"
  - "TypeScript"
  - "Twitter Bootstrap (3.x)"
  - "ElasticSearch (1.x and 2.x)"
---
## Introduction
[Brazos Portal](https://www.bp-3.com/products/brazos-portal/) is a proprietary process portal designed to be used with IBM BPM[^1]. It is built as an [alternative to the default process portal provided by IBM](https://www.ibm.com/us-en/marketplace/bp3-brazos-portal) and can be used to:
* Filter tasks into smaller groups
* Receive notifications for incoming tasks
* View tasks across multiple BPM environments.

Version 2 of Brazos Portal uses the ElasticSearch index maintained by IBM BPM, which means searches for tasks are extremely fast compared to v1.x, since it relies on a relational database for the same information.

<iframe src="https://player.vimeo.com/video/92789921?title=0&byline=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<center><p><a href="https://vimeo.com/92789921">BP3 presents: Brazos Portal - Setting Mobile BPM Free</a> from <a href="https://vimeo.com/bp3global">BP3</a> on <a href="https://vimeo.com">Vimeo</a>.</p></center>

## My Responsibilities
I worked on Brazos Portal in 2016 and 2017, from product inception to its first release. During this time, I have:
* Learned how to setup and use ElasticSearch (also completed a lecture on Udemy, on how to use ElasticSearch, on my own time).
* Replicated features available on Brazos Portal v1.x, while learning how to use Angular 2+.
* Personally integrated webpack into our build process (before Angular CLI was released) reducing our page load times.

## Difficulties Faced
Since [IBM unofficially supported the use of ElasticSearch](https://developer.ibm.com/bpm/2017/03/new-technology-demonstration-bpm-analytics/) by other applications, there was not much documentation in this area. This made using the IBM BPM provided ElasticSearch challenging, as we had to experiment with the ElasticSearch indices and documents inserted by IBM BPM to understand how we can get the task information needed.

<figure>
  <a href="https://developer.ibm.com/bpm/wp-content/uploads/sites/31/2017/03/OI_3.png"><img src="https://developer.ibm.com/bpm/wp-content/uploads/sites/31/2017/03/OI_3.png"></a>
  <center><figcaption><a href="https://developer.ibm.com/bpm/2017/03/new-technology-demonstration-bpm-analytics/">The JMS queue emits events, which are then recorded to ElasticSearch.</a></figcaption></center>
</figure>

Additionally, Angular 2+ was in beta when we started using it for this project, requiring frequent updates to catch up with breaking changes.

### ElasticSearch
Prior to this project I had only heard about ElasticSearch. By the time I was being moved off this project, I had learned how to:
* Setup index mappings.
* Create complex aggregations (especially [date-based aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/1.4/search-aggregations-bucket-datehistogram-aggregation.html)).
* Optimize search results using better text queries.

The flexibility of aggregations was quite intriguing, as we used them extensively to provide task due date information to the user.

### Angular 2+
I had a great time learning how to use Angular 2+, especially not having to deal with scoping and change detection issues that were easy traps to fall into in AngularJS.

In Angular 2+, the process of scoping is hidden from the developer and every component can be considered to be "isolated" (while users can specify variables exposure using TypeScript's encapsulation). Additionally, the introduction of push-only change detection, along with access to the change detector of the component and NgZone[^2], change detection became easier to manage.

### Webpack
We used to use Gulp with various plugins as our build tool for web projects; however, this time a tool better suited for improving our page load times was needed. This is when I introduced Webpack[^3] to the project, which allowed us to decrease page load times by bundling the software into larger pieces (loading files in larger chunks is faster, as there is less request overhead). Even after the general release of Angular CLI, the team decided to keep using Webpack because it was working really well (and it would've been a decent amount of work to convert all build configurations to work with Angular CLI).

In addition to Webpack's mentioned benefits, it provided great tools to analyze the sizes of included chunks (such as third-party libraries), allowing us to cut out duplicates and unused portions of libraries.

<figure>
  <a href="https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif"><img src="https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif"></a>
  <center><figcaption><a href="https://github.com/th0r/webpack-bundle-analyzer">The Webpack Bundle Analyzer Plugin.</a></figcaption></center>
</figure>

## What Did I Learn From This Project?
* The usefulness of Webpack and its bundling capabilities.
* Despite requiring more time to learn, using popular frameworks like Angular in their beta stage can allow for a better start (if said framework has improved features compared to its ancestors), especially for products with planned long-term support. This prevents a rewrite of the entire product for years to come.
* The power of ElasticSearch when it comes to text-based searching and aggregating data. That being said, it's not meant to be used as a database for writing, as it doesn't support the [ACID](https://en.wikipedia.org/wiki/ACID) principles by default. It is best used as a searchable index along with a database system.

## What Would I Do Different Next Time?
* To provide better search results to users, I would learn how to make use of the scoring system in ElasticSearch, as it seems crucial in providing more relevant search results.

## Footnotes
[^1]: You can read more about IBM BPM (Business Process Manager) [here](http://www-03.ibm.com/software/products/en/business-process-manager-family).
[^2]: One of my favorite articles that explain [the Angular Change Detector and NgZone](https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html).
[^3]: At the time we started working on this project Angular CLI was still in early development.