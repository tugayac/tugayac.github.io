---
layout: post
title:  "Brazos UI"
date:   2017-09-12
excerpt: "In 2017, I worked on BP3's user experience toolkit for IBM BPM, which was their highest selling product. I was responsible for bug fixes, adding new features, and improving the product architecture, based on customer support tickets."
type: "work"
tag:
- bp3
- toolkit
- brazos
- framework
comments: true
---
## Technologies Used
* JavaScript (ES5)
* CSS
* jQuery (v1.x)
* Twitter Bootstrap (v3.x)
* IBM BPM (v8.x)
  * Coach View Framework

## Introduction
Available since 2013, [Brazos UI](https://www.bp-3.com/products/brazos-user-experience-framework/) is a proprietary user interface toolkit for IBM BPM[^1]. BPM developers can use this toolkit to build malleable and responsive forms for their users who need to interact with a user interface to complete their tasks within business processes.

It is built as an [alternative to the default user interface toolkits provided by IBM](https://www-304.ibm.com/partnerworld/gsd/solutiondetails.do?solution=52680&expand=true&lc=en), such as SPARK UI.

<iframe src="https://player.vimeo.com/video/181988834?title=0&byline=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<center><p><a href="https://vimeo.com/181988834">Brazos UI</a> from <a href="https://vimeo.com/bp3global">BP3</a> on <a href="https://vimeo.com">Vimeo</a>. You can find example usage <a href="https://vimeo.com/71120734">here</a>.</p></center>

## My Responsibilities
I was placed on the Brazos UI team between April and September, 2017. During this time, I have:
* Fixed bugs found by automated tests and received through support tickets.
* Added features based on consultant and customer requests.
* Proposed a revised architecture that would allow us to develop the toolkit using reactive programming paradigms.

Prior to late 2016, testing for Brazos UI was performed manually by our testing team. In the summer of 2016, I was approached by management to improve our testing capabilities for Brazos UI. My solution was to offer automated testing using [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) (BDD)[^2]. Since there was no viable solution available for browser-based behavioral testing with IBM BPM, I worked on implementing an automated testing framework[^3].

## Difficulties Faced
Developing toolkits for IBM BPM was a difficult task due to:
* Lack of external Integrated Development Environment (IDE) support.
* Lack of automated testing facilities.
* Inconsistent documentation for the Coach View Framework, which was used for data persistence.

### Lack of IDE Support
When developing a toolkit for IBM BPM, the developer can only use the provided editors (which only features autocomplete capabilities for IBM BPM provided libraries), as there is no way to integrate the development environment with an IDE. Our solution for this was to use our preferred IDE and copy-paste code over to the toolkit environment when needed. But why did we insist on using an IDE?
* Our preferred IDE was IntelliJ, which provided several useful features:
  * JavaScript and HTML linting (code analysis for error detection)
  * Autocomplete for third-party libraries
  * Static code analysis
* Keeping the code locally meant we could use Git to keep track of code changes (IBM BPM only features "snapshots" which do not show code differences for between different versions).

<figure>
  <a href="http://nvie.com/img/git-model@2x.png"><img src="http://nvie.com/img/git-model@2x.png"></a>
  <center><figcaption>We were able to make use of feature branches with Git, roughly applying the suggestions <a href="http://nvie.com/posts/a-successful-git-branching-model/">here.</a></figcaption></center>
</figure>

We also proposed taking time to figure out a way to automatically inject updated code into the IBM BPM toolkit database, such that we would no longer have to resort to copy-pasting code. However, we were moved off the project before we could start our investigation.

### Lack of Automated Testing Facilities
Lack of automated testing capabilities on IBM BPM made it difficult to test for regressions after changes to the toolkit. This was mitigated by the introduction of automated UI testing, as we could now run automated tests as needed, catching regressions (and other bugs) before a new version was released to customers.

### Inconsistent Documentation
When developing the toolkit, we had to make use of a framework provided by IBM BPM, called the _"Coach View Framework"_. Usage of this framework was required to persist data to IBM BPM, which is crucial in case a user decides to leave and then return to an unfinished task. Unfortunately, [documentation for this framework](https://www.ibm.com/support/knowledgecenter/en/SSFPJS_8.5.7/com.ibm.wbpm.ref.doc/topics/rcontext.html) didn't specify changes between versions, leading to inconsistent results when the toolkit is used on different versions of IBM BPM. Fortunately, we got around this by testing on multiple versions of IBM BPM and making use of their debugging feature[^4].

## What Did I Learn From This Project?
* The importance of IDEs and source control (in this case, Git) in for development, which allow for concurrent development, as well as maintainable code[^5].
* Benefits of automated testing in decreasing regressions and new bugs.
* Importance of detailed and versioned documentation in allowing users to utilize your product.
* Benefits of reactive programming in providing a more fluid user experience.
* The need to push back on customer requests. Attempting to satisfy all customer needs has the potential to lead to a soup of code supporting edge cases in your software.

## What Would I Do Different Next Time?
* If there is any case where I cannot use an external IDE in another project, I would first attempt to figure out if I can automatically copy code changes. Manual copying is error prone and wastes time.
* Push harder for reactive programming where user-triggered events are key for the user experience.

### Footnotes
[^1]: You can read more about IBM BPM (Business Process Manager) [here](http://www-03.ibm.com/software/products/en/business-process-manager-family).
[^2]: BDD was a good solution for Brazos UI because we wanted to test the different components like an end user would interact with them (hence "behavioral" testing).
[^3]: You can read more about that project [here]({{ site.url }}/projects/bp3-testing-framework/)
[^4]: This debugging feature would use the debug versions of the framework, which is easier to read and allows us to place breakpoints for debugging.
[^5]: With source control, it's very easy to find out where and when changes were made, as commits and their messages can be searched.