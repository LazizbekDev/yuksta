import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';
import "./App.css"
import {Box, Button, Container, FormControl, Input, InputLabel, Typography} from "@mui/material";
import axios from "axios";
import {useState} from "react";

function App() {
    const [link, setLink] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const url = data.get('url')

        try {
            const res = await axios.post('https://fishingapi.herokuapp.com/api/yuksta', {url}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLink(res.data)
            console.log(url)
        } catch (err) {
            console.log(err)
        }
    }
  return (
      <Container maxWidth={"sm"} component={"form"} onSubmit={submitHandler}>
          <FormControl fullWidth={true} style={{marginTop: '30px'}}>
              <InputLabel htmlFor="my-input">Instagram video URL</InputLabel>
              <Input
                  type={'url'}
                  name={'url'}
                  onSubmit={submitHandler}
                  id="my-input"
                  aria-describedby="my-helper-text"
              />
          </FormControl>

          {link.downloadLink ? (
              <Box sx={{width: 280, margin: '0 auto'}}>
                  <video controls autoPlay style={{width: '100%'}}>
                      <source src={link.downloadLink} type={'video/mp4'}/>
                  </video>
              </Box>
          ) : link.error ? <Typography color={"crimson"}>{link.error}</Typography> : (
              <Typography>URL & ENTER & VIDEO</Typography>
          )}
      </Container>
  );
}

export default App;
