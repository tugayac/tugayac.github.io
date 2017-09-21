---
layout: project
title:  "System Monitoring Application"
excerpt: "In 2014 and 2015, I worked on a BPM environment monitoring project that allowed monitoring various system and BPM-specific parameters. The system could be configured to notify sysadmins when a threshold was passed. Although eventually only used internally, this was my first and solo project at BP3."
type: "work"
tag:
- bp3
- monitoring
- bpm
- system
- sysadmin
comments: true
thumbnail: system-monitoring.png
technologiesUsed:
  - "Go"
  - "Jython"
  - "Sensu (0.18+)"
  - "Zendesk REST API"
  - "Java 7"
  - "Nagios Plugins"
  - "Redis"
---
## Introduction
This project was initially designed to help diagnose customers' BPM environment issues, as BP3's customers frequently had performance issues on their systems running IBM BPM. Although eventually only used internally to monitor BP3's internal BPM environments, it was designed to automatically open or update support tickets to notify support of issues with environments.

<figure>
  <a href="https://raw.githubusercontent.com/sensu/uchiwa/master/docs/uchiwa-ui.png"><img src="https://raw.githubusercontent.com/sensu/uchiwa/master/docs/uchiwa-ui.png"></a>
  <center><figcaption>The UI for this project looks similar to <a href="https://github.com/sensu/uchiwa">Uchiwa's</a>, which is the dashboard that comes with Sensu.</figcaption></center>
</figure>

### What is BPM Environment Monitoring?
Generally, servers are monitored for simple metrics such as:
* Average CPU utilization
* Average RAM usage
* Disk space
* Top CPU utilizing processes. 

However, BPM environments require further monitoring of their variables, such as JVM settings, database sizes, and average task completion time, as these variables can be bottlenecks to system and BPM performance. Getting some of this information requires "jumping through hoops", especially for IBM BPM environments[^1].

## My Responsibilities
During 2014 and 2015, I was responsible for designing, implementing, and delivering this project, while receiving some help from other developers during the implementation phase. As this was my first (and solo) project at BP3, I faced several challenges. Despite my shortcomings, this was a great learning experience and I believe it has helped immensely improve my engineering skills.

Once ready for production use, our sysadmin would take over the task of running this product, meaning I had to work closely with him to ensure he was having an exceptional user experience when using and maintaining this product.

## Design and Technologies Used
This project was designed to consist of 3 parts:
* Sensu (consisting of clients and servers), to get monitoring information from systems, aggregating them, and then forwarding them to the synchronizer.
* The synchronizer and notifier, responsible for parsing information forwarded by Sensu. Based on existing tickets, it would either update them or create a new one on Zendesk.
* Zendesk, which was the company's support website. The synchronizer and notifier were responsible for reporting all issues here. Zendesk was essentially being used as the "database" of issues.

Since this project was initially intended to be sold to customers (with the synchronizer and notifier being offered as a [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) product), it was designed to be scalable and easy to install for customers.

