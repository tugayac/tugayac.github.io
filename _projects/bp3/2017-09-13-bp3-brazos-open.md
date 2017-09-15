---
layout: post
title:  "Brazos Open"
date:   2017-09-13
excerpt: "In 2015 and 2016, I worked on BP3's Brazos Open, a user interface framework for use on multiple BPM platforms (IBM, Activiti, and Camunda), geared towards front-end web developers who could utilize HTML and JavaScript to build single-page web applications on BPM systems."
type: "work"
tag:
- bp3
- automation
- automated
- testing
- brazos
comments: true
---
## Technologies Used
* Groovy
* Java (v7)
* AngularJS (v1.4)

## Introduction
[Brazos Open](https://www.bp-3.com/rapid-development-with-brazos-open/), now referred to as Brazos UI for External User Interfaces (or BUIEUI for short), is a framework that was developed to be used by web developers to create custom single-page web applications using HTML and JavaScript (JS) on existing BPM systems. BUIEUI can be used to create simple HTML pages with a few JS functions. More complex applications require some knowledge of AngularJS, since the single page applications can be extended to perform more complex tasks.

The largest usage of BUIEUI to date has been in the healthcare industry, helping create [custom healthcare applications for hospitals](https://www.bp-3.com/ibminterconnect-creating-change-in-healthcare-with-bpm-at-kaiser-permanente/).

<figure>
  <a href="https://www.datapine.com/images/hospital-performance-dashboard.png"><img src="https://www.datapine.com/images/hospital-performance-dashboard.png"></a>
  <center><figcaption>BUIEUI can be used to build dashboards like this one, leveraging BPM data as well. <a href="https://www.datapine.com/dashboard-examples-and-templates/healthcare">(Image taken from DataPine)</a>.</figcaption></center>
</figure>

## My Responsibilities
During 2015 and 2016, I worked on the front-end portion of this product as part of a team of 3-4 people, implementing the:
* Components that developers can use on their application.
* Ability to write short, custom functions either directly in the HTML or in a separate JS file.
* Ability to execute custom scripts that exist on the server to get data from or write data to the server.

## Design and Technologies Used
Extensively used AngularJS to build components that were to be used by developers in their single-page application. Since AngularJS had the ability to extend existing controllers for components, it implicitly allowed more seasoned developers to extend existing component functionality, in addition to AngularJS providing a good interface for data propagation (and change detection).

Java was used to integrate our application with BPM environments, while Groovy was used to write server-side scripts for Activiti and Camunda, to be used by the developers to get data from and write data to the server.

## Difficulties Faced
A few difficulties were faced while attempting to make this application easy to use for developers:
* Although more seasoned developers could extend AngularJS and add their own code in a separate JS file, we had to account for novice developers, who only know little JS. We got around this by creating a specialized HTML tag where developers could place JS code in HTML and were given access to data available to the application in these functions.
* Scoping components in AngularJS can sometimes be a nightmare for developers new to AngularJS, especially if the plan is to allow these developers to add their own custom components. We had to make sure we were not setting isolate scopes everywhere, as nested isolate scopes are not allowed in AngularJS (and custom components tend to have isolate scopes).

## What Did I Learn From This Project?
* Even though it was not my decision to use AngularJS for this project, React or VueJS may have been a better suited to accomplish the task (it was decided to go with AngularJS because it was a lot more mature at the time, compared to Reach and VueJS). However, Reach or VueJS may have been better due to users' ability to create more modular components and unidirectional change detection. Sometimes, the less mature option can be a better investment for a product's future.
* Attempting to over-simplify can lead to encouraging bad practices for end users. Allowing functions to be written inside of HTML may not have been a great idea, as it does not force the user to break down their application into separate files. Maintaining code in separate and smaller files leads to less code commenting and easier maintenance by people who are not familiar with the project.

## What Would I Do Different Next Time?
* Research and experiment with other frameworks before settling with the one everyone knows to use already.
* Rather than encouraging users to take the easy route, encourage them to do the right thing by providing usage guides. That being said, some people prefer to take the easier route, rather than the maintainable route (especially for experimenting).
