---
layout: post
title:  "Software Consulting"
date:   2017-09-13
excerpt: "In 2015 and 2016, I worked on various software consulting projects that included implementing a custom web application solution, training customers on Camunda, and extending Alfresco Activiti."
type: "work"
tag:
- bp3
- automation
- automated
- testing
- brazos
comments: true
---
## Introduction
One of my responsibilities at BP3 was to provide software consulting services to customers who needed it, in addition to working on our product lines. While I cannot disclose the customers I have worked for, I am free to speak about what I have done for these customers, at a high level.

### Custom Web Application
In 2015, this custom web application was built to serve the specific needs of a customer to view tasks assigned to users and create custom forms for their customers to fill out. Unfortunately, I cannot remember much about this project, other than that we built the frontend using AngularJS.

<figure>
  <a href="https://i.stack.imgur.com/3Uxex.jpg"><img src="https://i.stack.imgur.com/3Uxex.jpg"></a>
  <center><figcaption>The custom form kind of looked like this.</figcaption></center>
</figure>

## Camunda Training
In 2015, I was sent onsite to train customers on using Camunda, as this customer was switching BPM systems. This was challenging for me: I had never given formal talks before (presentations at college don't count), let alone on a topic I only had a month to prepare for. 

Despite the challenges, I was able to learn about many aspects of Camunda: Creating user and service tasks, messaging, various gateways, and BPM unit testing. Since most of the company was present at this training session, the same training session would be used to train everyone, from software developers to upper management. Since I was a decent public speaker (and was presenting along with coworker), we were able to give an exceptional 3-day training session to our customer, which involved going over how Camunda worked compared to other BPM systems, and a hands on lab where the trainees could get their hands dirty and ask questions while we were physically present.

<figure class="half">
  <a href="http://www.bpm-guide.de/wp-content/uploads/2015/12/2015-12-14-Camunda-Modeler-016.png"><img src="http://www.bpm-guide.de/wp-content/uploads/2015/12/2015-12-14-Camunda-Modeler-016.png"></a>
  <a href="https://www.ibm.com/developerworks/bpm/library/techarticles/1306_venn/images/Process.jpg"><img src="https://www.ibm.com/developerworks/bpm/library/techarticles/1306_venn/images/Process.jpg"></a>
  <center><figcaption>A process designed in Camunda (on the left) looks quite similar to one designed in IBM BPM (on the right) thanks to the <a href="http://www.bpmn.org/">BPMN standard</a>.</figcaption></center>
</figure>

My consulting duties for this customer continued about a month after that training session, mainly by answering questions that I received daily.

Giving training in the field showed me that hands on labs help immensely in easing new users into new software packages. Being personally available while people were working through the lab helped me better understand what the trouble areas were for developers vs non-developers. For example, developers were more inclined to ask advanced usage questions, such as sending messages from tasks, while management was more likely to ask why Camunda should be preferred to other BPM implementations[^1].

## Extending Alfresco Activiti
In 2016, I was tasked with helping a customer extend the existing implementation of Alfresco Activiti:
* Extended the Workflow Designer accommodate for some custom functionality available in the tools the customer was already using. This was a mainly an AngularJS and partly a Java project (as Alfresco Activiti uses these technologies).
* Extended the Admin Console and it's backend to integrate it with customers' systems.

<figure class="half">
  <a href="https://www.alfresco.com/blogs/files/Screen-Shot-2014-06-19-at-14.29.29.png"><img src="https://www.alfresco.com/blogs/files/Screen-Shot-2014-06-19-at-14.29.29.png"></a>
  <a href="http://docs.alfresco.com/activiti/docs/admin-guide/1.4.0/images/endpoint-config.png"><img src="http://docs.alfresco.com/activiti/docs/admin-guide/1.4.0/images/endpoint-config.png"></a>
  <center><figcaption>I was tasked with modifying the Alfresco Activiti Workflow Designer (on the left) and the Alfresco Admin Console (on the right).</figcaption></center>
</figure>

The benefit of working with Alfresco Activiti was having access to the source code[^2]. However, Alfresco Activiti did not have any publicly available documentation for its code nor many code comments. To extend the software, I had to decipher what was going on in the backend code by finding appropriately named classes and placing breakpoints, then stepping through the code.

Although there was a product manager on this project, I was partly responsible for understanding and delivering requirements (as I wrote release documentation). This project was an eye opener for me on why companies go over budget and past deadlines. Our client insisted that we have "standup" meetings every morning that lasted 1.5 hours (standup meetings are supposed to last 5-10 minutes and should not include details) where we talked through requirements and demoed what was done the previous day. It took the product manager weeks to convince the client to reduce the number of these meetings to twice a week, as having long meetings like this was cutting into our development time, while unnecessarily costing our customer more. Moreover, limiting meetings to twice a week also forced our client to discuss requirements over email, which helped us document what was being requested and suggest changes as needed.

## Footnotes
[^1]: One benefit of Camunda: It was designed [to be testable and comes with extensive unit testing capabilities](https://docs.camunda.org/manual/7.5/user-guide/testing/) for processes and tasks designed within Camunda, with decent documentation.
[^2]: Not open source software, as the source code is only available after purchasing a license.
