import inquirer from "inquirer";
import chalk from "chalk";
let userloggedin = false
let trying = 0
let Userdetial = {
    accoutnNo: 205032,
    pin: 1234,
    balance: 593840,
    Uname: "Syed Safdar Ali Shah",
    address: "Tabligee Markaz Peshawar"
}
// console.log('Userdetial', Userdetial)
ATM_Login()

async function ATM_Operations(pass: Boolean) {
    if (pass) {
        let answer = await inquirer.prompt([
            {
                type: "list",
                name: "accountOperations",
                choices: [
                    chalk.black.bgCyan.bold('1) Current Balance'),
                    chalk.black.bgWhite.bold('2) WithDraw Funds'),
                    chalk.black.bgGreen.bold('3) Add Balance'),
                    chalk.black.bgYellow.bold('4) Transfer Funds'),
                    chalk.black.bgRed.bold('5) Exit'),
                ]
            }])
        if (answer.accountOperations == chalk.black.bgCyan.bold('1) Current Balance')) {
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
            console.log(chalk.black.bgWhiteBright.bold(`>>>>> Your Account Balance is ${Userdetial.balance}`))
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
            ATM_Operations(userloggedin)
        }
        else if (answer.accountOperations == chalk.black.bgWhite.bold('2) WithDraw Funds')) {
            let answer = await inquirer.prompt([
                {
                    type: "input",
                    name: "fundWithDraw",
                    message: chalk.black.bgWhite.bold('Enter The Fund to WithDraw')

                }])
            if (Userdetial.balance > parseInt(answer.fundWithDraw)) {

                Userdetial.balance = Userdetial.balance - parseInt(answer.fundWithDraw)
                // console.log(`${typeof (Userdetial.balance)} ${typeof (answer.fundWithDraw)}`)
                console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))

                console.log(chalk.black.bgWhite.bold(`-Your Amount ${answer.fundWithDraw} is successfuly withdrawed--`))
                console.log(chalk.black.bgGreen.bold(`-Your Remaining Amount is ${Userdetial.balance} `))
                console.log(chalk.black.bgRed.bold(`- Pleas collect your Amount and Close Your Account`))
                console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))

                ATM_Operations(userloggedin)
            }
            else {
                console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
                console.log(chalk.black.bgRed.bold(` -- Unsufficient Funds -- \n please try again`))
                console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
                ATM_Operations(userloggedin)

            }

        }
    }


}
async function ATM_Login() {
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "accountNoinput",
            message: chalk.bgYellowBright.whiteBright.bold('Please Enter Your Account Number >> ')

        }
    ])

    if (trying < 3) {
        if (answer.accountNoinput == Userdetial.accoutnNo) {
            userloggedin = true
            trying++
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
            console.log(`***  Welcome to Your Account Mr/Mrs- ${Userdetial.Uname} ***`)
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))

            ATM_Operations(userloggedin)
        }
        else if (trying == 2) {
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
            console.log(chalk.bgRed.whiteBright.bold('You Have Reached Your Login Limit please Restart the program.'))
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
        }
        else {
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))
            console.log(chalk.bgGray.whiteBright.bold('Please enter Correct Account No#'))
            console.log(chalk.black.bgBlack.bold(`-------------------------------------------------------------`))

            trying++
            ATM_Login()
        }
    }

}
