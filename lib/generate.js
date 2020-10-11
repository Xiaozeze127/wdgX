#!/usr/bin/env node

const { ALPN_ENABLED } = require('constants');

exports.wdgxg = function (options) {
    const fs = require('fs-extra')
    var shell = require('shelljs');
    const path = require('path')

    file = ''

    filenum = 0

    bt = false

    pathg = process.cwd()

    data = ''
    packageObj = ''
    ehtml = ''

    async function gci(dir, callback, finish) {
        fs.readdir(dir, function (err, files) {
            if (err) {
                console.error(err)
                return
            }
            var cl = ""
            if (packageObj.markdown.YN) {
                cl += "---\n"
                if (packageObj.markdown.layout)
                    cl += "layout: " + packageObj.markdown.layout + "\n"
                if (packageObj.markdown.title.title) {
                    cl += "title: " + packageObj.markdown.title.title
                    if (packageObj.markdown.title.cttp)
                        cl += " - " + dir
                    cl += "\n"
                }
                if (packageObj.markdown.img.img)
                    cl += packageObj.markdown.img.img + ": " + packageObj.markdown.img.file + "\n"
                if (packageObj.markdown.tags) {
                    cl += "tags: \n"
                    for (tags in packageObj.markdown.tags.length()) {
                        cl += "    - " + packageObj.markdown.tags[tags] + "\n"
                    }
                }
                if (packageObj.markdown.date)
                    cl += "date: " + packageObj.markdown.date + "\n"
                if (packageObj.markdown.updated) {
                    cl += "updated: "
                    if (packageObj.markdown.updated == true)
                        cl += new Date().toLocaleString() + "\n"
                    else
                        cl += packageObj.markdown.updated + "\n"
                }
                if (packageObj.markdown.comments)
                    cl += "comments: " + packageObj.markdown.comments + "\n"
                if (packageObj.markdown.categories) {
                    cl += "categories: \n"
                    for (categories in packageObj.markdown.tags.length()) {
                        cl += "    - " + packageObj.markdown.categories[categories] + "\n"
                    }
                }
                if (packageObj.markdown.permalink)
                    cl += "permalink: " + packageObj.markdown.permalink + "\n"
                cl += "---\n"
            }
            cl += ehtml + '\n<script>\n'
            cl += '    var tp = "' + dir + '"\n'
            if (packageObj.cttp) {
                cl += '    var title = document.getElementById("' + packageObj.cttp + '");\n'
                cl += '    title.innerHTML += \' - \' + tp\n'
            }
            if (packageObj.hcttp) {
                cl += '    var htitle = document.getElementById("' + packageObj.hcttp + '");\n'
                cl += '    htitle.innerHTML += \' - \' + tp\n'
            }
            cl += '    var tbody = document.getElementById("filelist")\n'
            cl += "    var sn = [\n"
            if (!(packageObj.pd && (dir == packageObj.path)))
                cl += "        \"Parent directory/\",\n"
            for (i = 0; i < files.length; i++) {
                b = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b = false
                    }
                }
                if (b) {
                    let c = packageObj.change_title[files[i]];
                    if (c != undefined) {
                        cl += "        \"" + c + "\",\n"
                    }
                    else {
                        cl += "        \"" + files[i] + "\",\n"
                    }
                }
            }
            cl += "    ]\n"
            cl += "    var su = [\n"
            if (!(packageObj.pd && (dir == packageObj.path)))
                cl += "        \"../\",\n"
            for (i = 0; i < files.length; i++) {
                b = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b = false
                    }
                }
                if (b) {
                    cl += "        \"" + encodeURI(files[i]) + "\",\n"
                }
            }
            cl += "    ]\n"
            cl += "    var st = [\n"
            if (!(packageObj.pd && (dir == packageObj.path)))
                cl += "        \"-\",\n"
            for (i = 0; i < files.length; i++) {
                b = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b = false
                    }
                }
                if (b) {
                    var stat = fs.statSync(dir + "/" + files[i]);
                    cl += "        \"" + stat.mtime.toLocaleString() + "\",\n"
                }
            }
            /*
            stats.atime
            表明上次访问此文件的时间戳。

            stats.mtime
            表明上次修改此文件的时间戳。

            stats.ctime
            表明上次更改文件状态的时间戳。

            stats.birthtime
            表示此文件的创建时间的时间戳。
            */
            cl += "    ]\n"
            cl += "    for (i = 0; i < sn.length; i++) {tbody.innerHTML += '<td><a class=\"tname\" href=\"' + su[i] + '\">' + sn[i] + '</a></td><td><a class=\"tt\">' + st[i] + '</a></td>'}"
            cl += '\n</script>'
            // console.log(cl)
            fs.writeFile(dir + '/index.' + packageObj.suffix, cl, "utf-8", "666", 'w+', (err, data))
            files.forEach((filename, index) => {
                let pathname = path.join(dir, filename)
                let statss = fs.statSync(pathname)
                b = false
                for (i in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (path.basename(pathname).indexOf(packageObj.disable_index[i]) == 0) {
                        b = true
                    }
                }
                if (b) {
                    return
                }
                else if (statss.isDirectory()) {
                    gci(pathname, callback, finish)
                    //console.log(pathname)
                }
                if (index === files.length - 1) {
                    finish && finish()
                }
            })
        })
    }




    async function CheckwdgX() {
        err = 0;
        try {
            data = fs.readFileSync(pathg + '/wdgX-config.json')
            packageObj = JSON.parse(data)
            console.log("Finded \"wdgX-config.json\"\nNow production begins")
            err = 1;
            ehtml = fs.readFileSync(packageObj.e_html, 'utf-8')
            gci(
                './',
                function (file) {
                    // console.log(file.toString())
                    // 读取文件后的处理
                },
                function () {
                    // console.log('Successful')
                }
            )
        } catch (err) {
            if (err == 0)
                console.log("You are not initialized. Please execute \"wdgx -i\"")
            else {
                console.log("Unknown error, possibly no e.html")
            }
        }
    }


    CheckwdgX()
}