const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const {validateNewUser} = require('../../middlewares/validateNewUser')
const { sendError, sendResponse } = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')
const { hashPassword } = require('../../utils/index')
const {v4: uuid} = require('uuid')

const postNewUser = async (event) => {
    const body = JSON.parse(event.body)
    let {username, email, password, confirmPassword} = body;

    username = username.toLowerCase();
    email = email.toLowerCase();

    if(password !== confirmPassword) {
        return sendError(400, {message: 'Lösenorden måste vara lika'})
    }

    const hashedPassword = await hashPassword(password)
    const id = uuid()
    const programSk = uuid()
    const program = [
                {
                    "sk": "07b2f5e3-e1ce-4be8-b54e-015ddc6e92d9",
                    "pk": "active",
                    "name": "Hoppa på ett ben",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Hoppa+p%C3%A5+ett+ben.png",
                    "desc": "Stå på ett ben med lätt böjd knäled och armarna som balanshjälp. Tryck ifrån explosivt och hoppa rakt upp, landa mjukt på samma ben och upprepa rörelsen."
                },
                {
                    "sk": "09f8022e-b4e9-4f84-8f81-5e898cade23f",
                    "pk": "active",
                    "name": "Dubbelhaka",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/_Dubbelhaka_.png",
                    "desc": "Skapa en dubbelhaka och håll i 10 sekunder. Slappna sedan av."
                },
                {
                    "sk": "0bdb59b6-eeb1-4ce0-b0eb-2b7cba6d445c",
                    "pk": "active",
                    "name": "Tåhävningar",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/T%C3%A5h%C3%A4vningar.png",
                    "desc": "Stå med fötterna axelbrett isär och lyft långsamt hälarna från marken så att du står på tårna, håll positionen i några sekunder och sänk sedan långsamt tillbaka till startpositionen. För en extra utmaning kan du göra övningen på ett trappsteg eller en upphöjd yta."
                },
                {
                    "sk": "1de271c7-95bd-4d9b-b0e3-db936aee36b5",
                    "pk": "active",
                    "name": "Skulderstabilitet med gummiband",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Skulderstabilitet+med+gummiband.png",
                    "desc": "Håll ett gummiband med båda händerna och sträck ut det ovanför huvudet, med fötterna axelbrett isär och armarna rakt upp. Dra ut bandet genom att separera händerna åt sidorna, håll spänningen i några sekunder, och återgå långsamt till startpositionen. Denna övning stärker axelmusklerna och förbättrar stabiliteten för rotatorcuffen."
                },
                {
                    "sk": "25c4f942-c9c4-47c2-ad83-7937d3646023",
                    "pk": "active",
                    "name": "Pil och båge med gummiband",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Pil+och+b%C3%A5ge+med+gummiband.png",
                    "desc": "Pil och båge med gummiband görs genom att stå med fötterna axelbrett isär och hålla gummibandet med båda händerna. Dra ena armen bakåt som om du sträcker en pil, medan den andra armen hålls rakt framför dig. Återgå långsamt till startpositionen och upprepa, byt sedan sida."
                },
                {
                    "sk": "2dca55b7-bbcf-42e3-ae4d-3bcd8ad5c097",
                    "pk": "active",
                    "name": "Sittande axelrullningar",
                    "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Sittande+axelrullningar.png",
                    "desc": "Lyft axlarna upp mot öronen, rulla dem bakåt och neråt i en cirkulär rörelse, och upprepa sedan rörelsen framåt. Fortsätt att rulla axlarna i båda riktningarna för att lindra spänningar och förbättra rörligheten i axelleden."
                }
            ]

    try {
        const {Items} = await db.scan({
            TableName: 'ergousers-db',
            FilterExpression: 'username = :username OR mail = :mail',
            ExpressionAttributeValues: {
                ':username': username,
                ':mail': email
            } 
        })

        if(Items.length > 0) {
            return sendError(400, {message: 'Användaren existerar redan'})
        }

        await db.put({
            TableName: 'ergousers-db',
            Item: {
                pk: 'user',
                sk: id,
                username: username,
                password: hashedPassword,
                mail: email
            }
        })

        const userProgram = await db.put({
            TableName: 'ergoprogram-db',
            Item: {
                pk: id,
                sk: programSk,
                name: 'Startprogram',
                desc: 'Ett första program för att få in aktivitet vid för mycket stillasittande',
                exercises: program
            }
        })

        return sendResponse(200, {
            body: {
                success: true,
                message: 'Ny användare registrerad',
                data: {
                    pk: 'user',
                    sk: id,
                    username: username,
                    mail: email,
                    userProgram
                }
            }
        })
    } catch(error) {
        return sendError(404, {message: 'Kunde inte registrera ny användare'})
    }
}

const middyHandler = middy(postNewUser)
exports.handler = middyHandler.use(validateKey()).use(validateNewUser()).use(errorHandler())