#!/usr/bin/env node

exports.wdgxg = function (options) {
    const fs = require('fs-extra')
    var shell = require('shelljs');

    file = ''


    bt = false

    async function ifwb(basepath) {
        const packageObj = await fs.readJson('./wdgX-config.json')
        b = false
        for (i in packageObj.disable_index) {
            if (packageObj.disable_index[i] == basepath) {
                b = true
            }
        }
        return b
    }

    async function gci(basepath){
        const packageObj = await fs.readJson('./wdgX-config.json')
        
    }


    async function CheckwdgX() {
        try {
            const packageObj = await fs.readJson('./wdgX-config.json')
            console.log("Finded \"wdgX-config.json\"\nNow production begins")
            
        } catch (err) {
            console.log("You are not initialized. Please execute \"wdgx -i\"")
        }
    }


    CheckwdgX()
}