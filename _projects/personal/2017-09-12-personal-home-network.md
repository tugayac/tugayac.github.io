---
layout: post
title:  "Improving the Home Network"
date:   2017-09-12
excerpt: "Since 2015, I have been running my home network on pfSense, an open source router and firewall distribution, due to my frustration with the lack of customization of traditionally \"store bought\" routers. This ongoing process has given me the ability to easily fix home network issues without the help of a third-party, block unwanted requests being made to my home network, and allowed me to host various applications on my home server."
type: "personal"
tag:
- personal
- home
- network
- pfSense
- router
- firewall
- unix
- terminal
comments: true
---
## Technologies Used
* pfSense (Latest Version)
* CentOS (v6.5)
* Ubuntu Server (v14+ LTS)

## Introduction
Beginning in 2015, I desired more control over my home network setup to be able to easily host web servers, Docker containers, and game servers for friends. As a developer who loves experimenting with new technology, customization of firewall and NAT (Network Address Translation) configurations have been crucial to me.

## Development Timeline
The first step in this process was to purchase a second Network Interface Controller (NIC)[^1] for my home server. Initially, I decided to use the IPTables[^2] for CentOS. However, after several weekends of spending time on properly configuring IPTables, I decided this wasn't the right solution: Managing everything through the Unix Terminal was taking too much time.

A coworker suggested I try out pfSense. For this, I needed dedicated hardware (I could technically run pfSense as a virtual machine, but I do love building computers). And he was right: pfSense was great for my use case: At the very least, it was offering great customization of firewall and NAT rules, which is exactly what I needed. As the months went on, I made use of several other features that pfSense had to offer. Furthermore, since pfSense was based on FreeBSD (a Linux distribution), it had access to most of the packages available to FreeBSD as well.

## Network Setup
![Network Diagram]({{ site.url }}/assets/img/projects/home-network/network_diagram.png)

## Benefits of a Custom Setup
* Router can be configured through a web UI. No interaction with a terminal is required. Although consumer routers all have web interfaces today, none I have used have been designed as well as pfSense's.

<figure class="half">
  <a href="{{ site.url }}/assets/img/projects/home-network/pfsense-main.png"><img src="{{ site.url }}/assets/img/projects/home-network/pfsense-main.png"></a>
  <a href="{{ site.url }}/assets/img/projects/home-network/pfsense-nat.png"><img src="{{ site.url }}/assets/img/projects/home-network/pfsense-nat.png"></a>
  <center><figcaption>pfSense home page for the router (on the left) and NAT configuration page (on the right). Details are blacked-out for security reasons.</figcaption></center>
</figure>

* Custom NAT: Allows redirecting internet traffic to specific devices and ports, such as my home server. This way, I am able torun multiple Docker containers on my home server, on different ports.
* Custom Firewall: Allows blocking unwanted access to my home network, such as disabling responses to ping request (ICMP).
* Dynamic and Static IP assignment: Static IP assignment is useful when servers need to always be located on the same IP address for development.
* Custom DNS: I can override DNS for all devices in my home network. This prevents me from relying on my ISP's DNS in cases of outages and lets me choose the most responsive DNS servers. Additionally, I can configure DNS caching on my router for faster domain name resolution.
* Dynamic DNS (DDNS): A big problem with consumer internet services is assignment of dynamic IP addresses by ISPs. This means your external IP address can change at any time, which is a problem if
you're hosting servers at home. To avoid this problem, pfSense can make use of DDNS, notifying your domain name provider of IP address changes.

<figure>
  <a href="{{ site.url }}/assets/img/projects/home-network/namecheap-ddns.png"><img src="{{ site.url }}/assets/img/projects/home-network/namecheap-ddns.png"></a>
  <center><figcaption>Namecheap.com provides a great interface to use DDNS.</figcaption></center>
</figure>

* OpenVPN: Allows setting up VPN for my home network. This is very useful when I'm away from home and need to access my servers at home. pfSense also has tools to let you sign your own certificates.
* Squid Reverse Proxy: Useful for hosting multiple web servers. Allows resolving subdomains to specific ports on my servers, so that ports don't have to be specified when going to a URL. For example, `www.myhomeservers.com:8080` can be replaced with `server1.myhomeservers.com`, which can internally be redirected to port 8080 in my home network.
* Squid Proxy: Useful for caching data locally to increase response time and decrease bandwidth usage.
* Ability to choose hardware that serves throughput needs: Since pfSense runs on standard desktop hardware, I can upgrade the parts as needed.
* Ability to expand and upgrade when needed: I can add more components to get more out of my router. For example, I can increase (or decrease) the number of ethernet ports.
* pfSense vs IPTables: While IPTables is a great tool for firewalls, it is dated and difficult to configure. As much as I like tinkering in the terminal, a web UI allows for a better user experience.
* Ability to Backup config: I can backup the entire configuration and reload it in-case something goes wrong with my router. I restored from backup once, when I installed pfSense on new hardware.

## Drawbacks of a Custom Setup
* I am currently the only one who knows how to utilize the router's web UI. If I am not around and the home network goes offline, there's no one to fix the problem.
* Errors can lead to disasters: Since firewall and NAT are configured by me, it is possible that I can leave ports open, leaving devices on my home network vulnerable to attacks. Thankfully, pfSense can be configured to reject any incoming connection that is not defined in the firewall, as long as those connections have not been established from the home network.

## Footnotes
[^1]: A device used to provide additional ethernet ports on a computer
[^2]: [IPTables](https://wiki.centos.org/HowTos/Network/IPTables) is a Linux command line utility to create kernel-level firewall rules.
