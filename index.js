#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import chalkAnimation from 'chalk-animation'
import { createSpinner } from 'nanospinner'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url);
import process from 'process'
import shell from 'shelljs'

let folderName;
let bundledFileName;
let autoBundle;
let uncompiledJSFile;
let htmlFile;

const demo = ''

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome(){
    const welcomeMsg = chalkAnimation.karaoke(
        'Welcome to the DOM-Shortener Configuration Panel. \n'
    )

    await sleep(4500)
    welcomeMsg.stop()

    console.log(`
${chalk.blue('This process will only take a few seconds.')}
    `)
    await sleep(750)
    console.log(`${chalk.blue('You will need to choose a few options on how you want to configure the DOM-Shortener')}
    `)
}

async function configure(){
    const configFolder = await inquirer.prompt({
        name: 'folder_name',
        type: 'input',
        message: 'Name of folder:',
        default() {
            return 'App'
        },
    })

    const init = await inquirer.prompt({
        name: 'bundled_file',
        type: 'input',
        message: 'Name of bundled file:',
        default() {
            return 'Bundle'
        }
    })

    const refresh = await inquirer.prompt({
        name: 'refresh?',
        type: 'confirm',
        message: 'Auto compile?',
        default() {
            return true
        }
    })

    const uncompiledFileName = await inquirer.prompt({
        name: 'uncompiled_file',
        type: 'input',
        message: 'Name of uncompiled file(include tag(e.g js)):',
        default() {
            return 'script.js'
        }
    })

    const html = await inquirer.prompt({
        name: 'html',
        type: 'input',
        message: 'Name of HTML file(include tag(e.g html)):',
        default() {
            return 'index.html'
        }
    })

    folderName = configFolder.folder_name
    bundledFileName = init.bundled_file
    autoBundle = refresh['refresh?']
    uncompiledJSFile = uncompiledFileName.uncompiled_file
    htmlFile = html.html
}

async function dotheShit() {
    const spinner1 = createSpinner(chalk.green('Processing Information...'))
    const spinner2 = createSpinner(chalk.green('Initializing Folder...'))
    const spinner3 = createSpinner(chalk.green('Configuring settings...'))
    const spinner4 = createSpinner(chalk.green('Creating files...'))
    const spinner6 = createSpinner(chalk.green('Processing...'))
    const start = Date.now()
    spinner1.start()
    await sleep(550)
    spinner1.success()
    // await sleep(250)
    spinner2.start()
    const __dirname = path.dirname(__filename)
     fs.mkdirSync(path.join(__dirname, folderName))
    // await sleep(550)
    spinner2.success()
    // await sleep(250)
    spinner3.start()
    fs.copyFileSync('boilerplate.html', `./${folderName}/${htmlFile}`)
    fs.copyFileSync('demo.js', `./${folderName}/${uncompiledJSFile}`)
    // await sleep(550)
    spinner3.success()
    // await sleep(250)
    spinner4.start()
    if(autoBundle){
        shell.exec(`cd ${folderName}`)
        shell.exec('npm init -y')
        shell.exec('npm install dom-shortener')
        shell.exec('npm install -g browserify')
        shell.exec(`cd ${folderName}`)
    }else{
        shell.exec(`cd ${folderName}`)
        shell.exec('npm init -y')
        shell.exec('npm install dom-shortener')
        shell.exec('npm install -g browserify')
        shell.exec(`cd ${folderName}`)
    }
    // await sleep(750)
    spinner4.success()
    await sleep(250)
    const duration = Date.now() - start
    const spinner5 = createSpinner(chalk.green(`Configuration finished in ${duration} ms`))
    spinner6.start()
    await sleep(500)
    spinner6.success()
    console.clear()
    spinner5.success()
    if(autoBundle){
        let end = chalkAnimation.pulse(
            `Run: npx watchify ${uncompiledJSFile} -o ${bundledFileName} for autocompile. \n`
        )
        await sleep(30000)
        end.stop()
    }else{
        let end2 = chalkAnimation.pulse(
            `Run: browserify ${uncompiledJSFile} -o ${bundledFileName} to compile. \n`
        )
        await sleep(30000)
        end2.stop()
    }
}



await welcome()
await configure()
await dotheShit()
