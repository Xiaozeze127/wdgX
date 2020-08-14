import os
import time
import math

path = "mirrors/"  # Folder Path
printprogressbar = True  # progress bar (beta)
t_html = "mirrors/dhtml/t.html"  # t_html path(Please read READEME.md)
d_html = "mirrors/dhtml/d.html"  # d_html path(Please read READEME.md)

# Init
filenum = 0
jd = 0


def gci(filepath):
    global filenum
    for fi in sorted(os.listdir(filepath)):
        fi_d = os.path.join(filepath, fi)
        if (("index.html" in fi_d) or ('git' in fi_d) or ('CNAME' in fi_d) or ('.DS_Store' in fi_d) or ('README.md' in fi_d) or ('img' in fi_d) or ('dhtml' in fi_d) or ('json' in fi_d) or ('js' in fi_d) or ('css' in fi_d)):  # Folder to mask
            continue
        elif os.path.isfile(fi_d):
            filenum = filenum + 1
            print(fi_d)
        else:
            filenum = filenum + 1
            print(fi_d)
            gci(fi_d)
    return filenum


def chtml(basepath):
    global jd
    for item in sorted(os.listdir(basepath)):
        path = os.path.join(basepath, item)
        if (('index.html' in path) or ('git' in path) or ('CNAME' in path) or ('.DS_Store' in path) or ('README.md' in path) or ('img' in path) or ('dhtml' in path) or ('json' in path) or ('js' in path) or ('css' in path)):  # Folder to mask
            continue
        elif os.path.isfile(path):
            modifiedTime = time.localtime(os.stat(path).st_mtime)
            mTime = time.strftime('%Y-%m-%d %H:%M:%S', modifiedTime)
            indexhtml = open(os.path.dirname(
                path)+"/index.html", "a+", encoding='UTF-8')
            indexhtml.write(
                "<tr class=\"tbody\"><td><a class=\"tname\" href=\""+str(os.path.basename(path)).replace(' ', '%20')+"\">"+str(os.path.basename(path))+"</a></td>"+"<td><a class=\"tt\">"+mTime+"</a></td></tr>")
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
        else:
            modifiedTime = time.localtime(os.stat(path).st_mtime)
            mTime = time.strftime('%Y-%m-%d %H:%M:%S', modifiedTime)
            indexhtml = open(os.path.dirname(
                path)+"/index.html", "a+", encoding='UTF-8')
            indexhtml.write(
                "<tr class=\"tbody\"><td><a class=\"tname\" href=\""+str(os.path.basename(path)).replace(' ', '%20')+"\">"+str(os.path.basename(path))+"</a></td>"+"<td><a class=\"tt\">"+mTime+"</a></td></tr>")
            indexhtml.close
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
            chtml(path)


def htop(basepath):
    global jd
    for item in sorted(os.listdir(basepath)):
        path = os.path.join(basepath, item)
        if (('index.html' in path) or ('git' in path) or ('CNAME' in path) or ('.DS_Store' in path) or ('README.md' in path) or ('img' in path) or ('dhtml' in path) or ('json' in path) or ('js' in path) or ('css' in path)):  # Folder to mask
            continue
        elif os.path.isfile(path):
            indexhtml = open(os.path.dirname(
                path)+"/index.html", "w+", encoding='UTF-8')
            thtml = open(t_html, "r+", encoding='UTF-8')
            indexhtml.write(thtml.read())
            if not(path+"index.html" == os.path.dirname(path)+"/index.html"):
                indexhtml.write(
                    "<tr class=\"tbody\"><td><a class=\"tname\" href=\"..\">Parent directory/</a></td>"+"<td><a class=\"tt\">"+"-"+"</a></td></tr>")
            thtml.close
            indexhtml.close
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
        else:
            indexhtml = open(os.path.dirname(
                path)+"/index.html", "w+", encoding='UTF-8')
            thtml = open(t_html, "r+", encoding='UTF-8')
            indexhtml.write(thtml.read())
            if not(os.path.dirname(path)+"/index.html" == "mirrors/index.html"):
                indexhtml.write(
                    "<tr class=\"tbody\"><td><a class=\"tname\" href=\"..\">Parent directory/</a></td>"+"<td><a class=\"tt\">"+"-"+"</a></td></tr>")
            indexhtml.close
            thtml.close
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
            htop(path)


def hend(basepath):
    global jd
    for item in sorted(os.listdir(basepath)):
        path = os.path.join(basepath, item)
        if 'index.html' in path:
            indexhtml = open(os.path.dirname(
                path+'/index.html'), "a+", encoding='UTF-8')
            dhtml = open(d_html, "r+", encoding='UTF-8')
            indexhtml.write(dhtml.read())
            indexhtml.close
            dhtml.close
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
        elif not(os.path.isfile(path)) and not(('index.html' in path) or ('git' in path) or ('CNAME' in path) or ('.DS_Store' in path) or ('README.md' in path) or ('img' in path) or ('dhtml' in path) or ('json' in path) or ('js' in path) or ('css' in path)):  # Folder to mask
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')
            hend(path)
        elif not(('index.html' in path) or ('git' in path) or ('CNAME' in path) or ('.DS_Store' in path) or ('README.md' in path) or ('img' in path) or ('dhtml' in path) or ('json' in path) or ('js' in path) or ('css' in path)):  # Folder to mask
            jd += 1
            if printprogressbar:
                print("<", end='')
                for i in range(0, int((jd * 100 / 3) / filenum)):
                    print("*", end='')
                for i in range(int((jd * 100 / 3) / filenum), 100):
                    print(" ", end='')
                print(">    ", end=' ')
                print(str(int((jd * 100 / 3) / filenum)) + "%   ", end=' ')
                print(str(jd) + "/" + str(filenum * 3), end='\r')


gci(path)
htop(path)
print("Successful 1/3                                                                                             ", end="\n")
chtml(path)
print("Successful 2/3                                                                                             ", end="\n")
hend(path)
print("Successful 3/3                                                                                             ", end="\n")
