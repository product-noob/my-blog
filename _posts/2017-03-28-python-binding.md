---
published: true
title: Python binding
classes: wide
categories:
  - Tools
tags:
  - ROS
  - Programming
---

Basically there are two ways to create python bindings for your ros libraries.
One way is to start from scratch and shows all the necessary details to create the python interfaces for c++ libraries in CMakeLists.txt.
You can find a working example from [https://github.com/luator/boost-python-catkin-example](https://github.com/luator/boost-python-catkin-example)

The necessary step is lised below:
1. find the boost python component and python libraries.
2. catkin_python_setup()
3. add_libraries()
4. install the shared the libraries called by python interfaces to the place where python can find it.   


The second way is to using the tool developed by ETHZ-ASL.
Their tool use the catkin_simple() package to simplify the cmakelists script you need to write and hides all the details within
their helper package--`python_module`.  At a first glimpse, it's very confusing. But if you understand how the first method works, you can
basically create a tool similar to ASL's, or even a better one.

The helper package is called `python_module`. It provides a script function `add_python_export_library()` that helps you to find
the boost python component, python libraries folder, python include folder.  It also adds the libraries by invoking the
native cmake command add_libraries() in their `python_module` package. The 'catkin_python_setup()' is called as well.
The 'python_module' marks the installed files as `ADDITIONAL_MAKE_CLEAN_FILES`, which makes updating of the python module handy.

They have several assumptions when using their tool to create python bindings.
1. The python interfaces are separated from c++ ros package as a new package.
2. The python binding ros package names after the original c++ package with a suffix `_python`.
3. The name of the installed python module in dists-package will be the same as the c++ package.

A typical example of their method can be found [here](https://github.com/ethz-asl/Schweizer-Messer/tree/master/sm_python)

The detailed instruction of ETHZ-ASL's method can be found [here](https://github.com/ethz-asl/programming_guidelines/wiki/Adding-python-bindings-to-your-cpp-catkin-package)
