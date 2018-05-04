---
published: true
classes: wide
categories:
  - Tools
tags:
  - Tips
---

If you don't want to input username and password when you push git repo to gitlab server, try ssh public-key authentication.

First generate your public key if you have not already done by running the following on you computer:

```
$ ssh-keygen -t rsa
```

You will see two files are generated. One is private. The other one is public.

Next open the public one, and copy it to the gitlab server.  

Now , add the private key to your ssh agent by typing the command below.

```
$ssh-add private-key-name  
```
(maybe you should write this command to ~/.bashrc file)

You can push your code to gitlabserver now.
