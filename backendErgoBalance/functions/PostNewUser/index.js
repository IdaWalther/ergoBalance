const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const { validateNewUser } = require('../../middlewares/validateNewUser')
const { sendError, sendResponse } = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')
const { hashPassword } = require('../../utils/index')
const { v4: uuid } = require('uuid')

const postNewUser = async (event) => {
    const body = JSON.parse(event.body)
    let { username, email, password, confirmPassword } = body;

    username = username.toLowerCase();
    email = email.toLowerCase();

    if (password !== confirmPassword) {
        return sendError(400, { message: 'Lösenorden måste vara lika' })
    }

    const hashedPassword = await hashPassword(password)
    const id = uuid()
    const programSk = 'startprogram'
    const program = [
        {
            "sk": "07b2f5e3-e1ce-4be8-b54e-015ddc6e92d9",
            "pk": "active",
            "name": "Hoppa på ett ben",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Hoppa+p%C3%A5+ett+ben.png",
            "desc": "Stå på ett ben med lätt böjd knäled. Tryck ifrån och hoppa rakt upp, landa mjukt på samma ben och upprepa rörelsen.\nFörslag på antal: 10 repetitioner per ben X 2 sets"
        },
        {
            "sk": "09f8022e-b4e9-4f84-8f81-5e898cade23f",
            "pk": "active",
            "name": "Hakindrag",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/_Dubbelhaka_.png",
            "desc": "Skapa en \"dubbelhaka\" genom att dra hakan bakåt och aningen nedåt. Håll i ca 5 sekunder. Slappna sedan av.\nFörslag på antal: 10 repetitioner X 2 sets. \n"
        },
        {
            "sk": "0bdb59b6-eeb1-4ce0-b0eb-2b7cba6d445c",
            "pk": "active",
            "name": "Tåhävningar med stöd",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/T%C3%A5h%C3%A4vningar.png",
            "desc": "Lyft långsamt hälarna från marken så att du står på tårna, håll positionen i några sekunder och sänk sedan långsamt tillbaka till startpositionen. För extra utmaning kan du göra övningen på ett trappsteg eller en upphöjd yta.\nFörslag på antal: 20 repetitioner X 3 sets."
        },
        {
            "sk": "1de271c7-95bd-4d9b-b0e3-db936aee36b5",
            "pk": "active",
            "name": "Skulderstabilitet med gummiband",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Skulderstabilitet+med+gummiband.png",
            "desc": "Håll ett gummiband sträckt ovanför huvudet. Dra isär bandet med båda armarna, håll spänningen i några sekunder innan du långsamt återgår till startpositionen. \nFörslag på antal: 10 repetitioner X 3 sets."
        },
        {
            "sk": "25c4f942-c9c4-47c2-ad83-7937d3646023",
            "pk": "active",
            "name": "Pil och båge med gummiband",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Pil+och+b%C3%A5ge+med+gummiband.png",
            "desc": "Håll gummibandet med raka armar framför dig. Dra ena armen går bakåt som om du sträcker ut en pilbåge medan den andra armen hålls kvar stadigt framför dig. Återgå långsamt till startpositionen och upprepa, byt sedan sida.\nFörslag på antal: 10 repetitioner per arm X 2 sets."
        },
        {
            "sk": "2dca55b7-bbcf-42e3-ae4d-3bcd8ad5c097",
            "pk": "active",
            "name": "Sittande axelrullningar",
            "image": "https://ergobalanceexercises.s3.eu-north-1.amazonaws.com/Sittande+axelrullningar.png",
            "desc": "Lyft axlarna upp mot öronen, rulla dem bakåt och neråt i en cirkulär rörelse. Upprepa sedan rörelsen framåt. Fortsätt att rulla axlarna i båda riktningarna.\nFörslag på antal: 20 repetitioner X 3 sets."
        }
    ]

    try {
        const { Items } = await db.scan({
            TableName: 'ergousers-db',
            FilterExpression: 'username = :username OR mail = :mail',
            ExpressionAttributeValues: {
                ':username': username,
                ':mail': email
            }
        })

        if (Items.length > 0) {
            return sendError(409, { message: 'Användarnamn eller email existerar redan' })
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
                pk: username,
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
    } catch (error) {
        return sendError(404, { message: 'Kunde inte registrera ny användare' })
    }
}

const middyHandler = middy(postNewUser)
exports.handler = middyHandler.use(validateKey()).use(validateNewUser()).use(errorHandler())