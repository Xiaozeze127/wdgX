#!/usr/bin/env node

const { ALPN_ENABLED } = require('constants');

exports.wdgxc = function (options) {
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

    async function gci(dir, callback, finish) {
        err = 3
        fs.readdir(dir, function (err, files) {
            if (err) {
                console.error(err)
                return
            }
            try {
                if (packageObj.path != dir) {
                    fs.unlink(dir + '/index.' + packageObj.suffix, (err) => {
                        if (err);
                    });
                }
                else {
                    fs.unlink(dir + 'index.' + packageObj.suffix, (err) => {
                        if (err);
                    });
                }
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
            }
            catch {
                files.forEach((filename, index) => {
                    let pathname = path.join(dir, filename)
                    if (path.basename(pathname).indexOf(packageObj.disable_index[i]) != -1) {
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
                    }
                })
            }

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