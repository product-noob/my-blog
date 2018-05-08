---
published: false
title: Automatically host a gollum wiki with the supervisor
classes: wide
categories:
  - Tools
tags:
  - ROS
  - Automation
---

Gollum wiki plays an important role in my research and study for keeping small pieces of knowledge organized. When I want to write a note, or keep some useful links, I fire up a web browser and write them down in my wiki through the built-in web editor for markdown. Thus, hosting my wiki locally all the time is pretty important for me.

Previously, I use service tools (such as systemd, upstart) coming with the Ubuntu system to automatically host the wiki when system starts. 
But sometimes you are not even sure which tool you system is using. Maybe both exist. And it seems not that simple to set up a service for a beginner.

Thus, I switch to the supervisor, a process control system, to manage the programs running in the background. So far, I am happy with it since it's easy to install, configure and update. In addition, it provides a web gui to control the state of programs. What a nice feature to have!


## Installation
Installation of supervisor is pretty simple.
```bash
sudo apt-get install supervisor
```
## Configuration
