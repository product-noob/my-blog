# yuzhangbit.github.io


My website based on the minimal mistakes theme.

The default branch is the `source` where I enable the jekyll-scholar plugin. The master branch is for publishing gh-pages. The other jekyll plugins that are not supported by github pages can be installed to this branch as well.



## Several interesting changes I have made.  

* Create a bibliography template ([bibtemplate.html](https://github.com/yuzhangbit/yuzhangbit.github.io/blob/source/_layouts/bibtemplate.html)). It display the bibentries, the publishing status and doi.  The corresponding buttons can be customized
using scss style file ([_buttons.scss](https://github.com/yuzhangbit/yuzhangbit.github.io/blob/source/_sass/minimal-mistakes/_buttons.scss#L101))
* The ieee citing style is modified.
    * The index is removed.
    * The title of the paper is bold.
    * The initialization of authors' name is disabled.

## Publish the website

All the developments go to the `source` branch. When everything is ready, use commands below to publish the website to the `master` branch and push to the remote.
```
rake publish
```


## Usage Cases Cheat Sheet
