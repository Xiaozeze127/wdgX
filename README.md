# Static-Webpage-fake-catalogue-
静态网页目录生成

# 配置：

path:要生成的目录  
printprogressbar(试验阶段):是否启用进度条(会比平常生成速度慢)  
t_html:网页上显示目录前面的html [例子](https://github.com/wuhaneduyun/mirrors/dhtml/t.html)  
d_html:网页上显示目录后面的html [例子](https://github.com/wuhaneduyun/mirrors/dhtml/d.html)  

```python
if (('index.html' in path) or ('git' in path) or ('CNAME' in path) or ('.DS_Store' in path) or ('README.md' in path) or ('img' in path) or ('dhtml' in path) or ('json' in path) or ('js' in path) or ('css' in path)):
```
2处！配置要屏蔽的文件名（相对路径也可以，例如mirrors/wuhaneduyun）


# 效果：

根据目录文件生成伪目录，[例子](https://mirrors.maftertstudio.com)