### Sensu Monitoring Tool
[Sensu](https://github.com/sensu/sensu) is an open source monitoring tool for decentralized monitoring. Multiple clients and servers can be installed that allow clients to connect to any of the available servers for relaying their findings. Sensu also comes with a web UI, where users can monitor systems in real-time. Sensu servers can then be configured to forward their findings (in our case, via email) through a provided API.

<figure>
  <a href="https://sensuapp.org/docs/1.0/img/sensu-diagram.gif"><img src="https://sensuapp.org/docs/1.0/img/sensu-diagram.gif"></a>
  <center><figcaption>The simple architecture of Sensu <a href="https://sensuapp.org/docs/latest/overview/architecture.html">Sensu</a>.</figcaption></center>
</figure>

#### Nagios
Nagios is an industry standard for monitoring systems and networks. It offers [thousands of open source plugins](https://exchange.nagios.org/) for use with various monitoring tasks. A few drawbacks of Nagios are high barrier to entry (as it doesn't have a clear client-server architecture like Sensu does) and a dated web UI . Since Sensu is decentralized, configuring it is relatively easier: Sensu clients only need one server to connect to, which they are then redirected to other servers if needed. **In addition, Sensu supports the usage of Nagios plugins**.

<figure class="half">
  <a href="https://jira.hyperic.com/secure/attachment/22306/Screenshot-1.jpg"><img src="https://jira.hyperic.com/secure/attachment/22306/Screenshot-1.jpg"></a>
  <a href="https://www.nagios.com/wp-content/uploads/2016/02/Modern_Web_Interface_Drop_5.jpg"><img src="https://www.nagios.com/wp-content/uploads/2016/02/Modern_Web_Interface_Drop_5.jpg"></a>
  <center><figcaption>The left side shows the old Nagios interface, while the right side shows the new Nagios interface (not available at the time of development of this project)</figcaption></center>
</figure>

### Synchronizer and Notifier
When Sensu detected problems, it was configured to forward this information to a central email account. We used a listener (implemented in Java) on this email account, which were then synchronized (using our synchronizer implemented in Go) with the ones already stored in Redis. If no tickets existed on Zendesk for incoming problems, a new ticket was created. Otherwise, the existing tickets were updated with new information.

#### Redis
[Redis](https://redis.io/) is an open source, in-memory data store that can be used as a database or cache. I chose to use Redis because I was only storing Zendesk ticket IDs against Sensu monitoring information. A disk-based database system was not needed in this case (and not as easy to scale), as Redis excels in key-value pair storage and hashes. Since Redis can also be backed up, this eliminated the problem of losing data in the case of crashes.

#### Why Go?
At the time, the Go language was recently released and was praised for its excellence at concurrent programming. Seeing as our goal was to create scalable software, Go was the perfect candidate.

<figure>
  <a href="{{ site.url }}/assets/img/projects/system-monitoring/architecture.png"><img src="{{ site.url }}/assets/img/projects/system-monitoring/architecture.png"></a>
  <center><figcaption>A high-level architecture diagram, showing all the interconnected modules. The Synchronizer and Notifier was programmed in Go and use Redis to keep track of related tickets.</figcaption></center>
</figure>

## Difficulties Faced
The biggest problems faced were due to security constraints of customers:
* Getting information from IBM BPM would be restricted to what an admin user was allowed to do, i.e. we would not be allowed to directly access databases. The solution to this was to use Jython scripts that could be executed through `wsadmin` (the [command line tool for IBM BPM](https://en.wikipedia.org/wiki/Wsadmin)), which allowed me to scrape extensive information, including aggregating data that existed in the database.
* While installing Sensu clients and servers in customer environments would require access to all of their systems, the main concern was sending information from Sensu to our systems for analysis. It would be difficult to get customers to open up new outgoing ports. Our solution was to use email (which would be a port that's already open in customer environments), even though being able to use a message queue (such as any [AMQP](https://www.amqp.org/) implementation) would've been more efficient and involve less parts that can potentially fail.

## What Did I Learn From This Project?
* The most efficient solution for engineering may not always be the most efficient solution for support and operations. For example, using AMQP for message delivery from customer environments to ours would've been the golden solution for an engineer, while using email is the best solution for support and operations, as they don't have to deal with customer bureaucracy for opening new ports.
* Modular software is easy to scale. Sensu's client-server architecture was a great example, which I implemented for our synchronizer and notifier as well (We could have multiple synchronizers and notifiers connected to the same Redis database).
* Making use of existing solutions can save time and money, but implementing new solutions that work with existing ones can also provide a lot more flexibility in the long run.

## What Would I Do Different Next Time?
* This being my first and solo project, I often introduced scope creep, despite having weekly progress meetings. This was a great lesson for me on why working in teams is often better than working solo.
* Having no product manager or customer advocates, it was difficult to gauge the use cases for customers. It's important to include someone who is advocating for the customer.

## Footnotes
[^1]: A former coworker [wrote a great article on how to get some of this information](https://support.bp-3.com/hc/en-us/articles/201297396-BPM-Monitoring-overview)
