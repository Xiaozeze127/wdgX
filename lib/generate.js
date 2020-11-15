#!/usr/bin/env node

const { ALPN_ENABLED } = require('constants');

exports.wdgxg = function (options) {
    const fs = require('fs-extra')
    var shell = require('shelljs');
    const path = require('path')

    err = 0;

    file = ''

    filenum = 0

    bt = false

    pathg = process.cwd()

    data = ''
    packageObj = ''
    ehtml = ''

    replace = ''
    titleid = ''

    replacef = new Array()

    async function gci(dir, callback, finish) {
        err = 3
        fs.readdir(dir, function (err, files) {
            if (err) {
                console.error(err)
                return
            }
            var cl = ""
            err = 4 //
            if (packageObj.markdown.YN) {
                cl += "---\n"
                if (packageObj.markdown.layout)
                    cl += "layout: " + packageObj.markdown.layout + "\n"
                if (packageObj.markdown.title.title) {
                    cl += "title: " + packageObj.markdown.title.title
                    if (packageObj.markdown.title.title) {
                        cl += " - /"
                        if (dir != "./")
                            cl += dir
                    }
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
            if (dir != './') {
                cl += '    var tp = "'
                cl += dir
                cl += '"'
                cl += replace
                cl += '\n'
                cl += titleid
            }
            //console.log(packageObj.change_title[0].title)

            err = 5 //
            cl += '    var tbody = document.getElementById("filelist")\n'
            err = 6 //
            if (!(packageObj.pd && (dir == packageObj.path)))
                cl += "    tbody.innerHTML += \'" + packageObj.html.replace('{0}', '../').replace('{1}', 'Parent directory').replace('{2}', '-') + '\'\n'
            for (i = 0; i < files.length; i++) {
                url = ''
                name = ''
                time = ''
                b1 = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b1 = false
                    }
                }
                if (b1) {
                    url = encodeURI(files[i])
                }
                //////////
                b = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b = false
                    }
                }
                if (b) {
                    let c = replacef[files[i]];
                    if (c != undefined) {
                        name = c
                    }
                    else {
                        name = files[i]
                    }
                }
                //////////
                b2 = true
                for (ii in packageObj.disable_index) {
                    //console.log(path.basename(pathname))
                    if (files[i].indexOf(packageObj.disable_index[ii]) == 0 || files[i].indexOf(packageObj.disable_catalog[ii]) == 0) {
                        b2 = false
                    }
                }
                if (b2) {
                    var stat = fs.statSync(dir + "/" + files[i]);
                    time = stat.mtime.toLocaleString()
                }
                if (!(url == '' && name == '' && time == '')) {
                    cl += "    tbody.innerHTML += \'" + packageObj.html.replace('{0}', url).replace('{1}', name).replace('{2}', time) + '\'\n'
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
            cl += '\n</script>'
            // console.log(cl)
            err = 9
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
        try {
            data = fs.readFileSync(pathg + '/wdgX-config.json')
            packageObj = JSON.parse(data)
            console.log("Finded \"wdgX-config.json\"\nNow production begins")
            err = 1;
            ehtml = fs.readFileSync(packageObj.e_html, 'utf-8')
            err = 2;
            for (var i = 0; packageObj.change_title[i]; i++) {
                replace = '.replace(\'' + packageObj.change_title[i].title + '\',\'' + packageObj.change_title[i].to + '\')'
                replacef[packageObj.change_title[i].title] = packageObj.change_title[i].to 
            }
            for (var i = 0; packageObj.changewebsitetitle[i]; i++) {
                titleid += '    var title' + i + ' = document.getElementById("' + packageObj.changewebsitetitle[i] + '");\n'
                titleid += '    title' + i + '.innerHTML += \' - /\' + tp\n'
            }
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
            switch (err) {
                case 0:
                    console.log("You are not initialized. Please execute \"wdgx -i\"")
                case 1:
                    console.log("Can't find e.html")
                case 2:
                    console.log("Unknown error")
                case 3:
                    console.log("There may be a problem with the path setting")
                case 4:
                    console.log("There is a problem with the markdown setting. You may use older configuration, please refer to https://wdgx.com.cn")
                case 5:
                    console.log("There is a problem with cttp or hcttp settings")
                case 6:
                    console.log("There is a problem with the pd setting. You may use older configuration, please refer to https://wdgx.com.cn")
                case 7:
                    console.log("There is a problem with the disable_index or disable_catalog setting")
                case 8:
                    console.log("There is a problem with the change_title setting")
                case 9:
                    console.log("Failed to open file, may require administrative privileges")
            }
        }
    }


    CheckwdgX()
}