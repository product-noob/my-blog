var store = [{
        "title": "Videos about My Work",
        "excerpt":"Dozens of videos about my motion planning and simulations work to come! Hybrid Motion Planning Library (HMPL) HMPL Highlights (state of HMPL in 2017) Semi-global Path Modification Layer Derivative-free Path Optimization Algorithm Multiple-stage State Space Sampling Path Planning Algorithm State Space Sampling Local Planner Simulation Fast Scene Modelling Experiments Forward-simulation...","categories": [],
        "tags": [],
        "url": "https://yuzhangbit.github.io/videos/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "How To Set Up Public Key Authentication?",
        "excerpt":"If you don’t want to input username and password when you push git repo to gitlab server, try ssh public-key authentication. First generate your public key if you have not already done by running the following on you computer: $ ssh-keygen -t rsaYou will see two files are generated. One...","categories": ["Tools"],
        "tags": ["Tips"],
        "url": "https://yuzhangbit.github.io/tools/How-to-set-up-public-key-authentication/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Useful Website About Optimization",
        "excerpt":"IPOPT install tutorial: http://wiki.icub.org/wiki/Installing_IPOPT NLOPT install tutorial: http://ab-initio.mit.edu/wiki/index.php/NLopt OPTIMIZATION resources: http://plato.asu.edu/guide.html Benchmarks for different optimization software: http://plato.asu.edu/bench.html GUROBI benchmarks: http://www.gurobi.com/pdfs/benchmarks.pdf wiki pages–List of optimization software: https://en.wikipedia.org/wiki/List_of_optimization_software wiki pages–Comparison of optimization software: https://en.wikipedia.org/wiki/Comparison_of_optimization_software ","categories": ["Tools"],
        "tags": ["Optimization"],
        "url": "https://yuzhangbit.github.io/tools/Useful-Website-about-Optimization/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Configuration Of Development Environment In Windows",
        "excerpt":"安装步骤 requirements:   VS2010 Professional  Opencv 2.2          下载后直接安装， 默认路径        Ipopt binary          下载后点开，只勾选ipopt选项，然后安装，记下安装路径        Eigen  planner  devLibrary  打开工程项目，根据上述库的安装位置更新相应配置可能出现的问题 当直接关闭控制台窗口时，可能出现如下问题： forrtl: error (200): program aborting due to control-C event原因：http://www.mathworks.com/matlabcentral/newsreader/view_thread/251203.html ","categories": ["Tools"],
        "tags": ["Optimization"],
        "url": "https://yuzhangbit.github.io/tools/Configuration-of-Development-Environment-in-Windows/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "The Best IDE for ROS",
        "excerpt":"I have tried Eclipse, QtCreator, Clion for c++ software development in ROS. CLion is my favorite IDE in terms of cmake based projects. For ROS or cmake based c++ projects, you can use clion out of box. If you have an university Email address, you can use CLion for free....","categories": ["Tools"],
        "tags": ["ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/The-Best-IDE-for-ROS/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Use Gtest with ROS",
        "excerpt":"There are several interesting tips you need to know about catkin tools Configuration for catkin workspace using caktin Tools enable -Wall -Wextra of the compiler to report potential coding bugs enable robust cleaning of individual packages with linked layout , actually this is a default value of catkin_toolsThe configuration is...","categories": ["Tools"],
        "tags": ["ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/Use-Gtest-with-ROS/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Python binding",
        "excerpt":"Basically there are two ways to create python bindings for your ros libraries.One way is to start from scratch and shows all the necessary details to create the python interfaces for c++ libraries in CMakeLists.txt.You can find a working example from https://github.com/luator/boost-python-catkin-example The necessary step is lised below: find the...","categories": ["Tools"],
        "tags": ["ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/python-binding/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "rosparam_handler usage",
        "excerpt":"There are two ways to set parameters in ROS. One is loading parameter value from yaml files to the parameter_server. It’s not flexible to adjust the values of parameters on parameter_server on the fly.The parameters are passed to your app classes by the private ros node handle. You have to...","categories": ["Tools"],
        "tags": ["ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/ros-param-handler/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Automatically host a gollum wiki with the supervisor",
        "excerpt":"Gollum wiki plays an important role in my research and study for keeping small pieces of knowledge organized. When I want to write a note, or keep some useful links, I fire up a web browser and write them down in my wiki through the built-in web editor for markdown....","categories": ["Tools"],
        "tags": ["Automation"],
        "url": "https://yuzhangbit.github.io/tools/supervisor_setting/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Highlighting an author's name for CV using IEEEtran",
        "excerpt":"Highlighting a specific author’s name is useful and widely used in CV. But there is no elegant way to do it with existing latex packages.The IEEEtran.bst style does not provide this functionality neither. There are many ways hacking the latex to achieve the goal. Many of them are error-prone, only...","categories": ["Tools"],
        "tags": ["Latex"],
        "url": "https://yuzhangbit.github.io/tools/highlighting-author-name-for-IEEEtran-style/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Several Ways of Writing a ROS Node",
        "excerpt":"The design of nodes varies according to the requirements of different applications. Selecting the right node pattern is pretty important for achieving certain goals.Here we mainly involve ros::spin(), ros::spinOnce(), timer, single-thread node and multi-thread node and nodelet topics. Single-thread Node ros::spinOnce vs ros::spin The ROS tutorials explain how to write...","categories": ["Tools"],
        "tags": ["ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/several-ways-of-writing-a-ros-node/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Using Apollo Algorithms in Your Normal ROS Package",
        "excerpt":"This blog will introduce how the port_apollo repository converts an apollo module to a normal ROS package and uses Apollo algorithms in your own ros package in a native linux system (i.e. ubuntu 16.04 LTS) instead of docker environments. The tested codes are based on the release apollo-v3.0.0. The goal...","categories": ["Tools"],
        "tags": ["Apollo","ROS","Programming"],
        "url": "https://yuzhangbit.github.io/tools/porting-apollo/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Use apt-get behind a socks5 proxy",
        "excerpt":"Nothing would be more frustrating than to install apt packages from sources outside of China, especially from PPA.If you try to update the c++ compiler to g++-6 or g++-7 through sudo add-apt-repository ppa:ubuntu-toolchain-r/test -ysudo apt-get updatesudo apt-get install g++-7 -yit may takes your hours to get it done. But if...","categories": ["Tools"],
        "tags": ["network"],
        "url": "https://yuzhangbit.github.io/tools/use-apt-get-behind-socks5-proxy/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"},{
        "title": "Nvidia Driver and Cuda9.0 Installation",
        "excerpt":"Tested hardware and OS configuration: OS: Ubuntu 16.04 LTS NVIDIA Graphic Card: Quadro M1000M Cuda Version: 9.0 Graphic Card Driver Version: 410.xx Disable secure boot in BIOS settingThe recommended way to install the Nvidia driver and Cuda is using .run files since the run files provide flexibility for configuration. You...","categories": ["Tools"],
        "tags": ["gpu"],
        "url": "https://yuzhangbit.github.io/tools/nvidia-driver-and-cuda9-installation/",
        "teaser":"https://yuzhangbit.github.io/assets/images/default_teaser.jpg"}]
