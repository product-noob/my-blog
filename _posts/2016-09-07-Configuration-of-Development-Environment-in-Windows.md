---
published: true
clasess: wide
categories:
  - Tools
tags:
  - Optimization
---

### 安装步骤
**requirements:**

* VS2010 Professional   
* [Opencv 2.2](http://sourceforge.net/projects/opencvlibrary/files/opencv-win/2.2/OpenCV-2.2.0-win32-vs2010.exe/download)  
	1. 下载后直接安装， 默认路径  
* [Ipopt binary](https://github.com/robotology/icub-main/releases/download/v1.4.0/iCub_1.4.0_v10_x86_1.exe)  
	1. 下载后点开，只勾选ipopt选项，然后安装，记下安装路径  
* Eigen  
* planner
* devLibrary
* 打开工程项目，根据上述库的安装位置更新相应配置    


### 可能出现的问题
当直接关闭控制台窗口时，可能出现如下问题：

```
forrtl: error (200): program aborting due to control-C event
```

原因：[http://www.mathworks.com/matlabcentral/newsreader/view_thread/251203.html](http://www.mathworks.com/matlabcentral/newsreader/view_thread/251203.html)
