---
published: true
title: Use apt-get behind a socks5 proxy
classes: wide
categories:
  - Tools
tags:
  - network
---

Nothing would be more frustrating than to install apt packages from sources outside of China, especially from PPA.
If you try to update the c++ compiler to `g++-6` or `g++-7` through
```bash
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo apt-get update
sudo apt-get install g++-7 -y
```  
it may takes your hours to get it done.

But if you have a socks5 proxy out there, things will become better. The idea is to use `apt-get` behind a socks5 proxy.

`tsocks` and `proxychains` are common-used tools for this purpose. Here I choose `proxychains` over `tsocks` due to the DNS issue of `tsocks` mentioned by [this](https://serverfault.com/questions/754172/apt-get-maddeningly-doesnt-work-with-tsocks-proxy-set-up-with-ssh).

1. install `proxychains`
```
sudo apt-get install proxychains
```
2. setup for `proxychains` in `/etc/proxychains.conf`  
Since my socks5 proxy server is running at `127.0.0.1` through port `1080`, my setting is
```
socks5 127.0.0.1 1080
```
at the last line of `/etc/proxychains.conf`.

3. using `proxychaines` with `apt-get`
```bash
sudo proxychains apt-get update
sudo proxychains apt-get install g++-7 -y
```  
Done in minutes!

Enjoy!
