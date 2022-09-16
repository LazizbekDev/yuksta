import express from "express"
import cors from "cors"
import axios from "axios"
import cheerio from "cheerio"

const app = express()

app.use(express.json())
app.use(cors())

const getVideo = async (url) => {
    const html = await axios.get(url);

    const $ = cheerio.load(html.data);

    const videoString = $("meta[property='og:video']").attr("content");

    return videoString;
}

app.post('/api/yuksta', async (req,res) => {
    try {
        const videoLink = await getVideo(req.body.url);

        if (videoLink !== undefined) {
            res.json({downloadLink: videoLink });
        } else {
            res.json({error: "Foydalanishga yoroqsiz havola kiritilgan"});
        }
    } catch (err) {
        res.json({error: "Sizda kiritilgan havola bilan muammo bor!"})
    }
})

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
    console.log("Server...")
})