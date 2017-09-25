---
layout: project
title:  "Automated Testing Framework"
excerpt: "In the summer of 2016, I worked on developing an automated testing framework. This was a solution intended to be used to write automated UI tests for Brazos UI. However, the project was designed to be modular, such that it can be used to write automated tests for non-browser and non-BPM projects as well."
type: "work"
tag:
- bp3
- automation
- automated
- testing
- brazos
comments: true
thumbnail: "cucumber-logo.png"
thumbnailCustomCSS: "padding: 10px;"
technologiesUsed:
  - "Java 8"
  - "Selenium (3.x)"
  - "Selenide (4.x)"
  - "Guice"
  - "Cucumber-JVM (1.x)"
  - "JUnit (4.x)"
---
## Introduction
After being approached by management to improve our testing capabilities for [Brazos UI](https://www.bp-3.com/products/brazos-user-experience-framework/), I proposed an automation framework as a potential solution, as tests for it were being run manually by the testing team. Working closely with the development and the testing team, I implemented a modular framework that could be used to write automation tests for any platform. Currently, it provides a framework for writing automation tests for the web, IBM BPM (which is what Brazos UI needs) and any other application that can be used with Java.

<figure class="third">
  <a href="{{ site.url }}/assets/img/projects/testing-framework/selenide-logo.png"><img src="{{ site.url }}/assets/img/projects/testing-framework/selenide-logo.png"></a>
  <a href="{{ site.url }}/assets/img/projects/testing-framework/selenium-logo.png"><img src="{{ site.url }}/assets/img/projects/testing-framework/selenium-logo.png" width="150"></a>
  <a href="{{ site.url }}/assets/img/projects/testing-framework/cucumber-logo.svg"><img src="{{ site.url }}/assets/img/projects/testing-framework/cucumber-logo.svg"></a>
  <center><figcaption>Selenide, Selenium, and Cucumber work together to run behavioral UI tests.</figcaption></center>
</figure>

The question often asked was, why not just use JUnit with Selenium? Because a extensive setup was needed to run UI tests with IBM BPM. Additionally, Cucumber allowed the testing team to write behavioral tests, which is closer to how a user would be interacting with IBM BPM interfaces developed in Brazos UI.

### What is UI Testing in IBM BPM
In IBM BPM, a "User Task" in a process is one where the user needs to interact with a web UI to complete the task. To make testing slightly easier, these user tasks can be run independent of processes, given they're provided with the correct variables when started. However, automating these tasks requires using the IBM BPM REST API, which generally is the most time consuming part when developing tests. Developing our own framework allowed us to hide all of this setup from the test developers, in addition to providing them with variables that they can use while writing tests.

## My Responsibilities
In 2016, I was responsible for the design, implementation, and delivery of this project. Compared to the [System Monitoring Project]({{ site.url }}/projects/bp3-system-monitoring/), I had more input from developers, as well as the end users who would be the test writers. This allowed me to deliver a product that would meet the needs of test writers, as well as code reviews that ensured codebase is maintainable by other developers. I strived to provide extensive documentation for both developers and test writers, as well as a video that demonstrated how to setup and use the framework.

## Design and Technologies Used
As this project was designed to be extensible, the initial release consisted of 3 parts:
* The base module that allowed writing behavioral tests using Cucumber. These behavioral tests could be written for any application that was developed in Java.
* The browser automation module that was built on top of the base module, that allowed writing behavioral tests using Cucumber and Selenium. Selenium was abstracted with another library called Selenide, which provided easier ways of selecting elements on a web UI.
* The IBM BPM automation module that was built on top of the browser automation module. Test writers just had to specify the name of the user task being tested. The starting and finishing of the task through the IBM BPM REST API was abstracted out (through the use of another internal library) and the test writers never had to deal with this (expect for providing login information, which was also entered automatically).

<figure>
{% highlight gherkin %}
Feature: Sign up

Sign up should be quick and friendly.

Scenario: Successful sign up
New users should get a confirmation email and be greeted
personally by the site once signed in.

Given I have chosen to sign up
When I sign up with valid details
Then I should receive a confirmation email
And I should see a personalized greeting message
{% endhighlight %}
<center><figcaption>An example of how a behavioral test is described with Cucumber-JVM. The test writers write code for execution for the lines that start with green highlighted words. Taken from <a href="http://toolsqa.com/cucumber/behavior-driven-development/">ToolsQA.com</a></figcaption></center>
</figure>

In addition to the capabilities mentioned above, event listeners and hooks for various lifecycle events were offered that allowed test writers to run code before and after user tasks, or before a specific behavior was run.

The extensibility of the framework was demonstrated when another developer added support for mobile browser testing, while the readability was demonstrated when the same developer upgraded the Selenium and Selenide versions.

## Difficulties Faced
The greatest difficulty I faced was the lack of extensibility of Cucumber-JVM. Unfortunately, Cucumber-JVM was packaged without public classes, meaning that most of the existing classes could not be extended to add desired functionality. As such, this required me to directly modify Cucumber-JVM source code, which was undesirable, but necessary to get what I needed. Fortunately, Cucumber-JVM is already a stable library and is unlikely to change much in the near future.

## What Did I Learn From This Project?
* It's important to get code reviews from other developers and input from your end users, so that maintainable and effective software can be developed.
* Detailed documentation and descriptive API calls are important for new users. After the initial release of the automation framework, I got very few questions from test writers on how to use this framework.
* Initial research is important to rule out potentially existing solutions. If there are any existing solutions that get the job done, they should be used instead of a custom solution (in this case there weren't any), as maintenance and training costs can be high.

## What Would I Do Different Next Time?
* Contact the authors of the libraries I'm utilizing if I encounter any issues. It would have helped if Cucumber-JVM's classes had a public modifier, which I believe I would've been able to get if I had simply opened up an issue on GitHub.
