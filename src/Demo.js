import React, { useState } from "react";
import { Button, Typography, TextField, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Demo = () => {
  const [req, changeReq] = useState("");
  const [res, changeRes] = useState("");
  const [inputLang, setInputLang] = useState("");
  const [opLang, setOpLang] = useState("");
  const [loading, changeLoading] = useState(false);
  // const [temperature, changeTemperature] = useState(0.3);


  // const response = await openai.createCompletion("text-davinci-002", {
  //   prompt: `Translate this into 1. German:\n ${req}`,
  //   temperature: temperature,
  //   max_tokens: 100,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });

  const handleClick = async () => {
    try {
      changeLoading(true);
      // const response = await openai.createCompletion("text-davinci-002", {
      //   prompt: `What are 5 key points I should know when studying ${req}?`,
      //   temperature: temperature,
      //   max_tokens: 150,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: `Translate this into ${opLang} from ${inputLang}:\n ${req}`,
        temperature: 0.4,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response.data);
      changeRes(response.data.choices[0].text);
      changeLoading(false);
    } catch (err) {
      console.log(err);
      changeLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: '60px' }} maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Input Language"
            variant="outlined"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Output Language"
            variant="outlined"
            value={opLang}
            onChange={(e) => setOpLang(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth
            label="Input Text"
            variant="outlined"
            value={req}
            onChange={(e) => changeReq(e.target.value)}
          />
        </Grid>
        <Grid textAlign="center" item xs={12}>
          <Button disabled={!req} variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}><Typography>{loading ? "Loading" : res}</Typography></Grid>
      </Grid>
    </Container>
  );
};

export default Demo;
