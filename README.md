# Static site generation directory

静态网页目录生成

# 配置

path:要生成的目录  
printprogressbar:是否启用进度条(会减慢处理速度)  
t_html:网页上显示目录前面的html [例子](https://github.com/wuhaneduyun/mirrors/blob/master/dhtml/t.html)  
d_html:网页上显示目录后面的html [例子](https://github.com/wuhaneduyun/mirrors/blob/master/dhtml/d.html)  
disable_index:不需要生成成网页的文件或目录

## disable_index

如果添加目录，则该目录下所有子目录都不会生成网站  
如果添加文件，则生成目录时不会添加该文件

# 效果

根据目录文件生成伪目录，[例子](https://mirrors.maftertstudio.com)